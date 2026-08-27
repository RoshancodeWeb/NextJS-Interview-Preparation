import ApiError from "../utils/apierror.util.js";
import Product from "../models/product.model.js"
import fs from "fs"
import path from "path"

export const createProduct = async (req, res, next) => {
  try {

    const { productName, productStock } = req.body;

    const localFilePath = req.file?.path;
    if (!localFilePath) {
      throw new ApiError(400, "Product Image Is Required");
    }

    const dbImagePath = `temp/${req.file.filename}`;

    const product = await Product.create({ productName, productStock, productImage: dbImagePath, owner: req.user._id });
    res.status(200).json({ message: "Product Created Successfully", success: true, data: product });


  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Failed to delete local image after DB error:", err);
      });
    }
    next(error);
  }
}


export const getProducts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const page = Math.max(1, Number(req.query.page) || 1); //We are doing this to prevent the page from being 0
    const limit = Math.min(50, Number(req.query.limit) || 10);  //We are doing this to prevent the limit from being greater then 50(its like capping)
    const skip = (page - 1) * limit;

    const filter = { owner: userId };

    const [products, total] = await Promise.all([Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter)
    ]);
    res.status(200).json({ success: true, message: "Users Product Fetched Successfully", data: products, pagination: { totalPages: Math.ceil(total / limit), page, total, limit } });

  } catch (error) {
    next(error);
  }
}


export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    /**
     * The owner check lives INSIDE the query, not in an if-statement after a
     * findById. Fetching first and comparing afterwards is how IDOR bugs happen —
     * another user's document would still be read out of the database before the
     * check runs. This way a product that isn't yours simply does not match.
     */
    const product = await Product.findOneAndDelete({ _id: id, owner: req.user._id });

    if (!product) {
      throw new ApiError(404, "Product Not Found");
    }

    // productImage is stored as "temp/<file>", and the files live under public/
    const filePath = path.join("public", product.productImage);
    fs.unlink(filePath, (err) => {
      // A missing file must not fail the request — the row is already gone, so
      // from the user's point of view the delete succeeded.
      if (err) console.error("Failed to delete product image:", err.message);
    });

    res.status(200).json({ success: true, message: "Product Deleted Successfully", data: { _id: product._id } });

  } catch (error) {
    next(error);
  }
}

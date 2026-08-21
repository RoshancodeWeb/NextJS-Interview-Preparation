"use client"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import api from "../lib/api"
import axios from "axios"

const labelClass =
    "text-sm font-medium text-slate-700"

const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"

const fileInputClass =
    "w-full cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 outline-none transition hover:border-indigo-400 hover:bg-indigo-50/40 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-indigo-700 file:transition hover:file:bg-indigo-200"

type Product = {
    productName: string,
    productStock: string,//We make it intentionally and convert value to number once user submit the form
    productImage: File | null
}

const AddProduct = () => {

    const [product, setProduct] = useState<Product>({
        productName: '',
        productStock: '',
        productImage: null
    });

    const [preview, setPreview] = useState<string | null>(null);

    const fileRef = useRef<HTMLInputElement>(null);


    useEffect(() => {

        if (!product.productImage) {
            setPreview(null);
            return;
        }

        const url = URL.createObjectURL(product.productImage);
        setPreview(url);

        return () => {
            URL.revokeObjectURL(url);
        };


    }, [product.productImage]);


    const clearImage = () => {
        setProduct((prev) => ({ ...prev, productImage: null }));

        if (fileRef.current) fileRef.current.value = "";

    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errors = [];
        for (const [name, value] of Object.entries(product)) {
            if (!value) {
                errors.push(`${name} is empty`);
            }
        }
        if (errors.length > 0) {
            toast.error(errors.join(", "));
            return;
        }

        const formData = new FormData();
        formData.append("productName", product.productName);
        formData.append("productStock", product.productStock);
        if (product.productImage) {
            formData.append("productImage", product.productImage);
        }
        try {
            const response = await api.post(`/product/createProduct`, formData, {
                headers: { "Content-Type": "multipart/form-data" }

            });
            toast.success(response?.data?.message);
            setProduct({
                productName: '',
                productStock: '',
                productImage: null
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response) {
                    const data = error.response?.data;
                    return toast.error(data.message);

                }

                return toast.error("Could Not Reach Server,Is it running?");
            }

            return toast.error(error instanceof Error ? error.message : "Something Went Wrong");
        }

    }

    return (
        <div className='w-full max-w-md'>

            {/* Card */}
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>

                {/* Header */}
                <header className='space-y-1'>
                    <h2 className='text-xl font-bold tracking-tight text-slate-900'>
                        Add a product
                    </h2>
                    <p className='text-sm text-slate-500'>
                        Fill in the details below to list a new item in your catalog.
                    </p>
                </header>

                <div className='flex flex-col gap-4'>

                    {/* Product name */}
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='productName' className={labelClass}>
                            Product name
                        </label>
                        <input
                            type='text'
                            id='productName'
                            name='productName'
                            value={product?.productName}
                            onChange={(e) => { setProduct((prev) => ({ ...prev, productName: e.target.value })) }}
                            placeholder='Enter the Product Name'
                            className={inputClass}
                        />
                    </div>

                    {/* Stock */}
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='productStock' className={labelClass}>
                            Stock
                        </label>
                        <input
                            type='number'
                            id='productStock'
                            name='productStock'
                            min={0}
                            value={product.productStock}
                            onChange={(e) => { setProduct((prev) => ({ ...prev, productStock: e.target.value })) }}
                            placeholder='Enter the Product Stock'
                            className={inputClass}
                        />
                        <p className='text-xs text-slate-400'>
                            How many units are available right now.
                        </p>
                    </div>

                    {/* Image */}
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='productImage' className={labelClass}>
                            Product image
                        </label>
                        <input
                            type='file'
                            id='productImage'
                            name='productImage'
                            onChange={(e) => {

                                setProduct((prev) => ({ ...prev, productImage: e.target.files?.[0] ?? null }))
                            }}
                            ref={fileRef}
                            className={fileInputClass}
                        />
                        <p className='text-xs text-slate-400'>
                            PNG or JPG. A square image looks best on the catalog grid.
                        </p>

                        {preview && (
                            <div className='relative mt-2 overflow-hidden rounded-lg border border-slate-200'>
                                <img
                                    src={preview}
                                    alt='Selected product'
                                    className='h-40 w-full object-cover'
                                />

                                {/* type='button' — inside a form, a bare button submits it */}
                                <button
                                    type='button'
                                    onClick={clearImage}
                                    aria-label='Remove selected image'
                                    className='absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-slate-900/55 text-white shadow-sm backdrop-blur transition hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-white/80'
                                >
                                    <svg
                                        viewBox='0 0 20 20'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth={2.2}
                                        strokeLinecap='round'
                                        className='size-3.5'
                                        aria-hidden='true'
                                    >
                                        <path d='M5 5l10 10M15 5L5 15' />
                                    </svg>
                                </button>
                            </div>
                        )}

                    </div>
                </div>

                {/* Submit */}
                <button
                    type='submit'
                    className='w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                    Add Product
                </button>
            </form>

        </div>
    )
}

export default AddProduct

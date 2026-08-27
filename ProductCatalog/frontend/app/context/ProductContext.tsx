"use client"
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import api from "../lib/api";


export type ProductType = {
    _id: string,
    productName: string,
    productStock: number,
    productImage: string
}

type ProductsWithPagination = { products: ProductType[], pagination: { totalPages: number, total: number, limit: number, page: number } }

type ProductContext = {
    productsWithPagination: ProductsWithPagination,
    setProductsWithPagination: Dispatch<SetStateAction<ProductsWithPagination>>,
    loading: boolean,
    selectedPage: number,
    setSelectedPage: Dispatch<SetStateAction<number>>,
    deletingId: string | null,
    deleteProduct: (id: string) => Promise<void>,
    refreshProducts: () => Promise<void>
}


const ProductContext = createContext<ProductContext | null>(null);


export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [productsWithPagination, setProductsWithPagination] = useState<ProductsWithPagination>({ products: [], pagination: { totalPages: 0, total: 0, limit: 0, page: 0 } });
    const [loading, setLoading] = useState(true);
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [deletingId, setDeletingId] = useState<string | null>(null);


    /**
     * `signal` is optional on purpose. The mount effect passes one so StrictMode's
     * duplicate request can be cancelled; refreshProducts() calls it without one,
     * because a refresh triggered by the user should always be allowed to finish.
     */
    const loadProducts = useCallback(async (signal?: AbortSignal) => {
        try {
            const response = await api.get(`/product/getAllProduct`, {
                params: { page: selectedPage, limit: 10 },
                signal
            });
            setProductsWithPagination({ products: response.data.data, pagination: response.data.pagination });

            setLoading(false);

        } catch (error) {
            // A cancellation is also an AxiosError, so it has to be checked first.
            // We deliberately leave `loading` true here — StrictMode is about to
            // remount and refetch, and clearing it would flash the empty state.
            if (axios.isCancel(error)) return;

            setLoading(false);

            // No `return toast.error(...)` here — toast returns an id, which would
            // make this function Promise<string|number> instead of Promise<void>.
            if (axios.isAxiosError(error)) {
                toast.error(error.response
                    ? error.response?.data?.message
                    : "Could Not Reach Server, Is it running");
                return;
            }

            toast.error(error instanceof Error ? error.message : "Something Went Wrong");
        }
    }, [selectedPage]);


    useEffect(() => {
        const controller = new AbortController();

        loadProducts(controller.signal);

        return () => controller.abort();
    }, [loadProducts]);


    // Exposed to consumers so a successful create/update/delete can pull the
    // fresh list. No skeleton is shown: `loading` only ever goes true on mount,
    // so the current list stays visible while this runs.
    const refreshProducts = useCallback(() => loadProducts(), [loadProducts]);


    const deleteProduct = useCallback(async (id: string) => {
        setDeletingId(id);

        try {
            const response = await api.delete(`/product/deleteProduct/${id}`);
            toast.success(response?.data?.message);

            // Refetch rather than splice locally. The deletion changes the total
            // and which item gets pulled up from the next page to fill the gap,
            // and only the server knows both.
            await loadProducts();

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response
                    ? error.response?.data?.message
                    : "Could Not Reach Server, Is it running");
                return;
            }
            toast.error(error instanceof Error ? error.message : "Something Went Wrong");
        } finally {
            setDeletingId(null);
        }
    }, [loadProducts]);


    return (
        <ProductContext value={{
            productsWithPagination,
            setProductsWithPagination,
            loading,
            selectedPage,
            setSelectedPage,
            deletingId,
            deleteProduct,
            refreshProducts
        }}>
            {children}
        </ProductContext>
    )
}


export const useProductContext = () => {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider");
    }

    return context;
}

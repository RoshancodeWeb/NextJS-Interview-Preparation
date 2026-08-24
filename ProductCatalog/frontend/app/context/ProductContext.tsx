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

type ProductContext = {
    products: ProductType[],
    setProducts: Dispatch<SetStateAction<ProductType[]>>,
    loading: boolean,
    refreshProducts: () => Promise<void>
}


const ProductContext = createContext<ProductContext | null>(null);


export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);


    /**
     * `signal` is optional on purpose. The mount effect passes one so StrictMode's
     * duplicate request can be cancelled; refreshProducts() calls it without one,
     * because a refresh triggered by the user should always be allowed to finish.
     */
    const loadProducts = useCallback(async (signal?: AbortSignal) => {
        try {
            const response = await api.get(`/product/getAllProduct`, { signal });
            setProducts(response?.data?.data ?? []);
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
    }, []);


    useEffect(() => {
        const controller = new AbortController();

        loadProducts(controller.signal);

        return () => controller.abort();
    }, [loadProducts]);


    // Exposed to consumers so a successful create/update/delete can pull the
    // fresh list. No skeleton is shown: `loading` only ever goes true on mount,
    // so the current list stays visible while this runs.
    const refreshProducts = useCallback(() => loadProducts(), [loadProducts]);


    return (
        <ProductContext value={{ products, setProducts, loading, refreshProducts }}>
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

"use client"
import { useMemo, useState } from 'react'
import { useProductContext } from '../context/ProductContext'

// productImage is stored as "temp/<file>" and express.static("public") serves
// the public folder at the root, so this resolves to http://host/temp/<file>
const imageUrl = (path: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`;

const CardSkeleton = () => (
    <div className='rounded-xl border border-slate-200 bg-white p-3'>
        <div className='aspect-4/3 w-full animate-pulse rounded-lg bg-slate-200' />
        <div className='mt-3 h-4 w-3/5 animate-pulse rounded bg-slate-200' />
        <div className='mt-2 h-3 w-1/3 animate-pulse rounded bg-slate-100' />
    </div>
)

const Products = () => {

    const { products, loading } = useProductContext();
    const [query, setQuery] = useState("");


    // Recomputed only when the list or the query actually changes, instead of on
    // every keystroke-triggered re-render.
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return products;
        return products.filter((p) => p.productName.toLowerCase().includes(q));
    }, [products, query]);


    return (
        <section className='mt-8'>

            <header className='flex items-baseline justify-between gap-3'>
                <h2 className='text-xl font-bold tracking-tight text-slate-900'>
                    Your products
                </h2>
                {!loading && products.length > 0 && (
                    <span className='text-sm text-slate-500'>
                        {filtered.length === products.length
                            ? `${products.length} total`
                            : `${filtered.length} of ${products.length}`}
                    </span>
                )}
            </header>

            {/* Loading */}
            {loading && (
                <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <span className='sr-only' role='status' aria-live='polite'>Loading products</span>
                </div>
            )}

            {/* Nothing created yet */}
            {!loading && products.length === 0 && (
                <div className='mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center'>
                    <p className='text-sm font-medium text-slate-700'>No products yet</p>
                    <p className='mt-1 text-sm text-slate-500'>
                        Add your first one using the form above.
                    </p>
                </div>
            )}

            {/* Loaded and non-empty */}
            {!loading && products.length > 0 && (
                <>
                    <div className='mt-4'>
                        <label htmlFor='productSearch' className='sr-only'>Search products</label>
                        <input
                            type='search'
                            id='productSearch'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Search by name…'
                            className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                        />
                    </div>

                    {filtered.length === 0 ? (
                        <p className='mt-4 rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500'>
                            Nothing matches “{query.trim()}”.
                        </p>
                    ) : (
                        <ul className='mt-4 grid gap-3 sm:grid-cols-2'>
                            {filtered.map((product) => (
                                <li
                                    key={product._id}
                                    className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md'
                                >
                                    <div className='aspect-4/3 w-full bg-slate-100'>
                                        <img
                                            src={imageUrl(product.productImage)}
                                            alt={product.productName}
                                            className='h-full w-full object-cover'
                                        />
                                    </div>

                                    <div className='flex items-start justify-between gap-2 p-3'>
                                        <p className='truncate text-sm font-semibold text-slate-900'>
                                            {product.productName}
                                        </p>

                                        <span
                                            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${product.productStock > 0
                                                ? 'bg-emerald-50 text-emerald-700'
                                                : 'bg-rose-50 text-rose-700'
                                                }`}
                                        >
                                            {product.productStock > 0
                                                ? `${product.productStock} in stock`
                                                : 'Out of stock'}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </section>
    )
}

export default Products

"use client"
import { useProductContext } from '../context/ProductContext'

// productImage is stored as "temp/<file>" and express.static("public") serves
// the public folder at the root, so this resolves to http://host/temp/<file>
const imageUrl = (path: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`;

const pageBase =
    "flex size-9 items-center justify-center rounded-lg border text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500/30"

const pageClass =
    `${pageBase} border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900`

const activePageClass =
    `${pageBase} border-indigo-600 bg-indigo-600 text-white shadow-sm hover:bg-indigo-700`

const arrowClass =
    `${pageBase} border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white`

const CardSkeleton = () => (
    <div className='rounded-xl border border-slate-200 bg-white p-3'>
        <div className='aspect-4/3 w-full animate-pulse rounded-lg bg-slate-200' />
        <div className='mt-3 h-4 w-3/5 animate-pulse rounded bg-slate-200' />
        <div className='mt-2 h-3 w-1/3 animate-pulse rounded bg-slate-100' />
    </div>
)


const Products = () => {

    const {
        productsWithPagination,
        loading,
        selectedPage,
        setSelectedPage,
        deletingId,
        deleteProduct
    } = useProductContext();

    const { products, pagination } = productsWithPagination;
    const { totalPages, total } = pagination;


    return (
        <section className='mt-8'>

            <header className='flex items-baseline justify-between gap-3'>
                <h2 className='text-xl font-bold tracking-tight text-slate-900'>
                    Your products
                </h2>
                {!loading && total > 0 && (
                    <span className='text-sm text-slate-500'>
                        {total} {total === 1 ? 'product' : 'products'}
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
            {!loading && total === 0 && (
                <div className='mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center'>
                    <p className='text-sm font-medium text-slate-700'>No products yet</p>
                    <p className='mt-1 text-sm text-slate-500'>
                        Add your first one using the form above.
                    </p>
                </div>
            )}

            {/* Results */}
            {!loading && products.length > 0 && (
                <ul className='mt-4 grid gap-3 sm:grid-cols-2'>
                    {products.map((product) => {
                        const isDeleting = deletingId === product._id;

                        return (
                            <li
                                key={product._id}
                                className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition ${isDeleting ? 'opacity-50' : 'hover:border-slate-300 hover:shadow-md'}`}
                            >
                                <div className='relative aspect-4/3 w-full bg-slate-100'>
                                    <img
                                        src={imageUrl(product.productImage)}
                                        alt={product.productName}
                                        className='h-full w-full object-cover'
                                    />

                                    <button
                                        type='button'
                                        onClick={() => deleteProduct(product._id)}
                                        disabled={isDeleting}
                                        aria-label={`Delete ${product.productName}`}
                                        className='absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-slate-900/55 text-white shadow-sm backdrop-blur transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-white/80 disabled:cursor-not-allowed disabled:hover:bg-slate-900/55'
                                    >
                                        {isDeleting ? (
                                            <svg className='size-4 animate-spin' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                                                <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' className='opacity-25' />
                                                <path d='M12 2a10 10 0 0 1 10 10' stroke='currentColor' strokeWidth='4' strokeLinecap='round' />
                                            </svg>
                                        ) : (
                                            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' className='size-4' aria-hidden='true'>
                                                <path d='M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3' />
                                            </svg>
                                        )}
                                    </button>
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
                        )
                    })}
                </ul>
            )}

            {/* Pager — hidden when there is only one page to show */}
            {!loading && totalPages > 1 && (
                <nav aria-label='Pagination' className='mt-6 flex items-center justify-center gap-1.5'>

                    <button
                        type='button'
                        onClick={() => setSelectedPage((prev) => prev - 1)}
                        disabled={selectedPage <= 1}
                        aria-label='Previous page'
                        className={arrowClass}
                    >
                        ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => {
                        const pageNumber = i + 1;
                        const isActive = pageNumber === selectedPage;

                        return (
                            <button
                                key={pageNumber}
                                type='button'
                                onClick={() => setSelectedPage(pageNumber)}
                                // tells screen readers which one is the current page,
                                // since colour alone does not carry that meaning
                                aria-current={isActive ? 'page' : undefined}
                                className={isActive ? activePageClass : pageClass}
                            >
                                {pageNumber}
                            </button>
                        )
                    })}

                    <button
                        type='button'
                        onClick={() => setSelectedPage((prev) => prev + 1)}
                        disabled={selectedPage >= totalPages}
                        aria-label='Next page'
                        className={arrowClass}
                    >
                        ›
                    </button>
                </nav>
            )}
        </section>
    )
}

export default Products

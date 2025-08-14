import React from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

const Wishlist = () => {
    const { wishlist, products, navigate } = useAppContext()
    
    const wishlistProducts = products.filter(product => wishlist.includes(product._id))

    return (
        <div className="mt-16">
            <div className="flex flex-col items-start mb-8">
                <h1 className="text-2xl md:text-3xl font-medium">My Wishlist</h1>
                <div className="w-16 h-0.5 bg-primary rounded-full mt-2"></div>
                {wishlistProducts.length > 0 && (
                    <p className="text-gray-500 mt-2">{wishlistProducts.length} items</p>
                )}
            </div>

            {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
                    {wishlistProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="Your wishlist is empty"
                    description="Save items you love to your wishlist and shop them later"
                    actionText="Start Shopping"
                    onAction={() => navigate('/products')}
                    icon={
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    }
                />
            )}
        </div>
    )
}

export default Wishlist
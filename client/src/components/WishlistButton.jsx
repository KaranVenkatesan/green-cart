import React from 'react'
import { useAppContext } from '../context/AppContext'

const WishlistButton = ({ productId, className = "" }) => {
    const { wishlist, addToWishlist, removeFromWishlist } = useAppContext()
    
    const isInWishlist = wishlist.includes(productId)

    const handleClick = (e) => {
        e.stopPropagation()
        if (isInWishlist) {
            removeFromWishlist(productId)
        } else {
            addToWishlist(productId)
        }
    }

    return (
        <button
            onClick={handleClick}
            className={`p-2 rounded-full transition-all ${
                isInWishlist 
                    ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                    : 'text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-500'
            } ${className}`}
        >
            <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill={isInWishlist ? "currentColor" : "none"}
                stroke="currentColor" 
                strokeWidth="2"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
        </button>
    )
}

export default WishlistButton
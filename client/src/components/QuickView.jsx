import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const QuickView = ({ product, onClose }) => {
    const { currency, addToCart, navigate } = useAppContext()

    if (!product) return null

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Quick View</h2>
                        <button 
                            onClick={onClose}
                            className="text-2xl text-gray-400 hover:text-gray-600"
                        >
                            ×
                        </button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/2">
                            <img 
                                src={product.image[0]} 
                                alt={product.name}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>
                        
                        <div className="md:w-1/2">
                            <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                            <p className="text-gray-500 mb-3">{product.category}</p>
                            
                            <div className="flex items-center gap-0.5 mb-4">
                                {Array(5).fill('').map((_, i) => (
                                    <img key={i} className="w-4 h-4" src={i < 4 ? assets.star_icon : assets.star_dull_icon} />
                                ))}
                                <span className="ml-2 text-sm text-gray-500">(4.0)</span>
                            </div>
                            
                            <div className="mb-4">
                                <span className="text-gray-500 line-through text-sm">{currency}{product.price}</span>
                                <span className="text-2xl font-semibold text-primary ml-2">{currency}{product.offerPrice}</span>
                            </div>
                            
                            <div className="mb-6">
                                <h4 className="font-medium mb-2">Description:</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {product.description.slice(0, 3).map((desc, index) => (
                                        <li key={index}>• {desc}</li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        addToCart(product._id)
                                        onClose()
                                    }}
                                    className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => {
                                        navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
                                        onClose()
                                    }}
                                    className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dull transition"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickView
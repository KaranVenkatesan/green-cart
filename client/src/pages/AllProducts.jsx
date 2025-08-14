import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'

const AllProducts = () => {
    const { products, searchQuery } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [priceRange, setPriceRange] = useState({ min: '', max: '' })
    const [sortBy, setSortBy] = useState('')
    const [showFilters, setShowFilters] = useState(false)

    const applyFilters = (productsToFilter) => {
        let filtered = [...productsToFilter]

        // Search filter
        if (searchQuery.length > 0) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Category filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product => 
                selectedCategories.includes(product.category)
            )
        }

        // Price filter
        if (priceRange.min || priceRange.max) {
            filtered = filtered.filter(product => {
                const price = product.offerPrice
                const min = priceRange.min ? parseFloat(priceRange.min) : 0
                const max = priceRange.max ? parseFloat(priceRange.max) : Infinity
                return price >= min && price <= max
            })
        }

        // Sort
        if (sortBy) {
            switch (sortBy) {
                case 'price-low':
                    filtered.sort((a, b) => a.offerPrice - b.offerPrice)
                    break
                case 'price-high':
                    filtered.sort((a, b) => b.offerPrice - a.offerPrice)
                    break
                case 'name':
                    filtered.sort((a, b) => a.name.localeCompare(b.name))
                    break
                case 'newest':
                    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    break
            }
        }

        return filtered
    }

    const clearFilters = () => {
        setSelectedCategories([])
        setPriceRange({ min: '', max: '' })
        setSortBy('')
    }
    useEffect(() => {
        const filtered = applyFilters(products.filter(product => product.inStock))
        setFilteredProducts(filtered)
    }, [products, searchQuery, selectedCategories, priceRange, sortBy])

    return (
        <div className="flex gap-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden fixed bottom-4 right-4 z-10">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-primary text-white px-4 py-2 rounded-full shadow-lg"
                >
                    Filters
                </button>
            </div>

            {/* Filter Sidebar */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block fixed lg:relative top-0 left-0 w-full lg:w-auto h-full lg:h-auto bg-white lg:bg-transparent z-20 lg:z-auto p-4 lg:p-0 overflow-y-auto`}>
                <div className="lg:hidden flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <button
                        onClick={() => setShowFilters(false)}
                        className="text-2xl"
                    >
                        ×
                    </button>
                </div>
                <FilterSidebar
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    onClearFilters={clearFilters}
                />
            </div>

            {/* Products Section */}
            <div className="flex-1">
            <div className='mt-16 flex flex-col'>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col items-start'>
                            <p className='text-2xl font-medium uppercase'>All Products</p>
                    <div className='w-16 h-0.5 bg-primary rounded-full'></div>
                        </div>
                        <p className="text-gray-500">{filteredProducts.length} products found</p>
                    </div>
                </div>
                
                {filteredProducts.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mt-6'>
                        {filteredProducts.map((product, index) => (
                    <ProductCard key={index} product={product}/>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                        <p className="text-xl text-gray-500 mb-2">No products found</p>
                        <p className="text-gray-400 mb-4">Try adjusting your filters or search terms</p>
                        <button
                            onClick={clearFilters}
                            className="text-primary hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllProducts

import React from 'react'
import { categories } from '../assets/assets'

const FilterSidebar = ({ 
    selectedCategories, 
    setSelectedCategories, 
    priceRange, 
    setPriceRange, 
    sortBy, 
    setSortBy,
    onClearFilters 
}) => {
    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category))
        } else {
            setSelectedCategories([...selectedCategories, category])
        }
    }

    return (
        <div className="w-64 bg-gray-50 p-6 rounded-lg h-fit">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button 
                    onClick={onClearFilters}
                    className="text-primary text-sm hover:underline"
                >
                    Clear All
                </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                    {categories.map((category, index) => (
                        <label key={index} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category.path)}
                                onChange={() => handleCategoryChange(category.path)}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm">{category.text}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Sort By */}
            <div>
                <h4 className="font-medium mb-3">Sort By</h4>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                >
                    <option value="">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                    <option value="newest">Newest First</option>
                </select>
            </div>
        </div>
    )
}

export default FilterSidebar
import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const SearchBar = () => {
    const { searchQuery, setSearchQuery, navigate } = useAppContext()

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate('/products')
        }
    }

    return (
        <form onSubmit={handleSearch} className="flex items-center text-sm gap-2 border border-gray-300 px-4 py-2 rounded-full bg-gray-50 focus-within:bg-white focus-within:border-primary transition-all">
            <button type="submit" className="flex-shrink-0">
                <img src={assets.search_icon} alt="search" className='w-4 h-4 opacity-60 hover:opacity-80 transition-opacity' />
            </button>
            <input 
                onChange={(e) => setSearchQuery(e.target.value)} 
                value={searchQuery}
                className="flex-1 bg-transparent outline-none placeholder-gray-500" 
                type="text" 
                placeholder="Search for products..." 
            />
            {searchQuery && (
                <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-gray-600 text-lg flex-shrink-0"
                >
                    ×
                </button>
            )}
        </form>
    )
}

export default SearchBar
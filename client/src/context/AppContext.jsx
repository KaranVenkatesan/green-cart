import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])

    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState('')
    const [wishlist, setWishlist] = useState([])

    //  Fetch seller status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth')
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    //  Fetch User Auth status, User Data cart items

    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user/is-auth')

            if (data.success) {
                setUser(data.user)
                setCartItems(data.user.cartItems)
                setWishlist(data.user.wishlist || [])
            }
        } catch (error) {
            setUser(null)
        }
    }

    // Fetch All Products

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Add Product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData)
        toast.success("Added to cart")
    }

    // Update cart item quantity
    const upDateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    //Remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] -= 1;

            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }

            toast.success('Removed from cart');
            setCartItems(cartData);
        }
    };
    // Get Cart Item Count
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item]
        }
        return totalCount;
    }

    // Get Cart Total Amount 
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100

    }

    // Wishlist functions
    const addToWishlist = (productId) => {
        if (!wishlist.includes(productId)) {
            const newWishlist = [...wishlist, productId]
            setWishlist(newWishlist)
            toast.success("Added to wishlist")
        }
    }

    const removeFromWishlist = (productId) => {
        const newWishlist = wishlist.filter(id => id !== productId)
        setWishlist(newWishlist)
        toast.success("Removed from wishlist")
    }
    useEffect(() => {
        fetchUser()
        fetchSeller()
        fetchProducts()
        
    }, [])

    // Updata Database Cart Item
    useEffect(()=>{
        const updateCart = async () => {
            try {
                const {data} = await axios.post('/api/cart/update',{cartItems})
                if (!data.success) {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }

        if(user){
            updateCart()
        }
    },[cartItems])

    // Update wishlist in database
    useEffect(() => {
        const updateWishlist = async () => {
            try {
                if (user) {
                    await axios.post('/api/user/wishlist', { wishlist })
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        
        if (user) {
            updateWishlist()
        }
    }, [wishlist])

    const value = { 
        navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, 
        products, currency, addToCart, upDateCartItem, cartItems, setCartItems, removeFromCart, 
        searchQuery, setSearchQuery, getCartCount, getCartAmount, axios, fetchProducts,
        wishlist, addToWishlist, removeFromWishlist
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}
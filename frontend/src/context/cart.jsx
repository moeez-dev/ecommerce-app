import { createContext, useContext, useEffect, useState } from "react";



const CartContext = createContext()


const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        let existingitems = localStorage.getItem('cart')
        if (existingitems) setCart(JSON.parse(existingitems))
    }, [])

    return (
        <CartContext.Provider value={[cart, setCart]} >
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)

export { useCart, CartProvider }
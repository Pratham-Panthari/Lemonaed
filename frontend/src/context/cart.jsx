import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    
    useEffect(() => {
        let exisitingCartItems = localStorage.getItem("cart")
        if(exisitingCartItems){
            setCart(JSON.parse(exisitingCartItems))
        }
    }, [])
    return(
        <>
            <CartContext.Provider value={[cart, setCart]}>
                {children}
            </CartContext.Provider>
        </>
    )
}

const useCart = () => useContext(CartContext)

export { useCart, CartProvider }
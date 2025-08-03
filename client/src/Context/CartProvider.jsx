import { useContext, createContext, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const addToCart = (item) => {
        if (user) {
            setCartItems([...cartItems, item]);
            setCartTotal(cartTotal + item.price);
            toast.success('Item added to cart!');
        } else {
            toast.error('You need to be logged in to add items to your cart.');
        }
    }

    const removeFromCart = (itemId) => {
        if (user) {
            const itemToRemove = cartItems.find(item => item._id === itemId);
            if (itemToRemove) {
                const updatedCart = cartItems.filter(item => item._id !== itemId);
                setCartItems(updatedCart);
                setCartTotal(cartTotal - itemToRemove.price);
                toast.success('Item removed from cart!');
            }
        } else {
            toast.error('You need to be logged in to remove items from your cart.');
        }
    }

    const clearCart = () => {
        if (user) {
            setCartItems([]);
            setCartTotal(0);
        } else {
            toast.error('You need to be logged in to clear your cart.');
        }
    }

    return (
        <CartContext.Provider value={{ cartItems, cartTotal, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

import { useContext } from 'react';
import { CartContext } from '../Context/CartProvider';
import Header from './Header';
import MainFooter from './MainFooter';
import { Link } from 'react-router-dom';

function Cart() {
    const { cartItems, cartTotal, removeFromCart } = useContext(CartContext);

    return (
        <div className="bg-gray-100">
            <Header />
            <div className="min-h-screen mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-lg mb-4">Your cart is empty</p>
                        <p className="text-gray-500 mb-8">Start exploring meals and add your favorites</p>
                        <Link to="/shop" className="text-blue-500 hover:underline">Browse Meals</Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden mb-8">
                            <thead className="bg-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuisine</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {cartItems.map((item, index) => (
                                    <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg shadow-md" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.cuisine}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">₹{item.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => removeFromCart(item._id)} className="text-sm text-red-600 hover:underline focus:outline-none">
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Link to="/shop" className="text-blue-500 hover:underline mb-6 block text-center">Add More Meals</Link>

                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">Total: ₹{cartTotal}</p>
                            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <MainFooter />
        </div>
    );
}

export default Cart;

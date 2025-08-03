import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthProvider'
import { toast } from 'react-toastify';
import { FaShoppingBag } from "react-icons/fa";
import { CartContext } from '../Context/CartProvider';

export default function Header() {

    const { user, logout } = useContext(AuthContext);
    const { cartItems, clearCart } = useContext(CartContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const [isHamburger, setIsHamburger] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [showUserPopup, setShowUserPopup] = useState(false);

    const userPopupRef = useRef(null);

    // search functionality
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const searchContainerRef = useRef(null);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const encodedSearchQuery = encodeURIComponent(searchQuery);
            const response = await fetch(`http://localhost:5000/meals/search/${encodedSearchQuery}`);
            // if (!response.ok) {
            //     toast.error('Error fetching search results');
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            const data = await response.json();
            setSearchResults(data.slice(0, 6));

            setShowResults(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDocumentClick = (e) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
            setShowResults(false);
            setSearchQuery('');
        }
        if (userPopupRef.current && !userPopupRef.current.contains(e.target)) {
            setShowUserPopup(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch();
        }, 200);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const getInitials = (name) => {
        return name ? name.split(' ').map(word => word.charAt(0)).join('').toUpperCase() : '';
    };

    const toggleMenu = () => {
        setIsHamburger(!isHamburger);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleUserBlockClick = () => {
        setShowUserPopup(!showUserPopup);
    };

    const handleLogout = () => {
        logout()
            .then(() => {
                toast.success('User Logged Out Successfully');
                setShowUserPopup(false);
                clearCart();
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    };

    const itemCount = cartItems.length;

    const navItems = [
        { link: "Home", path: "/" },
        { link: "Meals", path: "/shop" },
        { link: "Add Meal", path: "/admin/dashboard" },
    ];

    return (
        <header className={`${isSticky ? 'sticky-header' : ''}`}>
            <nav className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3">

                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to={"/"} className="flex items-center text-xl font-semibold text-gray-800">
                        <FaUtensils className="mr-2 text-xl" />
                        <span>Instant Meal</span>
                    </Link>
                    <div className="flex items-center lg:order-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for meals..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}

                                className="hidden justify-between items-center w-full md:flex md:w-auto px-4 py-2 mr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {showResults && (
                                <div ref={searchContainerRef} className="absolute z-10 w-full mt-1 bg-white border-gray-300 rounded shadow-md">
                                    {searchResults.length > 0 ? (
                                        <ul className="divide-y divide-gray-200">
                                            {searchResults.map((meal) => (
                                                <li key={meal._id} className="px-4 py-2">
                                                    <Link to={`/meal/${meal._id}`} className="block hover:bg-gray-100">{meal.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) :
                                        searchQuery.length > 0 && (
                                            <p className="px-4 py-2">No results found.</p>
                                        )
                                    }
                                </div>
                            )}
                        </div>


                        <Link to={user ? "/cart" : "/login"} className="text-gray-800 mr-4 relative">
                            <FaShoppingBag className="w-6 h-6" />
                            {itemCount >= 0 && (
                                <span className="bg-red-500 text-white text-xs text-center rounded-full w-4 h-4 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div ref={userPopupRef} className="relative">
                                <div className="rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center mr-2" onClick={handleUserBlockClick}>
                                    <span className="text-gray-800 font-semibold text-sm">{getInitials(user.displayName)}</span>
                                </div>
                                {showUserPopup && (
                                    <div className="absolute right-0 top-full bg-white border border-gray-300 rounded-2xl shadow-lg">
                                        <div className="py-1">
                                            <div className="px-4 py-2 text-gray-800">{user.displayName}</div>
                                            <div className="px-4 py-2 text-gray-800">{user.email}</div>
                                            <div className="flex justify-between px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-100" onClick={handleLogout}>
                                                <span>Logout</span>
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.293 8.293a1 1 0 011.414 1.414L6.414 12H15a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4z"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to={"/login"}
                                className="text-white bg-blue-600  hover:bg-blue-800 focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                Log in
                            </Link>
                        )}

                        <button onClick={toggleMenu} className="lg:hidden text-gray-800 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {
                                navItems.map(({ link, path }) => <Link key={path} to={path} className='block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:text-blue-400 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 transition-all ease-in-out duration-200'> {link} </Link>)
                            }
                        </ul>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`${isHamburger ? 'block' : 'hidden'} lg:hidden bg-gray-100 py-2`}>
                    <div className="container mx-auto">
                        <ul className="flex flex-col items-start">
                            {navItems.map(({ link, path }) => (
                                <li key={path} className="mb-2">
                                    <Link to={path} className="text-gray-700 hover:text-gray-900 transition duration-300">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

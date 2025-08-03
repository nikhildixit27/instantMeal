import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaUtensils, FaEye, FaChartLine, FaRegClock, FaArrowRight } from "react-icons/fa";
import Lottie from 'react-lottie';
import dashboardAnimation from '../../assets/Animation/dashboardAnimation.json';
import moment from 'moment';

export function Dashboard() {
    const { user } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [allMeals, setAllMeals] = useState([]);
    const searchContainerRef = useRef(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        setLoading(true);
        try {
            const encodedSearchQuery = encodeURIComponent(searchQuery);
            const response = await fetch(`http://localhost:5000/meals/search/${encodedSearchQuery}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSearchResults(data);
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
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: dashboardAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/all-meals');
                if (!response.ok) {
                    throw new Error('Failed to fetch meals');
                }
                const data = await response.json();
                setAllMeals(data);
            } catch (error) {
                console.error('Error fetching meals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    const lastThreeMeals = allMeals.slice(0, 3);

    // Dashboard stats
    const stats = [
        { label: "Total Meals", value: allMeals.length, icon: <FaUtensils />, color: "bg-blue-500" },
        { label: "Total Views", value: "1.2K", icon: <FaEye />, color: "bg-green-500" },
        { label: "Revenue", value: "₹12,500", icon: <FaChartLine />, color: "bg-purple-500" },
    ];

    return (
        <div className='w-full flex flex-col p-4 md:p-8 bg-gray-50 min-h-screen'>
            <div className="max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8'>
                    <div className="flex flex-col">
                        <h1 className='text-3xl md:text-4xl font-bold mb-2 text-gray-800'>
                            Hi, <span className="text-blue-600">{user.displayName}</span> 👋
                        </h1>
                        <p className="text-gray-600">
                            {moment().format('dddd, MMMM D, YYYY')} • Welcome to your dashboard
                        </p>
                    </div>

                    <div className="relative" ref={searchContainerRef}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for meals..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-[400px] pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            {loading && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            )}
                        </div>

                        {showResults && (
                            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                                {searchResults.length > 0 ? (
                                    <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                                        {searchResults.map((meal) => (
                                            <li key={meal._id} className="transition-colors duration-150 hover:bg-gray-50">
                                                <Link
                                                    to={`/meal/${meal._id}`}
                                                    className="flex items-center px-4 py-3 gap-3"
                                                    onClick={() => setShowResults(false)}
                                                >
                                                    {meal.image && (
                                                        <img
                                                            src={meal.image || "/placeholder.svg"}
                                                            alt={meal.title}
                                                            className="h-10 w-10 object-cover rounded-md"
                                                        />
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-gray-800">{meal.title}</p>
                                                        <p className="text-sm text-gray-500">{meal.category}</p>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : searchQuery.length > 0 && (
                                    <p className="px-4 py-3 text-gray-600">No results found.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md"
                        >
                            <div className="flex items-center">
                                <div className={`${stat.color} text-white p-3 rounded-lg mr-4`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Banner */}
                <div className='mb-8 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-amber-100 overflow-hidden shadow-sm'>
                    <div className='flex flex-col lg:flex-row justify-between items-center gap-8 p-6 lg:p-10'>
                        <div className='lg:max-w-xl'>
                            <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-gray-800'>
                                Upload Your Meal to <span className="text-orange-600">Increase Your Sales</span>
                            </h3>
                            <p className='text-base md:text-lg mb-6 text-gray-600 leading-relaxed'>
                                Showcase your delicious meals and make your kitchen more profitable. Our platform helps you reach more customers and grow your business.
                            </p>
                            <Link to="/admin/dashboard/upload">
                                <button className='bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group'>
                                    <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
                                    Add new meal
                                </button>
                            </Link>
                        </div>
                        <div className='lg:flex-shrink-0'>
                            <Lottie
                                options={defaultOptions}
                                height={280}
                                width={280}
                            />
                        </div>
                    </div>
                </div>

                {/* Recent Meals Table */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden'>
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                            <FaRegClock className="text-blue-500" /> Recently Added
                        </h2>
                        <Link
                            to="/admin/dashboard/manage"
                            className='text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium text-sm flex items-center gap-1'
                        >
                            View All <FaArrowRight className="text-xs" />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-left">
                                    <th className="px-4 py-3 text-gray-600 font-semibold text-sm rounded-tl-lg">Meal Name</th>
                                    <th className="px-4 py-3 text-gray-600 font-semibold text-sm">Category</th>
                                    <th className="px-4 py-3 text-gray-600 font-semibold text-sm">Date</th>
                                    <th className="px-4 py-3 text-gray-600 font-semibold text-sm rounded-tr-lg">Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {lastThreeMeals.length > 0 ? (
                                    lastThreeMeals.map((meal, index) => (
                                        <tr
                                            key={meal._id}
                                            className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${index === lastThreeMeals.length - 1 ? 'border-b-0' : ''
                                                }`}
                                        >
                                            <td className="px-4 py-4">
                                                <div className="flex items-center">
                                                    {meal.image && (
                                                        <img
                                                            src={meal.image || "/placeholder.svg"}
                                                            alt={meal.name}
                                                            className="h-10 w-10 object-cover rounded-md mr-3"
                                                        />
                                                    )}
                                                    <span className="font-medium text-gray-800">{meal.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-gray-600">{meal.category}</td>
                                            <td className="px-4 py-4 text-gray-600">{moment(meal.createdAt).format('DD MMM, YYYY')}</td>
                                            <td className="px-4 py-4 font-medium text-green-600">₹{meal.price}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                                            {loading ? (
                                                <div className="flex justify-center">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                                </div>
                                            ) : (
                                                "No meals found. Add your first meal!"
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../assets/Animation/HomePageBook.json'; // Replace with a food-themed JSON if available
import { FaUtensils, FaUsers, FaTruck, FaArrowRight } from 'react-icons/fa';

export const FavoriteMeal = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const stats = [
        {
            count: "300+",
            label: "Meals Available",
            icon: <FaUtensils className="text-emerald-500" />,
            color: "bg-emerald-50 border-emerald-200"
        },
        {
            count: "1,200+",
            label: "Happy Customers",
            icon: <FaUsers className="text-blue-500" />,
            color: "bg-blue-50 border-blue-200"
        },
        {
            count: "2,500+",
            label: "Meals Delivered",
            icon: <FaTruck className="text-amber-500" />,
            color: "bg-amber-50 border-amber-200"
        }
    ];

    return (
        <div className='px-6 lg:px-24 bg-gradient-to-b from-white to-gray-50'>
            <div className="max-w-7xl mx-auto">
                <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
                    {/* Animation */}
                    <div className='md:w-1/2 flex justify-center md:justify-start'>
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
                            <Lottie
                                options={defaultOptions}
                                height={400}
                                width={400}
                                className="relative z-10"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className='md:w-1/2 space-y-8'>
                        <h2 className='text-4xl md:text-5xl font-bold leading-tight text-center md:text-left text-gray-800'>
                            Discover Your Next <span className="text-blue-600">Favorite Meal</span>
                        </h2>

                        <p className='text-lg text-center md:text-left text-gray-600 leading-relaxed'>
                            Hungry for something new? Explore our diverse range of instant meals, perfect for every taste and lifestyle. Quick, delicious, and always satisfying.
                        </p>

                        {/* Stats */}
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 my-10'>
                            {stats.map((stat, index) => (
                                <div 
                                    key={index} 
                                    className={`text-center p-6 rounded-xl border ${stat.color} transition-all duration-300 hover:shadow-md transform hover:-translate-y-1`}
                                >
                                    <div className="flex justify-center mb-3">
                                        <div className="text-2xl">
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <h3 className='text-3xl font-bold text-gray-800 mb-1'>{stat.count}</h3>
                                    <p className='text-sm text-gray-600'>{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <Link to="/shop" className='block text-center md:text-start'>
                            <button className='group bg-blue-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto md:mx-0'>
                                Explore Meals
                                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoriteMeal;

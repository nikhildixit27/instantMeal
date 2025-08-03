import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartShopping, FaStar, FaClock, FaUtensils } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';

function MealCard({ heading, onAddToCart }) {
    const [meals, setMeals] = useState([]);

    // Fetch meals from API
    useEffect(() => {
        axios.get('http://localhost:5000/all-meals')
            .then(response => {
                const enrichedMeals = response.data.map(meal => ({
                    ...meal,
                    rating: (Math.random() * (5 - 3.8) + 3.5).toFixed(1),
                    time: `${Math.floor(Math.random() * 11) + 20}-${Math.floor(Math.random() * 6) + 30} min`
                }));
                setMeals(enrichedMeals);
            })
            .catch(error => console.error('Error fetching meals:', error));
    }, []);
    

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
    };

    const handleAddToCart = (e, meal) => {
        e.preventDefault();
        if (onAddToCart) {
            onAddToCart(meal);
        }
    };

    return (
        <div className='mx-auto px-4 lg:px-24 bg-gradient-to-b from-white to-gray-50 py-10 rounded-xl'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-3xl md:text-4xl text-gray-900 font-bold'>{heading}</h1>
                <Link to="/shop" className='text-sm font-medium text-red-600 hover:text-red-800 transition-colors'>
                    View all →
                </Link>
            </div>

            <div className='mt-8'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    navigation={true}
                    autoplay={{
                        delay: 3000,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 3, spaceBetween: 30 },
                        1024: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper py-8"
                >
                    {meals.map(meal => (
                        <SwiperSlide key={meal._id}>
                            <Link to={`/meal/${meal._id}`} className='block h-full transform transition-transform duration-300 hover:-translate-y-1'>
                                <div className='relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col'>
                                    <div className='relative aspect-[4/3] overflow-hidden'>
                                        <img
                                            src={meal.image || "/placeholder.svg"}
                                            alt={meal.name}
                                            className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                                            }}
                                        />
                                        <div className='absolute top-2 left-2'>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                                                meal.category.toLowerCase() === 'veg'
                                                    ? 'bg-green-500'
                                                    : meal.category.toLowerCase() === 'vegan'
                                                        ? 'bg-emerald-500'
                                                        : 'bg-red-500'
                                            }`}>
                                                {meal.category}
                                            </span>
                                        </div>
                                        <button
                                            className='absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-2 transition duration-300 shadow-md'
                                            onClick={(e) => handleAddToCart(e, meal)}
                                            aria-label="Add to cart"
                                        >
                                            <FaCartShopping className='w-4 h-4 text-gray-700' />
                                        </button>
                                    </div>

                                    <div className='p-4 flex-grow flex flex-col'>
                                        <div className='flex justify-between items-start'>
                                            <h3 className='text-lg font-semibold text-gray-900 line-clamp-1'>{meal.name}</h3>
                                            <div className='flex items-center gap-1 text-amber-500'>
                                                <FaStar className='w-3 h-3' />
                                                <span className='text-sm font-medium'>{meal.rating}</span>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-1 text-sm text-gray-600 mt-1'>
                                            <FaUtensils className='w-3 h-3' />
                                            <span>{meal.cuisine || 'Indian'}</span>
                                        </div>

                                        {meal.description && (
                                            <p className='text-sm text-gray-600 mt-2 line-clamp-2'>
                                                {truncateText(meal.description, 80)}
                                            </p>
                                        )}

                                        <div className='mt-auto pt-3 flex items-center justify-between'>
                                            <p className='text-lg font-bold text-red-600'>₹{typeof meal.price === 'number' ? meal.price.toFixed(2) : meal.price}</p>
                                            <div className='flex items-center gap-1 text-sm text-gray-500'>
                                                <FaClock className='w-3 h-3' />
                                                <span>{meal.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default MealCard;

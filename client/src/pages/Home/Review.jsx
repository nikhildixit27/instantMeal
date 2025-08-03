import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import { Pagination, Autoplay } from 'swiper/modules';
import { Rating, Avatar } from 'flowbite-react';
import { FaQuoteLeft } from 'react-icons/fa';

export const Review = () => {
    // Fake reviews data
    const reviews = [
        {
            rating: 5,
            text: "Amazing meals! The flavors were exceptional, and the presentation was beautiful. Will definitely order again.",
            author: "Raghav Dixit",
            position: "Food Lover",
            profilePic: "https://randomuser.me/api/portraits/men/79.jpg",
            gradientColors: "from-rose-50 to-rose-100"
        },
        {
            rating: 4,
            text: "Great experience at the restaurant! The food was delicious, and the ambiance was cozy and welcoming.",
            author: "Dhruv Dixit",
            position: "Gourmet Enthusiast",
            profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
            gradientColors: "from-amber-50 to-amber-100"
        },
        {
            rating: 5,
            text: "The best food delivery service I've used! The meal was fresh, hot, and incredibly tasty. Highly recommended.",
            author: "Prachi Dixit",
            position: "Foodie",
            profilePic: "https://randomuser.me/api/portraits/women/82.jpg",
            gradientColors: "from-emerald-50 to-emerald-100"
        },
        {
            rating: 5,
            text: "Exceptional quality and taste! Every bite was a delight. The packaging was also eco-friendly which I appreciate.",
            author: "Ananya Sharma",
            position: "Health Enthusiast",
            profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
            gradientColors: "from-blue-50 to-blue-100"
        },
    ];

    return (
        <div className='py-20 px-4 lg:px-20 bg-gradient-to-b from-white to-gray-50'>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className='text-4xl md:text-5xl font-bold mb-4 text-gray-800 relative inline-block'>
                        What Our Customers Say
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg">
                        Don't just take our word for it - see what our satisfied customers have to say about our delicious meals.
                    </p>
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{ 
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    autoplay={{ 
                        delay: 5000, 
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 40 },
                    }}
                    modules={[Autoplay, Pagination]}
                    className="pb-16"
                >
                    {/* Render each review slide */}
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div 
                                className={`h-full bg-gradient-to-br ${review.gradientColors} shadow-lg rounded-2xl p-8 border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}
                            >
                                <div className='flex flex-col h-full justify-between'>
                                    <div>
                                        {/* Quote Icon */}
                                        <FaQuoteLeft className="text-gray-300 text-4xl mb-4" />
                                        
                                        {/* Rating */}
                                        <div className="mb-4">
                                            <Rating>
                                                {[...Array(5)].map((_, index) => (
                                                    <Rating.Star 
                                                        key={index} 
                                                        filled={index < review.rating} 
                                                        className="text-amber-400"
                                                    />
                                                ))}
                                            </Rating>
                                        </div>
                                        
                                        {/* Review Text */}
                                        <p className='mb-6 text-gray-700 leading-relaxed italic text-lg'>
                                            "{review.text}"
                                        </p>
                                    </div>
                                    
                                    {/* Author Info */}
                                    <div className='flex items-center mt-auto pt-4 border-t border-gray-200'>
                                        <Avatar 
                                            img={review.profilePic || "https://randomuser.me/api/portraits/lego/2.jpg"} 
                                            alt="Customer Avatar" 
                                            rounded 
                                            className='mr-4 ring-2 ring-white shadow-md'
                                            size="md"
                                        />
                                        <div>
                                            <h5 className='text-lg font-semibold text-gray-900'>{review.author}</h5>
                                            <p className='text-sm text-gray-600'>{review.position}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

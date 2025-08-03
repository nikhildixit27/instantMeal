"use client"

import { useState, useEffect } from "react"
import { Card } from "flowbite-react"
import { Link } from "react-router-dom"
import { FaUtensils, FaLeaf, FaShoppingCart, FaAngleDown, FaAngleUp } from "react-icons/fa"

const AllMeals = () => {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [expandedDescriptionId, setExpandedDescriptionId] = useState(null)
    const [categories, setCategories] = useState([])
    const [activeCategory, setActiveCategory] = useState("All")

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:5000/all-meals")
            .then((res) => res.json())
            .then((data) => {
                setMeals(data)
                // Extract unique categories
                const uniqueCategories = ["All", ...new Set(data.map((meal) => meal.category))]
                setCategories(uniqueCategories)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching meals:", error)
                setLoading(false)
            })
    }, [])

    const toggleDescription = (id) => {
        setExpandedDescriptionId(expandedDescriptionId === id ? null : id)
    }

    const filteredMeals = activeCategory === "All" ? meals : meals.filter((meal) => meal.category === activeCategory)

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 py-16">
            <div className="container px-4 lg:px-24 mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 relative inline-block">
                        Explore Our Delicious Meals
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-6">
                        Discover our wide range of delicious meals prepared by expert chefs using the finest ingredients.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredMeals.map((meal) => (
                            <Card
                                key={meal._id}
                                className="bg-white shadow-lg rounded-xl overflow-hidden border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <Link to={`/meal/${meal._id}`} className="relative block overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                        <span className="text-white font-medium p-4">View Details</span>
                                    </div>
                                    <img
                                        src={meal.image || "/placeholder.svg"}
                                        alt={meal.name}
                                        className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-blue-700 shadow-md">
                                        {meal.category}
                                    </div>
                                </Link>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xl font-semibold text-gray-800 truncate">{meal.name}</h2>
                                        <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
                                            <FaUtensils className="mr-1" /> {meal.cuisine}
                                        </div>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600 mb-4">
                                        <FaLeaf className="mr-1 text-green-500" />
                                        <p className="line-clamp-1">{meal.ingredients}</p>
                                    </div>

                                    <div className="mb-4">
                                        {expandedDescriptionId === meal._id ? (
                                            <p className="text-gray-700">{meal.description}</p>
                                        ) : (
                                            <p className="text-gray-700 line-clamp-3">{meal.description}</p>
                                        )}
                                    </div>

                                    <button
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
                                        onClick={() => toggleDescription(meal._id)}
                                    >
                                        {expandedDescriptionId === meal._id ? (
                                            <>
                                                View Less <FaAngleUp className="ml-1" />
                                            </>
                                        ) : (
                                            <>
                                                View More <FaAngleDown className="ml-1" />
                                            </>
                                        )}
                                    </button>

                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-xl font-bold text-green-600">₹{meal.price}</p>
                                        {/* onclicking the button it should take user to the single meal page */}
                                        <Link to={`/meal/${meal._id}`} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2">
                                            <FaShoppingCart /> Order Now
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {!loading && filteredMeals.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-600 text-lg">No meals found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllMeals

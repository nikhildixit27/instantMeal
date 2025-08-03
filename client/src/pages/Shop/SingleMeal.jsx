"use client"

import { useContext, useState, useEffect } from "react"
import Header from "../../components/Header"
import { useParams } from "react-router-dom"
import {
    FaStar,
    FaShoppingCart,
    FaTrash,
    FaArrowLeft,
    FaUtensils,
    FaHeart,
    FaRegHeart,
    FaShare,
    FaLeaf,
    FaFire,
} from "react-icons/fa"
import MealCard from "../../components/MealCard"
import { CartContext } from "../../Context/CartProvider"

export const SingleMeal = () => {
    const { id } = useParams()
    const [meal, setMeal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [activeTab, setActiveTab] = useState("description")

    const { addToCart, cartItems, removeFromCart } = useContext(CartContext)

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:5000/meal/${id}`)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch meal")
                return response.json()
            })
            .then((data) => {
                setMeal(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching meal:", error)
                setLoading(false)
            })
    }, [id])

    const [relatedMeals, setRelatedMeals] = useState([])
    const [relatedMealsError, setRelatedMealsError] = useState(null)

    useEffect(() => {
        if (meal) {
            setLoading(true)
            fetch(`http://localhost:5000/meals/${meal.category}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch related meals")
                    return res.json()
                })
                .then((data) => {
                    const filtered = data.filter((m) => m._id !== id)
                    setRelatedMeals(filtered)
                    setLoading(false)
                })
                .catch((error) => {
                    setRelatedMealsError(error.message)
                    setLoading(false)
                })
        }
    }, [meal, id])

    const handleRating = (value) => {
        setRating(value)
        // Optional: send rating to backend
    }

    const handleAddToCart = () => addToCart(meal)
    const handleRemoveFromCart = () => removeFromCart(meal._id)

    const isInCart = meal && meal._id && cartItems.some((item) => item._id === meal._id)

    const handleCartButtonClick = () => {
        isInCart ? handleRemoveFromCart() : handleAddToCart()
    }

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
        // Optional: save to backend or localStorage
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: meal.title,
                text: `Check out this delicious ${meal.title}!`,
                url: window.location.href,
            })
        } else {
            // Fallback
            navigator.clipboard.writeText(window.location.href)
            alert("Link copied to clipboard!")
        }
    }

    // Parse ingredients if they exist
    const ingredientsList = meal?.ingredients ? meal.ingredients.split(",").map((item) => item.trim()) : []

    if (loading)
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                    <p className="text-lg font-medium text-gray-700">Loading delicious meal...</p>
                </div>
            </div>
        )

    if (!meal)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Meal Not Found</h2>
                    <p className="text-gray-600 mb-6">We couldn't find the meal you're looking for.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center mx-auto"
                    >
                        <FaArrowLeft className="mr-2" /> Go Back
                    </button>
                </div>
            </div>
        )

    return (
        <>
            <Header />
            <div className="mb-16 max-w-7xl mx-auto pt-6 md:pt-10 px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex mb-6 text-sm text-gray-500">
                    <a href="/" className="hover:text-blue-600 transition-colors">
                        Home
                    </a>
                    <span className="mx-2">/</span>
                    <a href={`/category/${meal.category}`} className="hover:text-blue-600 transition-colors">
                        {meal.category}
                    </a>
                    <span className="mx-2">/</span>
                    <span className="text-gray-700 font-medium">{meal.title}</span>
                </nav>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Image and Content Container */}
                    <div className="flex flex-col lg:flex-row">
                        {/* Image Container */}
                        <div className="lg:w-2/5 relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <img
                                src={meal.image || "/placeholder.svg"}
                                alt={meal.title}
                                className="h-64 lg:h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <button
                                    onClick={toggleFavorite}
                                    className="bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200"
                                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                >
                                    {isFavorite ? (
                                        <FaHeart className="text-red-500 text-xl" />
                                    ) : (
                                        <FaRegHeart className="text-gray-600 text-xl" />
                                    )}
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200"
                                    aria-label="Share this meal"
                                >
                                    <FaShare className="text-gray-600 text-xl" />
                                </button>
                            </div>
                            <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-blue-700 shadow-md">
                                {meal.category}
                            </div>
                        </div>

                        {/* Content Container */}
                        <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">{meal.title}</h1>
                                    <div className="flex items-center bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold">
                                        <FaLeaf className="mr-1" /> {meal.category}
                                    </div>
                                </div>

                                <p className="text-lg font-medium text-gray-600 mb-6 flex items-center">
                                    <FaUtensils className="mr-2 text-blue-500" />
                                    Prepared by <span className="ml-1 text-blue-600">{meal.chef}</span>
                                </p>

                                {/* Tabs */}
                                <div className="mb-6 border-b border-gray-200">
                                    <div className="flex space-x-8">
                                        <button
                                            className={`pb-2 px-1 ${activeTab === "description" ? "border-b-2 border-blue-500 text-blue-600 font-medium" : "text-gray-500"}`}
                                            onClick={() => setActiveTab("description")}
                                        >
                                            Description
                                        </button>
                                        <button
                                            className={`pb-2 px-1 ${activeTab === "ingredients" ? "border-b-2 border-blue-500 text-blue-600 font-medium" : "text-gray-500"}`}
                                            onClick={() => setActiveTab("ingredients")}
                                        >
                                            Ingredients
                                        </button>
                                        <button
                                            className={`pb-2 px-1 ${activeTab === "nutrition" ? "border-b-2 border-blue-500 text-blue-600 font-medium" : "text-gray-500"}`}
                                            onClick={() => setActiveTab("nutrition")}
                                        >
                                            Nutrition
                                        </button>
                                    </div>
                                </div>

                                {/* Tab Content */}
                                <div className="mb-6">
                                    {activeTab === "description" && (
                                        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                                            <p className="text-lg text-gray-700 leading-relaxed">{meal.description}</p>
                                        </div>
                                    )}

                                    {activeTab === "ingredients" && (
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredients:</h3>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {ingredientsList.length > 0 ? (
                                                    ingredientsList.map((ingredient, index) => (
                                                        <li key={index} className="flex items-center text-gray-700">
                                                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                            {ingredient}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="text-gray-500">Ingredients information not available</li>
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                    {activeTab === "nutrition" && (
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center justify-center mb-4">
                                                <FaFire className="text-orange-500 mr-2" />
                                                <span className="text-lg font-semibold">Nutritional Information</span>
                                            </div>
                                            <p className="text-center text-gray-500 italic">
                                                Nutritional information is currently being updated.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 space-y-6">
                                {/* Price and Cart */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center">
                                        <span className="text-3xl font-bold text-green-600">₹{meal.price}</span>
                                        <span className="ml-2 text-sm text-gray-500 line-through">₹{(meal.price * 1.2).toFixed(0)}</span>
                                        <span className="ml-2 text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                                            20% OFF
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleCartButtonClick}
                                        className={`px-6 py-3 rounded-lg font-medium text-white flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${isInCart ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                                            }`}
                                    >
                                        {isInCart ? (
                                            <>
                                                <FaTrash className="mr-2" />
                                                Remove from Cart
                                            </>
                                        ) : (
                                            <>
                                                <FaShoppingCart className="mr-2" />
                                                Add to Cart
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Rating System */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-800 font-semibold mb-2">Rate this meal:</p>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, index) => {
                                            const ratingValue = index + 1
                                            return (
                                                <label
                                                    key={index}
                                                    className="cursor-pointer p-1"
                                                    onMouseEnter={() => setHoverRating(ratingValue)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        value={ratingValue}
                                                        onClick={() => handleRating(ratingValue)}
                                                        className="hidden"
                                                    />
                                                    <FaStar
                                                        size={28}
                                                        color={ratingValue <= (hoverRating || rating) ? "#FFD700" : "#e4e5e9"}
                                                        className="transition-all duration-200"
                                                    />
                                                </label>
                                            )
                                        })}
                                        <span className="ml-4 text-gray-600">
                                            {rating > 0 ? `You rated: ${rating}/5` : "Click to rate"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Meals Section */}
                {/* <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500 inline-block">
            You Might Also Like
          </h2>

          {relatedMealsError && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">Error: {relatedMealsError}</div>
          )}

          {relatedMeals.length === 0 && !relatedMealsError && (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-600 text-lg">No related meals found in this category.</p>
            </div>
          )}

          {relatedMeals.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <MealCard meals={relatedMeals} onAddToCart={addToCart} />
            </div>
          )}
        </div> */}
            </div>
        </>
    )
}

export default SingleMeal

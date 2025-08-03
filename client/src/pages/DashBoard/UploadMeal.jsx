"use client"

import { useState } from "react"
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react"
import { toast } from "react-toastify"
import { FaCloudUploadAlt, FaImage, FaUtensils, FaTag, FaFileAlt, FaDollarSign, FaListUl } from "react-icons/fa"

export const UploadMeal = () => {
    const mealCategories = [
        "Veg",
        "Non-Veg",
        "Vegan",
        "Gluten-Free",
        "Keto",
        "Dessert",
        "Drinks",
        "Seafood",
        "Snacks",
        "Breakfast",
    ]

    const [selectedCategory, setSelectedCategory] = useState(mealCategories[0])
    const [formData, setFormData] = useState({
        name: "",
        cuisine: "",
        image: "",
        description: "",
        ingredients: "",
        price: "",
    })
    const [previewImage, setPreviewImage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChangeSelectedValue = (e) => {
        setSelectedCategory(e.target.value)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        // Update preview image if image URL changes
        if (name === "image") {
            setPreviewImage(value)
        }
    }

    const handleMealSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const newMeal = {
            name: formData.name,
            cuisine: formData.cuisine,
            image: formData.image,
            description: formData.description,
            category: selectedCategory,
            price: formData.price,
            ingredients: formData.ingredients,
        }

        try {
            const response = await fetch("http://localhost:5000/upload-meal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMeal),
            })

            if (!response.ok) {
                throw new Error("Failed to upload meal")
            }

            await response.json()
            toast.success("Meal Uploaded Successfully!")

            // Reset form
            setFormData({
                name: "",
                cuisine: "",
                image: "",
                description: "",
                ingredients: "",
                price: "",
            })
            setPreviewImage("")
            setSelectedCategory(mealCategories[0])
        } catch (error) {
            console.error("Error uploading meal:", error)
            toast.error("Error Uploading Meal")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="px-4 py-12 max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2 text-gray-800">Upload New Meal</h2>
                <p className="text-gray-600">Share your delicious creations with the world</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Preview Card */}
                <div className="lg:col-span-1 order-2 lg:order-1">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
                        <div className="relative h-48 bg-gray-200">
                            {previewImage ? (
                                <img
                                    src={previewImage || "/placeholder.svg"}
                                    alt="Meal Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-400">
                                    <FaImage className="text-4xl mb-2" />
                                    <span>Image Preview</span>
                                </div>
                            )}
                            {selectedCategory && (
                                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-blue-700 shadow-md">
                                    {selectedCategory}
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{formData.name || "Meal Name"}</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                {formData.cuisine ? `${formData.cuisine} Cuisine` : "Cuisine Type"}
                            </p>
                            <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                                {formData.description || "Your meal description will appear here..."}
                            </p>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <p className="text-xl font-bold text-green-600">{formData.price ? `₹${formData.price}` : "₹0.00"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload Form */}
                <div className="lg:col-span-2 order-1 lg:order-2">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <form onSubmit={handleMealSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="name" value="Meal Name" className="flex items-center gap-2 mb-2">
                                        <FaUtensils className="text-blue-500" /> Meal Name
                                    </Label>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="e.g. Butter Chicken"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="cuisine" value="Cuisine" className="flex items-center gap-2 mb-2">
                                        <FaTag className="text-blue-500" /> Cuisine
                                    </Label>
                                    <TextInput
                                        id="cuisine"
                                        name="cuisine"
                                        type="text"
                                        placeholder="e.g. Italian, Indian"
                                        value={formData.cuisine}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="image" value="Image URL" className="flex items-center gap-2 mb-2">
                                        <FaImage className="text-blue-500" /> Image URL
                                    </Label>
                                    <TextInput
                                        id="image"
                                        name="image"
                                        type="text"
                                        placeholder="https://example.com/image.jpg"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="category" value="Meal Category" className="flex items-center gap-2 mb-2">
                                        <FaTag className="text-blue-500" /> Meal Category
                                    </Label>
                                    <Select
                                        id="category"
                                        name="category"
                                        value={selectedCategory}
                                        onChange={handleChangeSelectedValue}
                                        className="w-full rounded"
                                    >
                                        {mealCategories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description" value="Description" className="flex items-center gap-2 mb-2">
                                    <FaFileAlt className="text-blue-500" /> Description
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe your meal in detail..."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="w-full"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="ingredients" value="Ingredients" className="flex items-center gap-2 mb-2">
                                        <FaListUl className="text-blue-500" /> Ingredients
                                    </Label>
                                    <Textarea
                                        id="ingredients"
                                        name="ingredients"
                                        placeholder="e.g. Tomato, Cheese, Basil (comma separated)"
                                        value={formData.ingredients}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="price" value="Price (₹)" className="flex items-center gap-2 mb-2">
                                        <FaDollarSign className="text-blue-500" /> Price (₹)
                                    </Label>
                                    <TextInput
                                        id="price"
                                        name="price"
                                        type="text"
                                        placeholder="e.g. 299"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <FaCloudUploadAlt className="text-xl" /> Upload Meal
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

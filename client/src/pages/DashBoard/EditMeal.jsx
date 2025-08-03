"use client"

import { useState, useEffect } from "react"
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaSave, FaTimes, FaArrowLeft } from "react-icons/fa"

export const EditMeal = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [mealData, setMealData] = useState({
        name: "",
        chef: "",
        image: "",
        category: "",
        description: "",
        link: "",
        price: "",
        ingredients: "",
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/meal/${id}`)
                if (!response.ok) throw new Error("Failed to fetch meal data")
                const data = await response.json()
                setMealData(data)
                setSelectedCategory(data.category)
                setPreviewImage(data.image)
            } catch (error) {
                console.error("Error fetching meal data:", error)
                toast.error("Failed to load meal data")
            } finally {
                setLoading(false)
            }
        }

        fetchMealData()
    }, [id])

    const mealCategories = [
        "Indian",
        "Chinese",
        "Italian",
        "Mexican",
        "American",
        "Thai",
        "Japanese",
        "Korean",
        "Vegan",
        "Desserts",
        "Snacks",
    ]

    const handleChangeSelectedValue = (event) => {
        setSelectedCategory(event.target.value)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setMealData({ ...mealData, [name]: value })

        // Update preview image if image URL changes
        if (name === "image") {
            setPreviewImage(value)
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        setSaving(true)

        try {
            const response = await fetch(`http://localhost:5000/update-meal/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ ...mealData, category: selectedCategory }),
            })
            if (!response.ok) throw new Error("Failed to update meal")
            toast.success("Meal updated successfully")
            navigate("/admin/dashboard/manage")
        } catch (error) {
            console.error("Error updating meal:", error)
            toast.error("Failed to update meal")
        } finally {
            setSaving(false)
        }
    }

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        )

    return (
        <div className="px-4 py-12 max-w-7xl mx-auto">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <FaArrowLeft className="text-gray-600" />
                </button>
                <h2 className="text-3xl font-bold text-gray-800">Edit Meal Details</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Preview Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
                        <div className="relative h-48 bg-gray-200">
                            {previewImage ? (
                                <img
                                    src={previewImage || "/placeholder.svg"}
                                    alt="Meal Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">No Image</div>
                            )}
                            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-blue-700 shadow-md">
                                {selectedCategory}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{mealData.name || "Meal Name"}</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                By {mealData.chef || "Chef Name"} • {selectedCategory}
                            </p>
                            <p className="text-gray-700 mb-4 text-sm line-clamp-3">{mealData.description || "Meal description..."}</p>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <p className="text-xl font-bold text-green-600">₹{mealData.price || "0"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <form className="flex flex-col gap-6" onSubmit={handleUpdate}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="name" value="Meal Name" className="mb-2 block" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Meal Name"
                                        value={mealData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="chef" value="Chef Name" className="mb-2 block" />
                                    <TextInput
                                        id="chef"
                                        name="chef"
                                        type="text"
                                        placeholder="Chef Name"
                                        value={mealData.chef}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="image" value="Image URL" className="mb-2 block" />
                                    <TextInput
                                        id="image"
                                        name="image"
                                        type="text"
                                        placeholder="Meal Image URL"
                                        value={mealData.image}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="category" value="Category" className="mb-2 block" />
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
                                <Label htmlFor="description" value="Description" className="mb-2 block" />
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Add Meal Description"
                                    value={mealData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <Label htmlFor="ingredients" value="Ingredients" className="mb-2 block" />
                                <Textarea
                                    id="ingredients"
                                    name="ingredients"
                                    placeholder="Add ingredients (comma separated)"
                                    value={mealData.ingredients}
                                    onChange={handleInputChange}
                                    required
                                    rows={3}
                                    className="w-full"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="link" value="Meal Order Link" className="mb-2 block" />
                                    <TextInput
                                        id="link"
                                        name="link"
                                        type="text"
                                        placeholder="Link to Order"
                                        value={mealData.link}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="price" value="Price" className="mb-2 block" />
                                    <TextInput
                                        id="price"
                                        name="price"
                                        type="text"
                                        placeholder="Enter Price"
                                        value={mealData.price}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-4">
                                <Button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                                >
                                    {saving ? (
                                        <>
                                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <FaSave /> Update Meal
                                        </>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 flex items-center gap-2"
                                >
                                    <FaTimes /> Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

"use client"

import { Table } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { FaEdit, FaTrashAlt, FaEye, FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa"

export const ManageMeal = () => {
    const [allMeals, setAllMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null })
    const [confirmDelete, setConfirmDelete] = useState(null)

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch("http://localhost:5000/all-meals")
                if (!response.ok) throw new Error("Failed to fetch meals")
                const data = await response.json()
                setAllMeals(data)
            } catch (error) {
                console.error("Error fetching meals:", error)
                toast.error("Failed to fetch meals. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        fetchMeals()
    }, [])

    const handleDelete = async (id) => {
        if (confirmDelete !== id) {
            setConfirmDelete(id)
            return
        }

        setLoading(true)
        try {
            const response = await fetch(`http://localhost:5000/delete-meal/${id}`, {
                method: "DELETE",
            })
            if (!response.ok) throw new Error("Failed to delete meal")
            toast.success("Meal Deleted Successfully!!")
            setAllMeals(allMeals.filter((meal) => meal._id !== id))
        } catch (error) {
            console.error("Error deleting meal:", error)
            toast.error("Failed to delete meal. Please try again later.")
        } finally {
            setLoading(false)
            setConfirmDelete(null)
        }
    }

    const handleSort = (key) => {
        let direction = "ascending"
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending"
        }
        setSortConfig({ key, direction })
    }

    const sortedMeals = [...allMeals].sort((a, b) => {
        if (!sortConfig.key) return 0

        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (aValue < bValue) {
            return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (aValue > bValue) {
            return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
    })

    const filteredMeals = sortedMeals.filter(
        (meal) =>
            meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meal.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meal.chef.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const getSortIcon = (name) => {
        if (sortConfig.key !== name) {
            return <FaSort className="ml-1 text-gray-400" />
        }
        return sortConfig.direction === "ascending" ? (
            <FaSortUp className="ml-1 text-blue-600" />
        ) : (
            <FaSortDown className="ml-1 text-blue-600" />
        )
    }

    return (
        <div className="px-4 py-12 max-w-7xl mx-auto">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2 text-gray-800">Manage Your Meals</h2>
                <p className="text-gray-600">View, edit, and manage all your meals in one place</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search meals..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="text-gray-600">
                        {filteredMeals.length} {filteredMeals.length === 1 ? "meal" : "meals"} found
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                    </div>
                ) : filteredMeals.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 text-lg">No meals found.</p>
                        <Link
                            to="/admin/dashboard/upload"
                            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add Your First Meal
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table hoverable className="w-full">
                            <Table.Head className="bg-gray-50">
                                <Table.HeadCell className="cursor-pointer" onClick={() => handleSort("name")}>
                                    <div className="flex items-center">Name {getSortIcon("name")}</div>
                                </Table.HeadCell>
                                <Table.HeadCell className="cursor-pointer" onClick={() => handleSort("chef")}>
                                    <div className="flex items-center">Chef {getSortIcon("chef")}</div>
                                </Table.HeadCell>
                                <Table.HeadCell className="cursor-pointer" onClick={() => handleSort("category")}>
                                    <div className="flex items-center">Category {getSortIcon("category")}</div>
                                </Table.HeadCell>
                                <Table.HeadCell className="cursor-pointer" onClick={() => handleSort("price")}>
                                    <div className="flex items-center">Price {getSortIcon("price")}</div>
                                </Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>

                            <Table.Body className="divide-y">
                                {filteredMeals.map((meal, index) => (
                                    <Table.Row key={meal._id} className="bg-white hover:bg-gray-50 transition-colors">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                            <div className="flex items-center">
                                                <img
                                                    src={meal.image || "/placeholder.svg"}
                                                    alt={meal.name}
                                                    className="h-10 w-10 rounded-full object-cover mr-3"
                                                />
                                                {meal.name}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>{meal.chef}</Table.Cell>
                                        <Table.Cell>
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                {meal.category}
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell className="font-medium text-green-600">₹{meal.price}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex space-x-2">
                                                <Link
                                                    to={`/meal/${meal._id}`}
                                                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                                    title="View"
                                                >
                                                    <FaEye />
                                                </Link>
                                                <Link
                                                    to={`/admin/dashboard/edit/${meal._id}`}
                                                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </Link>
                                                <button
                                                    className={`p-2 rounded-lg transition-colors ${confirmDelete === meal._id
                                                            ? "bg-red-600 text-white hover:bg-red-700"
                                                            : "bg-red-100 text-red-600 hover:bg-red-200"
                                                        }`}
                                                    onClick={() => handleDelete(meal._id)}
                                                    title={confirmDelete === meal._id ? "Confirm Delete" : "Delete"}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    )
}

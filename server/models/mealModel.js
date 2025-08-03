const mongoose = require('mongoose');

const MealSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        cuisine: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String, // e.g., "Veg", "Non-Veg", "Vegan", etc.
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String, // URL to the meal image
            required: true,
        },
        ingredients: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Meal', MealSchema);

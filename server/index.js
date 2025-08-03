const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const mealStore = require('./models/mealModel'); // previously bookModel
const port = process.env.PORT || 5000;

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome to Instant Meal API!');
});

// Uploading a meal
app.post("/upload-meal", async (req, res) => {
    const data = req.body;
    try {
        const result = await mealStore.create(data);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Getting all meals
app.get("/all-meals", async (req, res) => {
    try {
        const result = await mealStore.find();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Getting a single meal
app.get("/meal/:id", async (req, res) => {
    try {
        const result = await mealStore.findById(req.params.id);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Updating a meal
app.patch("/update-meal/:id", async (req, res) => {
    try {
        const result = await mealStore.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Deleting a meal
app.delete("/delete-meal/:id", async (req, res) => {
    try {
        const result = await mealStore.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Getting meals by category
app.get("/meals/category/:category", async (req, res) => {
    try {
        const result = await mealStore.find({ category: req.params.category });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Search functionality for meals
app.get("/meals/search/:searchCriteria", async (req, res) => {
    const searchQuery = req.params.searchCriteria;
    try {
        const result = await mealStore.find({
            $or: [
                { name: { $regex: searchQuery, $options: "i" } },
                { cuisine: { $regex: searchQuery, $options: "i" } }
            ]
        });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Instant Meal Server started on port ${port}`.green);
});

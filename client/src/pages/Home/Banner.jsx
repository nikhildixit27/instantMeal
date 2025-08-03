import React, { useState, useRef, useEffect } from 'react';
import MealSlider from './MealSlider'; // previously BookSlider
import { Link } from 'react-router-dom';

function Banner() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [searchClicked, setSearchClicked] = useState(false);

    const searchContainerRef = useRef(null);

    const handleSearch = async () => {
        setSearchClicked(true);
        setLoading(true);
        try {
            const encodedSearchQuery = encodeURIComponent(searchQuery);
            const response = await fetch(`http://localhost:5000/meals/search/${encodedSearchQuery}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSearchResults(data.slice(0, 3));
            setShowResults(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDocumentClick = (e) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
            setShowResults(false);
            setSearchQuery('');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <section className='pt-6 md:pt-20 pb-10 bg-gray-100 px-4 lg:px-24'>
            <div className='max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between'>
                {/* Left side */}
                <div className='w-full md:w-1/2 space-y-6 md:pr-8' ref={searchContainerRef}>
                    <h1 className="mb-4 text-4xl font-extrabold text-gray-800 md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            Welcome to
                        </span> Instant Meal.
                    </h1>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl">
                        Craving something delicious? Explore a wide range of instant meals from your favorite Indian cuisines.
                        Fresh, flavorful, and ready in minutes!
                    </p>
                    <div className="flex flex-col md:flex-row items-center mt-6 relative">
                        <input
                            type="text"
                            placeholder="Search for meals..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-3/4 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                            onClick={handleSearch}
                            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md mt-4 md:mt-0 md:ml-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>

                        {searchClicked && showResults && searchResults.length === 0 && (
                            <p className="absolute max-w-64 top-full left-0 right-0 bg-white shadow-md mt-2 py-2 px-4 rounded-lg z-10">No results found.</p>
                        )}
                        {searchClicked && showResults && searchResults.length > 0 && (
                            <div className="absolute max-w-96 top-full left-0 right-0 bg-white shadow-md mt-2 py-2 px-4 rounded-lg z-10">
                                {searchResults.map((meal) => (
                                    <Link to={`/meal/${meal._id}`} className="block" key={meal._id}>
                                        <div className="flex items-center py-2">
                                            <img src={meal.image} alt={meal.name} className="w-12 h-16 object-center mr-2 rounded" />
                                            <div>
                                                <h3 className="text-lg font-semibold">{meal.name}</h3>
                                                <p className="text-gray-600">Cuisine: {meal.cuisine}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right side */}
                <div className="w-full md:w-1/2 mt-8 md:mt-0">
                    <MealSlider /> {/* update this file/component if needed */}
                </div>
            </div>
        </section>
    );
}

export default Banner;

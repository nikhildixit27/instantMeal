import {
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaGithub,
    FaHeart,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhone,
} from "react-icons/fa"
import { Link } from "react-router-dom"

function MainFooter() {
    const socialHandles = [
        {
            name: "Twitter",
            link: "https://twitter.com",
            icon: <FaTwitter />,
            color: "hover:text-blue-400",
        },
        {
            name: "LinkedIn",
            link: "https://www.linkedin.com",
            icon: <FaLinkedin />,
            color: "hover:text-blue-700",
        },
        {
            name: "Instagram",
            link: "https://www.instagram.com",
            icon: <FaInstagram />,
            color: "hover:text-pink-600",
        },
        {
            name: "GitHub",
            link: "https://github.com",
            icon: <FaGithub />,
            color: "hover:text-gray-900",
        },
    ]

    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Menu", path: "/menu" },
        { name: "Contact", path: "/contact" },
    ]

    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 py-12">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 relative inline-block">
                            Instant Meal
                            <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500"></span>
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Delicious meals delivered to your doorstep. We make food that's both nutritious and delicious, perfect for
                            busy lifestyles.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="bg-gray-700 p-2 rounded-full">
                                <FaMapMarkerAlt className="text-blue-400" />
                            </div>
                            <span className="text-gray-300 text-sm">xxxxxxx, xxxxxx</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-3">
                            <div className="bg-gray-700 p-2 rounded-full">
                                <FaPhone className="text-blue-400" />
                            </div>
                            <span className="text-gray-300 text-sm">+91 xxxxxxxxxx</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-3">
                            <div className="bg-gray-700 p-2 rounded-full">
                                <FaEnvelope className="text-blue-400" />
                            </div>
                            <span className="text-gray-300 text-sm">contact@instantmeal.com</span>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500"></span>
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                                    >
                                        <span className="mr-2">›</span> {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Connect */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 relative inline-block">
                            Connect With Me
                            <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500"></span>
                        </h3>
                        <p className="text-gray-300 mb-6">Let's connect and build something amazing together!</p>
                        <div className="flex space-x-4">
                            {socialHandles.map((handle, index) => (
                                <Link
                                    to={handle.link}
                                    key={index}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`bg-gray-700 p-3 rounded-full text-white transition-all duration-300 hover:bg-white ${handle.color}`}
                                    aria-label={handle.name}
                                >
                                    {handle.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 py-6 px-6 text-center">
                    <p className="text-gray-400 text-sm flex items-center justify-center">
                        © {new Date().getFullYear()} Instant Meal. Developed with <FaHeart className="text-red-500 mx-1" /> by{" "}
                        <span className="font-medium text-blue-400 ml-1">Nik</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default MainFooter

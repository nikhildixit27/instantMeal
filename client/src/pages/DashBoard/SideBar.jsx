import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiOutlineCloudUpload,
    HiShoppingBag,
    HiOutlineLogin,
    HiHome,
} from 'react-icons/hi';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { toast } from 'react-toastify';

function SideBar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const getInitials = (name) => {
        return name ? name.split(' ').map(word => word.charAt(0)).join('').toUpperCase() : '';
    };

    const handleSignOut = () => {
        logout()
            .then(() => {
                toast.success('User Logged Out Successfully');
                navigate(from, { replace: true });
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        user && (
            <div className="w-20 md:w-64 h-screen text-gray-800 md:bg-transparent md:text-gray-800 border-r border-gray-300">
                <div className="p-4">
                    <div className="flex items-center mb-6">
                        <div className="rounded-full bg-gray-800 w-10 h-10 flex items-center justify-center mr-2">
                            <span className="text-gray-100 font-semibold text-lg">{getInitials(user.displayName)}</span>
                        </div>
                        <span className="hidden md:inline-block md:text-gray-800 md:font-bold md:text-2xl">
                            Instant Meal
                        </span>
                    </div>
                    <ul>
                        <li className="mb-5">
                            <Link to="/admin/dashboard" className="flex items-center text-base hover:text-black pl-2">
                                <HiChartPie className="mr-2 h-6 w-6" />
                                <span className="hidden md:inline-block">Dashboard</span>
                            </Link>
                        </li>
                        <li className="mb-5">
                            <Link to="/admin/dashboard/upload" className="flex items-center text-base hover:text-black pl-2">
                                <HiOutlineCloudUpload className="mr-2 h-6 w-6" />
                                <span className="hidden md:inline-block">Upload Meals</span>
                            </Link>
                        </li>
                        <li className="mb-5">
                            <Link to="/admin/dashboard/manage" className="flex items-center text-base hover:text-black pl-2">
                                <HiInbox className="mr-2 h-6 w-6" />
                                <span className="hidden md:inline-block">Manage Meals</span>
                            </Link>
                        </li>
                        <li className="mb-5">
                            <Link to="/" className="flex items-center text-base hover:text-black pl-2 mb-2">
                                <HiHome className="mr-2 h-6 w-6" />
                                <span className="hidden md:inline-block">Home Page</span>
                            </Link>
                        </li>
                        <li className="mb-5">
                            <button onClick={handleSignOut} className="flex items-center text-base hover:text-black pl-2 mb-2">
                                <HiOutlineLogin className="mr-2 h-6 w-6" />
                                <span className="hidden md:inline-block">Log Out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    );
}

export default SideBar;

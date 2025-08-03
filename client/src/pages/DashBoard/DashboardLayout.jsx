import React, { useContext, useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider';

export const DashboardLayout = () => {
    const { user } = useContext(AuthContext);

    const location = useLocation();

    return (
        user ?
            (<>
                <div className='flex flex-row'>
                    <SideBar />
                    <Outlet />
                </div>

            </>) : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default DashboardLayout

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import { SingleMeal } from './pages/Shop/SingleMeal';

import DashboardLayout from './pages/DashBoard/DashboardLayout';
import { UploadMeal } from './pages/DashBoard/UploadMeal';
import { Dashboard } from './pages/DashBoard/Dashboard';
import { ManageMeal } from './pages/DashBoard/ManageMeal';
import { EditMeal } from './pages/DashBoard/EditMeal';

import { Signup } from './pages/Auth/Signup';
import { Login } from './pages/Auth/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './Context/AuthProvider';
import Cart from './components/Cart';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/meal/:id' element={<SingleMeal />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />

            {/* Admin Routes */}
            <Route path='/admin' element={<DashboardLayout />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='dashboard/upload' element={<UploadMeal />} />
              <Route path='dashboard/manage' element={<ManageMeal />} />
              <Route path='dashboard/edit/:id' element={<EditMeal />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

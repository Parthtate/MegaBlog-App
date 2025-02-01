import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { Header, Footer } from './components';
import { login, logout } from './features/authSlice'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {( 
    async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log("Error in App.jsx useEffect:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);   

  // Conditional rendering
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between ">
      <div className='w-full'> 
      <Header />
      <main> 
        <Outlet/>
      </main>
      <Footer />
    </div>
    </div>
  ) : null;
  
}

export default App
// TODO


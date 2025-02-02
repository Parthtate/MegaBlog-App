import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AuthLayout({children, authentication = true}) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        // same but in easy way to understand
        // if (authStatus === true) {
        //     navigate("/login")
        // } else if (authStatus === false) {
        //     navigate("/")
        // }
        
        if (authentication && authStatus !== authentication) {
            // navigate user to login page
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        } 
        setLoading(false)
    }, [authStatus, authentication, navigate])

  return loading ? <div>Loading...</div> : <>{children}</>;
}

export default AuthLayout



import { Navigate } from 'react-router-dom';




export { PrivateRoute };

function PrivateRoute({ children }) {
    const user = localStorage.getItem("token")
    
    if (!user) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/"  />
    }

    // authorized so return child components
    return children;
}
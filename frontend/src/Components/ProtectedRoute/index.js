import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';


// ProtectedRoute component that checks if the user is authenticated
const ProtectedRoute = (props) => {
    const token = Cookies.get('token')
    console.log(token)
    if (token === undefined){
        return <Navigate to="/login" />
    }
    return props.children
 // Example auth check using token
};

export default ProtectedRoute;
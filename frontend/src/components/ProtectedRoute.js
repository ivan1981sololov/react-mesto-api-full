import React from 'react';
import {Outlet, Navigate} from "react-router-dom";


const ProtectedRoute = ({
    components, status
}) => {
    return status ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
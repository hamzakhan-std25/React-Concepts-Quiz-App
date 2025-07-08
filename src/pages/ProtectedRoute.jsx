
import { useNavigate } from "react-router-dom"; 



import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, children }) => {
    // If not authenticated, redirect to login page
    if (isAuth === "false" || isAuth === null) {
        return <Navigate to="/login" replace />;
    }
    return children;
};


export default ProtectedRoute;

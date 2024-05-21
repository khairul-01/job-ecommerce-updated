import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(location);
    // const navigate = useNavigate();

    if (loading) {
        return <div className="flex justify-center my-12">
            {/* <img className="w-24" src={loadingImg} alt="Loading img" /> */}
            <div><progress className="progress w-56"></progress></div>
        </div>
    }
    if (user?.email) {
        return children;
    }

    return <Navigate to = '/login' state={{fromWhere: location}}></Navigate>
};

export default PrivateRoute;
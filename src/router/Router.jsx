
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Root from "../components/Root"
import Home from "../components/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Login from './../components/login/Login';
import Registration from "../components/login/Registration";
import AddJob from "../components/pages/AddJob/AddJob";
import PostedJobs from "../components/pages/PostedJobs/PostedJobs";
import MyBids from "../components/pages/MyBids/MyBids";
import JobDetails from "../components/pages/JobDetails/JobDetails";
import BidRequests from "../components/pages/BidRequests/BidRequests";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                // loader: () => fetch('https://assignment-eleven-server-theta.vercel.app/jobs'),
            },
            {
                path: '/login',
                element: <Login></Login>
             },
             {
                path: '/register',
                element: <Registration></Registration>,
             },
             {
                path: 'addJob',
                element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
             },
             {
                path: 'postedJobs',
                element: <PrivateRoute><PostedJobs></PostedJobs></PrivateRoute>,
                loader: () => fetch('http://localhost:5000/jobs')
             },
             {
                path: 'myBids',
                element: <PrivateRoute><MyBids></MyBids></PrivateRoute>,
                loader: () => fetch('http://localhost:5000/bidJobs')
             },
             {
               path: 'jobs/:id',
               element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
               loader: ({params}) => fetch(`http://localhost:5000/jobs/${params.id}`)
             },
             {
               path: 'bidRequests',
               element: <PrivateRoute><BidRequests></BidRequests></PrivateRoute>,
               loader: () => fetch('http://localhost:5000/bidJobs')
             }
        ]
    }
]);
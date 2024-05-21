
import { Link } from 'react-router-dom';
import errorImage from '../../assets/images/404 error.png'

const ErrorPage = () => {
    return (
        <div className="flex min-h-screen justify-center items-center">
         <h1 className="text-3xl font-bold flex items-center gap-12"><img src={errorImage} alt="Error Image" />   <Link to='/' className="btn btn-error">Back to Home</Link></h1>
      </div>
    );
};

export default ErrorPage;
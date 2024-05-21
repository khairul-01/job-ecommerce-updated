import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";


const Login = () => {

   const {userLogin, signWithGoogle} = useAuth();
   const location = useLocation();
   const navigate = useNavigate();
   const fromWhere = location.state?.fromWhere?.pathname || '/';

   const handleGoogleLogin = () => {
      signWithGoogle()
         .then(result => {
            console.log('Successfully signed with google', result.user);
            navigate(fromWhere, {replace: true});
         })
         .catch(error => {
            console.log('google login error', error);
         })
   }

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password); 

        userLogin(email, password)
         .then(result => {
            console.log('Successfully logged in', result.user);
            navigate(location?.state ? location.state : '/');
            const jobUser = { email };
            console.log(jobUser);
            // Get access token
            // axios.post('https://assignment-eleven-server-theta.vercel.app/login', jobUser)
            // .then(res => {
            //    console.log(res.data)
            // })

         })
         .catch(error => {
            console.error(error);
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Your password or email does not matched!',
            })
         })

     }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
               <div className="text-center">
                  <h1 className="text-5xl font-bold">Login now!</h1>

               </div>
               <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                  <form onSubmit={handleLogin} className="card-body">
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                     </div>
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                           <a className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                     </div>
                     <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                     </div>
                  </form>
                  <p className="px-5 py-3">Login with <button onClick={handleGoogleLogin} className="btn btn-sm underline">Google</button></p>
                  <p className="px-5 py-3">Are you new here! Please <Link to='/register' className="btn btn-sm underline">Register</Link></p>
               </div>
            </div>
         </div>
        </div>
    );
};

export default Login;
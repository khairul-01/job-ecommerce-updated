
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/kh-ecommerce logo.jpg'
import userPic from '../../assets/images/user photo.png'
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
   const { user, logOut } = useAuth();
   const handleSignOut = () => {
      logOut()
         .then(() => [
            console.log('User loggedout successfully')
         ])
         .catch(error => {
            console.error(error);
         })
   }
   const navLinks = <>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/addJob'>Add Job</NavLink></li>
      <li><NavLink to='/postedJobs'>My Posted Jobs</NavLink></li>
      <li><NavLink to='/myBids'>My Bids</NavLink></li>
      <li><NavLink to='/bidRequests'>Bid Requests</NavLink></li>
      {/* {
         !user && <li><NavLink to='/register'>Register</NavLink></li>
      } */}

   </>
   return (
      <div>
         {/* <motion.nav
            whileHover={{ scale: 1.05 }}
            // whileTap={{ scale: 0.9 }}

            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
         > */}
         {/* Your Navbar content goes here */}
         <div className="navbar bg-base-100">

            <div className="navbar-start">
               <div className="dropdown">

                  <label tabIndex={0} className="btn btn-ghost lg:hidden">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>

                  </label>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                     {navLinks}
                  </ul>

               </div>
               <a className="flex md:hidden items-center btn btn-ghost text-sm py-1"><img className="h-5 w-5" src={logo} alt="KH Ecommerce Logo" /><span className="font-bold text-orange-500">KH</span></a>
               <a className="hidden md:flex items-center btn btn-ghost text-xl py-1"><img className="h-7 w-7" src={logo} alt="KH Ecommerce Logo" /><span className="font-bold text-orange-500">KH</span> Ecommerce</a>
            </div>
            <div className="navbar-center hidden lg:flex">
               <ul className="menu menu-horizontal px-1">
                  {navLinks}
               </ul>
            </div>
            <div className="navbar-end">
               {
                  user ? <div className='flex items-center gap-3'>
                     <a className="hidden sm:flex">{user?.displayName ? user.displayName : user.email}</a>
                     <a className="hidden sm:flex"><img className='w-7' src={user.photoURL} alt="user photo" /></a>
                     <a onClick={handleSignOut} className="btn">Sign Out</a>
                  </div>
                     :
                     <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost">
                           <a className="btn"><img className='w-7' src={userPic} alt="user" /></a>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-24">
                           <li><NavLink to='/login'>Login</NavLink></li>
                           <li><NavLink to='/register'>Register</NavLink></li>
                        </ul>
                     </div>
               }

            </div>
         </div>
         {/* </motion.nav> */}

      </div>
   );
};

export default Navbar;
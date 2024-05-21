import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";


const JobDetails = () => {
    const detailsJob = useLoaderData();
    const { job_title, job_description, minimum_price, maximum_price, deadline, email } = detailsJob;
    const { user } = useAuth();
    const navigate = useNavigate();

    const currentDate = new Date();
    const deadlineDate = new Date(deadline);

    const handleBid = event => {
        event.preventDefault();
        const form = event.target;
        const userEmail = form.email.value;
        const biddingPrice = form.price.value;
        const deadline = form.deadline.value;
        const email = form.ownerEmail.value;

        const bidInfo = {
            job_title,
            biddingPrice,
            email,
            userEmail,
            deadline
        }
        console.log(bidInfo);

        axios.post('http://localhost:5000/bidJobs', bidInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    // toast.success("Data added successfully !", {
                    //     position: toast.POSITION.TOP_RIGHT
                    // });
                    Swal.fire({
                        title: 'Success!',
                        text: 'Job information updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    navigate('/myBids')
                }
            })
    }

    return (
        <div>
            <div className="text-center my-6">
                <h1 className="text-5xl font-bold">Job Details</h1>
            </div>
            <div className="card bg-accent text-accent-content glass">
                <div className="card-body">
                    <h2 className="card-title"><span className="font-bold">Job Title: </span> {job_title}</h2>
                    <p><span className="font-bold">Deadline: </span> {deadline} </p>
                    <p><span className="font-bold">Prece Range: </span> {minimum_price} - {maximum_price} $</p>
                    <p><span className="font-bold">Short Description: </span> {job_description} </p>

                </div>
            </div>
            <div className="hero bg-base-200 mt-5">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">Place Your Bid</h1>
                    </div>
                    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleBid} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price (Your Bidding Amount)</span>
                                </label>
                                <input type="text" name="price" placeholder={`${minimum_price} - ${maximum_price}`} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Deadline</span>
                                </label>
                                <input type="date" name="deadline" defaultValue={`${deadline}`} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                {
                                    user &&
                                    <input type="email" name="email" readOnly defaultValue={user.email} placeholder="Email" className="input input-bordered" required />
                                    // :
                                    // <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                                }

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Employer Email</span>
                                </label>
                                <input type="email" name="ownerEmail" readOnly defaultValue={email} placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                {
                                    (user?.email === detailsJob?.email || deadlineDate < currentDate) ?
                                        <button disabled className='btn btn-primary' >Bid On the Project</button>
                                        :
                                        <button className='btn btn-primary' >Bid On the Project</button>
                                }

                            </div>
                            <ToastContainer />
                        </form>
                        {
                            deadlineDate < currentDate && <p className="text-xl text-orange-700 p-2">The job deadlin has been expired</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
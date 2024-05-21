import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";


const PostedJobs = () => {

    const { user } = useAuth();
    const navigate = useNavigate();
    const jobs = useLoaderData();

    const handleUpdateJob = (e) => {
        e.preventDefault();
        const form = e.target;
        const id = form.id.value;
        const email = form.email.value;
        const job_title = form.jobTitle.value;
        const deadline = form.deadline.value;
        const job_description = form.description.value;
        const category = form.category.value;
        const minimum_price = form.minPrice.value;
        const maximum_price = form.maxPrice.value;
        const jobUpdate = {
            id,
            email,
            job_title,
            deadline,
            job_description,
            category,
            minimum_price,
            maximum_price,
        }
        console.log(jobUpdate);

        fetch(`http://localhost:5000/jobs/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(jobUpdate),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    navigate('/postedJobs')
                    Swal.fire({
                        title: 'Success!',
                        text: 'Job information updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    toast.success("Your posted job updated successfully !", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
    }

    const handleJobDelete = id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure to delete this job?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/jobs/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your posted job has been deleted.",
                                icon: "success"
                            });
                            navigate('/postedJobs')
                        }
                    })
            }
        });

    }

    const myJobs = jobs.filter(job => job?.email === user?.email);

    console.log(myJobs);

    if (myJobs.length === 0) {
        return <div className="min-h-screen flex justify-center items-center">

            <title>KH | My Posted Jobs</title>

            <p className="text-4xl text-center text-error">You did not post any job yet</p>
        </div>
    }

    else {
        return (
            <div>
                <title>KH | My Posted Jobs</title>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-9">

                    {
                        myJobs.map(job => <div key={job._id} className="card bg-accent text-accent-content glass">
                            <div className="card-body">
                                <h2 className="card-title"><span className="font-bold">Job Title: </span> {job.job_title}</h2>
                                <p><span className="font-bold">Deadline: </span> {job.deadline} </p>
                                <p><span className="font-bold">Prece Range: </span> {job.minimum_price} - {job.maximum_price} $</p>
                                <p><span className="font-bold">Short Description: </span> {job.job_description} </p>
                                <div className="card-actions justify-end">
                                    {/* Update button */}
                                    <button className="btn btn-secondary" onClick={() => document.getElementById(job._id).showModal()}><div className="badge badge-outline">Update</div></button>
                                    {/* Modal for update job */}
                                    <dialog id={job._id} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            {/* Update form */}
                                            <div className="hero min-h-screen bg-base-200">
                                                <div className="hero-content flex-col">
                                                    <div className="text-center">
                                                        <h1 className="text-5xl font-bold">Update Job!</h1>
                                                    </div>
                                                    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                                                        <form onSubmit={handleUpdateJob} className="card-body">
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Job ID</span>
                                                                </label>
                                                                <input type="text" name="id" disabled readOnly value={job._id} className="input input-bordered" />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Email of the employer</span>
                                                                </label>
                                                                <input type="email" name="email" readOnly value={job.email} className="input input-bordered" />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Job title</span>
                                                                </label>
                                                                <input type="text" name="jobTitle" defaultValue={job.job_title} placeholder="Job title" className="input input-bordered" required />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Deadline</span>
                                                                </label>
                                                                <input type="date" name="deadline" defaultValue={job.deadline} placeholder="Deadline" className="input input-bordered" required />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Description</span>
                                                                </label>
                                                                <input type="text" name="description" defaultValue={job.job_description} placeholder="Description" className="input input-bordered" required />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Category</span>
                                                                </label>
                                                                <select name="category" className="select select-info w-full max-w-xs">
                                                                    <option disabled selected>{job.category}</option>
                                                                    <option>Web Development</option>
                                                                    <option>Digital Marketing</option>
                                                                    <option>Graphics Design</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Minimum Price</span>
                                                                </label>
                                                                <input type="text" name="minPrice" defaultValue={job.minimum_price} placeholder="Minimum Price" className="input input-bordered" />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Maximum Price</span>
                                                                </label>
                                                                <input type="text" name="maxPrice" defaultValue={job.maximum_price} placeholder="Maximum Price" className="input input-bordered" />
                                                            </div>
                                                            <div className="form-control mt-6">
                                                                <button className="btn btn-primary">Update Job</button>
                                                            </div>

                                                        </form>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </dialog>
                                    {/* delete button */}
                                    <button className="btn btn-error" onClick={() => handleJobDelete(job._id)}><div className="badge badge-outline">Delete</div></button>
                                </div>
                                <ToastContainer />
                            </div>
                        </div>)
                    }
                </div>
            </div>
        );
    }
};

export default PostedJobs;
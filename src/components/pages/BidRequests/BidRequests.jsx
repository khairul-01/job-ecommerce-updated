
import useAuth from '../../../hooks/useAuth';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const BidRequests = () => {
    const { user } = useAuth();
    const jobRequestsData = useLoaderData();
    console.log(jobRequestsData);
    const jobRequests = jobRequestsData.filter(bid => bid?.email !== user?.email);
    console.log(jobRequests.length)
    const navigate = useNavigate();

    const handleAccept = (id) => {
        const statusInfo = {
            status: 'accept'
        }

        console.log(id, statusInfo);

        Swal.fire({
            title: "Are you sure to Accept this job?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept it!"
        }).then((result) => {
            if (result.isConfirmed) {

                

                fetch(`http://localhost:5000/bidJobs/${id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(statusInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.modifiedCount > 0) {

                            Swal.fire({
                                title: 'Success!',
                                text: 'Status information updated successfully',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            })
                            navigate('/bidRequets')
                        }
                    })
            }
        })

    }

    const handleReject = (id) => {
        const statusInfo = {
            status: 'reject'
        }
        console.log(id, statusInfo);

        Swal.fire({
            title: "Are you sure to Reject this job?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bidJobs/${id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(statusInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.modifiedCount > 0) {

                            Swal.fire({
                                title: 'Success!',
                                text: 'Status information updated successfully',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            })
                            navigate('/bidRequets')
                        }
                    })
            }
        })
    }

    if (jobRequests.length === 0) {
        return <div className="min-h-screen flex justify-center items-center">

            <title>KH | Bid Requests</title>

            <p className="text-4xl text-center text-error">You do not have any bid request</p>
        </div>
    }

    return (
        <div>
            <div className="my-9">

                <title>KH | Bid Requests</title>

                <h1 className="text-4xl text-center mb-5">Bid Requests</h1>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Job Title</th>
                                <th>Email</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>

                            {/* rows */}

                            {
                                jobRequests.map((bid, ind) => <tr key={ind} className="hover">
                                    <th>{ind + 1}</th>
                                    <td>{bid.job_title}</td>
                                    <td>{bid.email}</td>
                                    <td>{bid.deadline}</td>
                                    {
                                        bid?.status ?
                                            bid.status === 'accept' ?
                                                <td>In Progress</td>
                                                :
                                                <td>Rejected</td>
                                            :
                                            <td>pending</td>
                                    }
                                    {
                                        (bid?.status === 'accept') ?
                                            <progress className="progress w-56"></progress>
                                            :
                                            bid?.status !== 'reject' &&
                                            <td className="flex gap-3">
                                                <button onClick={() => handleAccept(bid._id)} className="btn">Accept</button>
                                                <button onClick={() => handleReject(bid._id)} className="btn">Reject</button>
                                            </td>

                                    }
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BidRequests;
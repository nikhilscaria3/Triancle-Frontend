import React, { useEffect, useState } from "react";
import Navbar from "./GlobalComponents/NavbarComponent/navbarcomponent";
import { axiosInstance } from "../util/baseurl";
import SidebarMenu from "../layouts/sidebar";
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from "../layouts/dashboardwidget";
import Test from "./TestComponent";
import StatusBox from "./includes/statusbox";
import { Link } from "react-router-dom";



const Dashboard = () => {
    const [fetchFiledata, setFiledata] = useState([])
    const [favfileid, setfavfileid] = useState([])

    const [counts, setCounts] = useState({
        userCount: "0",
        projectCount: "0",
        fileCount: "0"
    });

    useEffect(() => {
        async function fetchCounts() {
            try {
                const response = await axiosInstance.get('/dashboard/countdocuments'); // Adjust the URL to match your backend API endpoint
                if (response) {
                    setCounts(response.data);
                }


            } catch (error) {
                console.error('Error fetching document counts:', error);
            }
        }

        fetchCounts();
    }, []);

    const fetchlastFiledata = async () => {
        try {
            const response = await axiosInstance.get(`/file/getfiles`);
            if (response) {
                setFiledata(response.data.files);
                setfavfileid(response.data.favfileid);
                console.log('File retrieved successfully:', response.data);
            } else {
                console.error('Failed to retrieve Files. Status code:', response.status);
            }
        } catch (error) {
            console.error('Error retrieving Files:', error.message);
        }
    }

    useEffect(() => {
        fetchlastFiledata();
    }, []);



    return (
        <div>
            <Navbar />
            <SidebarMenu />
            <div className="pc-container">
                <div className="pc-content">
                    <div className="row">
                        <div className="me-5 py-4">
                            <StatusBox count={counts} />
                        </div>
                        <div className="col-xl-12 col-md-6 d-flex gap-2 rounded">
                            <div className="card rounded-lg">
                                <div className="card-header">     
                                    <Link to='/file'>Recent Files</Link>
                                </div>
                                <div className="card-body px-0 py-3">
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <th></th>
                                                <th>Title</th>
                                                <th>Final Date</th>
                                                <th>Project</th>
                                                <th>Type</th>
                                                <th>Category</th>

                                            </thead>
                                            <tbody>
                                                {fetchFiledata && fetchFiledata.length > 0 ? (
                                                    fetchFiledata.slice(-5).map((data, index) => (
                                                        <tr className="unread" key={index}>
                                                            <td><i class="fa fa-file fa-2x"></i></td>
                                                            <td>
                                                                <h6 className="mb-1">{data.title}</h6>
                                                                <p className="m-0">{data.status}</p>
                                                            </td>
                                                            {/* Additional data */}
                                                            <td>{data.finalDate}</td>
                                                            <td>{data.Account.name}</td>
                                                            <td>{data.Account.type}</td>
                                                            <td>{data.category}</td>

                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7">No files available</td>
                                                    </tr>
                                                )}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card rounded-lg">
                                <div className="card-header">
                                <Link to='/favfile'>Favorite Files</Link>
                                </div>
                                <div className="card-body px-0 py-3">
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <th></th>
                                                <th>Title</th>
                                                <th>Final Date</th>
                                                <th>Project</th>
                                                <th>Type</th>
                                                <th>Category</th>

                                            </thead>
                                            <tbody>
                                                {fetchFiledata && fetchFiledata.length > 0 ? (
                                                    fetchFiledata
                                                        .filter(data => favfileid && favfileid.includes(data.id)) // Filter fetchFiledata based on favfileid
                                                        .slice(-5) // Slice the filtered array to get the last 5 elements
                                                        .map((data, index) => (
                                                            <tr className="unread" key={index}>
                                                                <td><i className="fa fa-file fa-2x"></i></td>
                                                                <td>
                                                                    <h6 className="mb-1">{data.title}</h6>
                                                                    <p className="m-0">{data.status}</p>
                                                                </td>
                                                                {/* Additional data */}
                                                                <td>{data.finalDate}</td>
                                                                <td>{data.Account.name}</td>
                                                                <td>{data.Account.type}</td>
                                                                <td>{data.category}</td>
                                                            </tr>
                                                        ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7">No files available</td>
                                                    </tr>
                                                )}

                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div >

    );
};

export default Dashboard;

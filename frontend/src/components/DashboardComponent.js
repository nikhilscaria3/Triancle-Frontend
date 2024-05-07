import React, { useEffect, useState } from "react";
import Navbar from "./GlobalComponents/NavbarComponent/navbarcomponent";
import Canvas from "./GlobalComponents/CanvasComponent/canvascomponent";
import { axiosInstance } from "../util/baseurl";
import { Link } from "react-router-dom";
import Footer from "./GlobalComponents/FooterComponent/FooterComponent";
import SidebarMenu from "../layouts/sidebar";
import Breadcrumb from "../layouts/breadcrumb";

const Dashboard = () => {
    const email = localStorage.getItem("userEmail")

    const [formData, setFormData] = useState({
        pendingrequest: "",
        approvedrequest: "",
        rejectedrequest: ""
    });

    const fetchrequestcount = async () => {
        try {
            const response = await axiosInstance.get("/api/requestcount", {
                params: {
                    email
                }
            });
            const { pendingCount, approvedCount, rejectedCount } = response.data;

            // Set the form data with the counts
            setFormData({
                pendingrequest: pendingCount,
                approvedrequest: approvedCount,
                rejectedrequest: rejectedCount
            });
        } catch (error) {
            console.error('Error fetching request count:', error);
        }
    }

    useEffect(() => {
        fetchrequestcount();
    }, []);



    return (
        <div>
            <Navbar/>
            <SidebarMenu />
            <div className="pc-container">
                <div className="pc-content">
                    <Breadcrumb breadcrumbItem={"Dashboard"} breadcrumbItemActive={"Home"} />
                    {/* <!-- [ Main Content ] start --> */}
                    <div className="row">
                        {/* <!-- [ daily sales section ] start --> */}
                        <div className="col-md-6 col-xl-4">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="mb-4">Daily Sales</h6>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-9">
                                            <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-success f-30 m-r-10"></i>$249.95</h3>
                                        </div>

                                        <div className="col-3 text-end">
                                            <p className="m-b-0">67%</p>
                                        </div>
                                    </div>
                                    <div className="progress m-t-30" style={{ height: "7px" }}>
                                        <div className="progress-bar bg-brand-color-1" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- [ daily sales section ] end -->

                    <!-- [ Monthly  sales section ] start --> */}
                        <div className="col-md-6 col-xl-4">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="mb-4">Monthly Sales</h6>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-9">
                                            <h3 className="f-w-300 d-flex align-items-center  m-b-0"><i className="feather icon-arrow-down text-danger f-30 m-r-10"></i>$2.942.32</h3>
                                        </div>
                                        <div className="col-3 text-end">
                                            <p className="m-b-0">36%</p>
                                        </div>
                                    </div>
                                    <div className="progress m-t-30" sstyle={{ height: "7px" }}>
                                        <div className="progress-bar bg-brand-color-2" role="progressbar" style={{ width: "35%" }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- [ Monthly  sales section ] end -->

                    <!-- [ year  sales section ] start --> */}
                        <div className="col-md-12 col-xl-4">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="mb-4">Yearly Sales</h6>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-9">
                                            <h3 className="f-w-300 d-flex align-items-center  m-b-0"><i className="feather icon-arrow-up text-success f-30 m-r-10"></i>$8.638.32</h3>
                                        </div>
                                        <div className="col-3 text-end">
                                            <p className="m-b-0">80%</p>
                                        </div>
                                    </div>
                                    <div className="progress m-t-30" style={{ height: "7px" }}>
                                        <div className="progress-bar bg-brand-color-1" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- [ year  sales section ] end -->

                    <!-- [ worldLow section ] start --> */}
                        <div className="col-xl-8 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Users From United States</h5>
                                </div>
                                <div className="card-body">
                                    <div id="world-low" style={{ height: "450px" }}></div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- [ worldLow section ] end -->

                    <!-- [ statistics year chart ] start --> */}
                        <div className="col-xl-4 col-md-6">
                            <div className="card bg-primary">
                                <div className="card-header border-0">
                                    <h5 className="text-white">Earnings</h5>
                                </div>
                                <div className="card-body" style={{ padding: "0 25px" }}>
                                    <div className="earning-text mb-0">
                                        <h3 className="mb-2 text-white f-w-300">$4295.36 <i className="feather icon-arrow-up teal accent-3"></i></h3>
                                        <span className="text-uppercase text-white d-block">Total Earnings</span>
                                    </div>
                                    <div id="Widget-line-chart" className="WidgetlineChart2 ChartShadow" style={{ height: "180" }}></div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body border-bottom">
                                    <div className="row d-flex align-items-center">
                                        <div className="col-auto">
                                            <i className="feather icon-zap f-30 text-success"></i>
                                        </div>
                                        <div className="col">
                                            <h3 className="f-w-300">235</h3>
                                            <span className="d-block text-uppercase">TOTAL IDEAS</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row d-flex align-items-center">
                                        <div className="col-auto">
                                            <i className="feather icon-map-pin f-30 text-primary"></i>
                                        </div>
                                        <div className="col">
                                            <h3 className="f-w-300">26</h3>
                                            <span className="d-block text-uppercase">TOTAL LOCATIONS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- [ statistics year chart ] end -->

                    <!-- [social-media section] start --> */}
                        <div className="col-md-12 col-xl-4">
                            <div className="card card-social">
                                <div className="card-body border-bottom">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="fab fa-facebook-f text-primary f-36"></i>
                                        </div>
                                        <div className="col text-end">
                                            <h3>12,281</h3>
                                            <h5 className="text-success mb-0">+7.2% <span className="text-muted">Total Likes</span></h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center justify-content-center card-active">
                                        <div className="col-6">
                                            <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>35,098</h6>
                                            <div className="progress">
                                                <div className="progress-bar bg-brand-color-1" role="progressbar" style={{ width: "60%", height: "6px" }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>3,539</h6>
                                            <div className="progress">
                                                <div className="progress-bar bg-brand-color-2" role="progressbar" style={{ width: "45%", height: "6px" }} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-4">
                            <div className="card card-social">
                                <div className="card-body border-bottom">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="fab fa-twitter text-primary f-36"></i>
                                        </div>
                                        <div className="col text-end">
                                            <h3>11,200</h3>
                                            <h5 className="text-info mb-0">+6.2% <span className="text-muted">Total Likes</span></h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center justify-content-center card-active">
                                        <div className="col-6">
                                            <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>34,185</h6>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: "40%", height: "6px" }} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>4,567</h6>
                                            <div className="progress">
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "70%", height: "6px" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-4">
                            <div className="card card-social">
                                <div className="card-body border-bottom">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="fab fa-google-plus-g text-danger f-36"></i>
                                        </div>
                                        <div className="col text-end">
                                            <h3>10,500</h3>
                                            <h5 className="text-primary mb-0">+5.9% <span className="text-muted">Total Likes</span></h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center justify-content-center card-active">
                                        <div className="col-6">
                                            <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>25,998</h6>
                                            <div className="progress">
                                                <div className="progress-bar bg-brand-color-1" role="progressbar" style={{ width: "80%", height: "6px" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>7,753</h6>
                                            <div className="progress">
                                                <div className="progress-bar bg-brand-color-2" role="progressbar" style={{ width: "50%", height: "6px" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- [social-media section] end -->

                    <!-- [ rating list ] starts--> */}
                        <div className="col-xl-4 col-md-6">
                            <div className="card user-list">
                                <div className="card-header">
                                    <h5>Rating</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center justify-content-center m-b-20">
                                        <div className="col-6">
                                            <h2 className="f-w-300 d-flex align-items-center float-start m-0">4.7 <i className="fas fa-star f-10 m-l-10 text-warning"></i></h2>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="d-flex  align-items-center float-end m-0">0.4 <i className="fas fa-caret-up text-success f-22 m-l-10"></i></h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <h6 className="align-items-center float-start"><i className="fas fa-star f-10 m-r-10 text-warning"></i>5</h6>
                                            <h6 className="align-items-center float-end">384</h6>
                                            <div className="progress m-t-30 m-b-20" style={{ height: "6px" }}>
                                                <div className="progress-bar bg-brand-color-1" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-8 col-md-6">
                            <div className="card Recent-Users">
                                <div className="card-header">
                                    <h5>Recent Users</h5>
                                </div>
                                <div className="card-body px-0 py-3">
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <tbody>
                                                <tr className="unread">
                                                    <td><img className="rounded-circle" style={{ width: "40px" }} src="../assets/images/user/avatar-1.jpg" alt="activity-user" /></td>
                                                    <td>
                                                        <h6 className="mb-1">Isabella Christensen</h6>
                                                        <p className="m-0">Lorem Ipsum is simply dummy</p>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-muted"><i className="fas fa-circle text-success f-10 m-r-15"></i>11 MAY 12:56</h6>
                                                    </td>
                                                    <td><a href="#!" className="badge me-2 bg-brand-color-2 text-white f-12">Reject</a><a href="#!" className="badge me-2 bg-brand-color-1 text-white f-12">Approve</a></td>
                                                </tr>
                                                <tr className="unread">
                                                    <td><img className="rounded-circle" style={{ width: "40px" }} src="../assets/images/user/avatar-2.jpg" alt="activity-user" /></td>
                                                    <td>
                                                        <h6 className="mb-1">Mathilde Andersen</h6>
                                                        <p className="m-0">Lorem Ipsum is simply</p>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-muted"><i className="fas fa-circle text-danger f-10 m-r-15"></i>11 MAY 10:35</h6>
                                                    </td>
                                                    <td><a href="#!" className="badge me-2 bg-brand-color-2 text-white f-12">Reject</a><a href="#!" className="badge me-2 bg-brand-color-1 text-white f-12">Approve</a></td>
                                                </tr>
                                                <tr className="unread">
                                                    <td><img className="rounded-circle" style={{ width: "40px" }} src="../assets/images/user/avatar-3.jpg" alt="activity-user" /></td>
                                                    <td>
                                                        <h6 className="mb-1">Karla Sorensen</h6>
                                                        <p className="m-0">Lorem Ipsum is simply dummy</p>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-muted"><i className="fas fa-circle text-success f-10 m-r-15"></i>9 MAY 17:38</h6>
                                                    </td>
                                                    <td><a href="#!" className="badge me-2 bg-brand-color-2 text-white f-12">Reject</a><a href="#!" className="badge me-2 bg-brand-color-1 text-white f-12">Approve</a></td>
                                                </tr>
                                                <tr className="unread">
                                                    <td><img className="rounded-circle" style={{ width: "40px" }} src="../assets/images/user/avatar-1.jpg" alt="activity-user" /></td>
                                                    <td>
                                                        <h6 className="mb-1">Ida Jorgensen</h6>
                                                        <p className="m-0">Lorem Ipsum is simply</p>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-muted f-w-300"><i className="fas fa-circle text-danger f-10 m-r-15"></i>19 MAY 12:56</h6>
                                                    </td>
                                                    <td><a href="#!" className="badge me-2 bg-brand-color-2 text-white f-12">Reject</a><a href="#!" className="badge me-2 bg-brand-color-1 text-white f-12">Approve</a></td>
                                                </tr>
                                                <tr className="unread">
                                                    <td><img className="rounded-circle" style={{ width: "40px" }} src="../assets/images/user/avatar-2.jpg" alt="activity-user" /></td>
                                                    <td>
                                                        <h6 className="mb-1">Albert Andersen</h6>
                                                        <p className="m-0">Lorem Ipsum is</p>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-muted"><i className="fas fa-circle text-success f-10 m-r-15"></i>21 July 12:56</h6>
                                                    </td>
                                                    <td><a href="#!" className="badge me-2 bg-brand-color-2 text-white f-12">Reject</a><a href="#!" className="badge me-2 bg-brand-color-1 text-white f-12">Approve</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
};

export default Dashboard;

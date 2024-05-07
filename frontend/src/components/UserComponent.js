import React, { useEffect, useState } from "react";
import Navbar from "./GlobalComponents/NavbarComponent/navbarcomponent";
import { axiosInstance } from "../util/baseurl";
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SidebarMenu from "../layouts/sidebar";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '../util/socket'; // Import the socket instance
import UserBoxes from "./includes/userbox";
import CreateBtn from "./includes/CreateBtn";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const User = () => {
    const [userdata, setuserdata] = useState([]);
    const [isedit, setisedit] = useState(false);
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState(null)
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        roletype: '',
        status: ''
    });
    const [storedID, setStoredID] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [counts, setCounts] = useState(null);
    const [Filter, setFilter] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    useEffect(() => {
        fetchuserdata();
    }, [Filter, page, searchQuery]);


    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        fetchuserdata()
    };

    const handleResetFilter = () => {
        setFilter('');
    };


    const fetchuserdata = async () => {
        try {
            const response = await axiosInstance.get(`/user/getuser?page=${page}&limit=5`, {
                params: {
                    searchQuery,
                    Filter
                }
            });
            if (response) {
                setCounts(response.data.userCounts)
                setuserdata(response.data.users);
                setTotalPages(response.data.totalPages);
                console.log('User retrieved successfully:', response.data);
            } else {
                console.error('Failed to retrieve users. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Extract only the required fields
            const { name, email, phoneNumber, password, roletype, status } = formData;
            const userData = { name, email, phoneNumber, password, roletype, status };
            const token = localStorage.getItem("accesstoken")
            const response = await axiosInstance.post('/user/createuser', userData);
            // Check if the request was successful
            if (response) {
                fetchuserdata();
                // Handle success scenario here, if needed
                notifySuccess(response.data.message);
                const message = response.data.message;
                socket.emit('message', message, token);
                handleClose()
            } else {
                // Handle other status codes, if needed
                console.error('Failed to create user. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while creating user');
            }
        }
    };


    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id, name, email, phoneNumber, password, roletype, status } = formData;
            const userData = { id, name, email, phoneNumber, password, roletype, status };

            console.log("formData", userData);
            const response = await axiosInstance.put('/user/updateuser', userData);
            // Check if the request was successful
            if (response) {
                fetchuserdata();
                notifySuccess(response.data.message);
                handleClose()
            } else {
                // Handle other status codes, if needed
                console.error('Failed to update user. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while updating user');
            }
        }
    };


    const handleOpen = () => {
        setisedit(false);
        handleEditOpen();
        setFormData({
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            roletype: '',
            status: '',

        });
    }

    const handleEditOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleEdit = (user) => {
        setisedit(true);
        // Assuming user.Role.id contains the id of the associated Role
        setFormData({ ...user, roletype: user.Role.roletype });
        handleEditOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePrevClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextClick = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };



    // Function to handle opening the delete modal
    const handleDeleteOpen = (userid) => {
        setStoredID(userid)
        setDeleteOpen(true);
    };

    // Function to handle closing the delete modal
    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete('/user/deleteuser', {
                params: {
                    storedID
                }
            });
            // Check if the request was successful
            if (response) {
                fetchuserdata();
                notifySuccess(response.data.message);
                handleDeleteClose();
            } else {
                // Handle other status codes, if needed
                console.error('Failed to delete user. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while deleting user');
            }
        }
    }


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleNotiChange = () => {
        const message = "user created"; // Assuming response.data.message contains the new user message
        const token = localStorage.getItem("accesstoken")
        socket.emit('message', message, token);

    }


    return (
        <div>
            <Navbar />
            <SidebarMenu />
            <ToastContainer />
            <div className="pc-container">
                <div className="pc-content">
                    <div className="row">
                        <UserBoxes count={counts} />

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Button onClick={handleOpen}>
                                <CreateBtn text={"Create New User"} />
                            </Button>
                            
                            <div>
                                <div className="d-flex align-items-center justify-content-between w-100 mx-3 p-4">
                                    <div className="d-flex align-items-center gap-2"> {/* Adjust alignment */}
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Search Name or email."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton onClick={fetchuserdata} size="large">
                                                        <SearchIcon />
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                        <Select
                                            value={Filter}
                                            onChange={handleFilterChange}
                                            displayEmpty
                                            variant="outlined"
                                            fullWidth
                                            placeholder="Role"
                                        >
                                            <MenuItem value="">All Roles</MenuItem>
                                            <MenuItem value="Admin">Admin</MenuItem>
                                            <MenuItem value="User">User</MenuItem>
                                        </Select>
                                        <p style={{ color: "Red" }} onClick={handleResetFilter}>Reset</p>
                                    </div>

                                </div>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            {isedit ? 'Edit User' : 'Add User'}
                                        </Typography>
                                        <form onSubmit={isedit ? handleUpdateSubmit : handleSubmit}>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="User Name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required // Add required attribute
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required // Add required attribute
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Phone Number"
                                                        name="phoneNumber"
                                                        type="tel"
                                                        value={formData.phoneNumber}
                                                        onChange={handleChange}
                                                        required // Add required attribute
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Password"
                                                        name="password"
                                                        type="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required // Add required attribute
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Role</InputLabel>
                                                        <Select
                                                            label="Role"
                                                            name="roletype"
                                                            value={formData.roletype}
                                                            onChange={handleChange}
                                                            required // Add required attribute
                                                        >
                                                            <MenuItem value="User">User</MenuItem>
                                                            <MenuItem value="Admin">Admin</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Status</InputLabel>
                                                        <Select
                                                            label="Status"
                                                            name="status"
                                                            value={formData.status}
                                                            onChange={handleChange}
                                                            required // Add required attribute
                                                        >
                                                            <MenuItem value="true">Active</MenuItem>
                                                            <MenuItem value="false">Inactive</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button variant="contained" color="primary" type="submit">
                                                        {isedit ? 'Update' : 'Submit'}
                                                    </Button>
                                                </Grid>
                                            </Grid>

                                        </form>
                                    </Box>
                                </Modal>
                            </div>
                        </Stack>

                        {/* UserTable */}

                        <TableContainer sx={{ overflow: 'unset', minHeight: 400 }}>

                            <Table sx={{ minWidth: 600 }}>
                                <TableHead >
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700 }}>Sl no.</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Phone Number</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userdata && userdata.length > 0 ? (
                                        userdata.map((user, index) => (
                                            <TableRow key={user.id}>
                                                <TableCell>{(page - 1) * 5 + index + 1}</TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.phoneNumber}</TableCell>
                                                <TableCell>{user.Role.roletype}</TableCell>
                                                <TableCell style={{ color: user.status ? 'blue' : 'red' }}>
                                                    {user.status ? 'Active' : 'Inactive'}
                                                </TableCell>

                                                <TableCell>
                                                    <div style={{ display: 'flex', gap: '20px' }}>
                                                        <Button variant="contained" color="primary" onClick={() => handleEdit(user)}>
                                                            <i class="fa fa-pencil fa-2x"></i>
                                                        </Button>
                                                        <Button variant="contained" color="error" onClick={() => handleDeleteOpen(user.id)}>
                                                            <i class="fa fa-trash fa-2x"></i>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7}>
                                                <Typography variant="subtitle1" align="center" color="textSecondary">
                                                    No users available
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>

                            </Table>

                        </TableContainer>

                        {/* //Delete Modal */}

                        <Modal
                            open={deleteOpen}
                            onClose={handleDeleteClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Delete
                                </Typography>
                                <Typography id="modal-modal-description" variant="body1" component="p">
                                    Are you sure you want to delete this user?
                                </Typography>
                                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                    <Button variant="contained" color="primary" onClick={handleDeleteClose}>
                                        Close
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(storedID)}>
                                        Delete
                                    </Button>
                                </div>
                            </Box>
                        </Modal>

                        {/* Pagination */}

                        <Stack direction="row" alignItems="center" justifyContent="center" mt={5}>
                            <Button onClick={handlePrevClick} disabled={page === 1}>Prev</Button>
                            <Typography variant="body1">{`Page ${page} of ${totalPages}`}</Typography>
                            <Button onClick={handleNextClick} disabled={page === totalPages}>Next</Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;

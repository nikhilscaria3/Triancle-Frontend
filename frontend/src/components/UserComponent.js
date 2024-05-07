import React, { useEffect, useState } from "react";
import Navbar from "./GlobalComponents/NavbarComponent/navbarcomponent";
import { axiosInstance } from "../util/baseurl";
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
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
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        status: '',
        projectId: '',
    });
    const [storedID, setStoredID] = useState(null)
    const [totalPages, setTotalPages] = useState(0);

    const fetchuserdata = async () => {
        try {
            const response = await axiosInstance.get(`/user/getuser?page=${page}&limit=5`);
            if (response) {
                setuserdata(response.data.users);
                setTotalPages(response.data.totalPages);
                console.log('User retrieved successfully:', response.data);
            } else {
                console.error('Failed to retrieve users. Status code:', response.status);
            }
        } catch (error) {
            console.error('Error retrieving users:', error.message);
        }
    }

    useEffect(() => {
        fetchuserdata();
    }, [page]);

    const handleOpen = () => {
        setisedit(false);
        handleEditOpen();
        setFormData({
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            role: '',
            status: '',
            projectId: '',
        });
    }

    const handleEditOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleEdit = (userData) => {
        setisedit(true);
        setFormData(userData);
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

    const handleDelete = async (userid) => {
        try {
            const response = await axiosInstance.post('/api/v1/user/deleteuser', userid);
            // Check if the request was successful
            if (response) {
                fetchuserdata();
                // Handle success scenario here, if needed
                console.log('User Deleted successfully:', response.data);
            } else {
                // Handle other status codes, if needed
                console.error('Failed to delete user. Status code:', response.status);
            }
        } catch (error) {
            // Handle network errors or other issues
            console.error('Error delete user:', error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/v1/user/createuser', formData);
            // Check if the request was successful
            if (response) {
                fetchuserdata();
                // Handle success scenario here, if needed
                console.log('User created successfully:', response.data);
            } else {
                // Handle other status codes, if needed
                console.error('Failed to create user. Status code:', response.status);
            }
        } catch (error) {
            // Handle network errors or other issues
            console.error('Error creating user:', error.message);
        }
    };


    return (
        <div>
            <Navbar />
            <SidebarMenu />
            <div className="pc-container">
                <div className="pc-content">
                    <div className="row">


                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                            <Typography variant="h4">Users</Typography>
                            <div>
                                <Button onClick={handleOpen}>New User</Button>
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
                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="User Name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
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
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Role</InputLabel>
                                                        <Select
                                                            label="Role"
                                                            name="role"
                                                            value={formData.role}
                                                            onChange={handleChange}
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
                                                        >
                                                            <MenuItem value="true">Active</MenuItem>
                                                            <MenuItem value="false">Inactive</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Project ID"
                                                        name="projectId"
                                                        value={formData.projectId}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button variant="contained" color="primary" type="submit">
                                                        {formData.id ? 'Update' : 'Submit'}
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
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sl no.</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone Number</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userdata.map((user, index) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{(page - 1) * 5 + index + 1}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phoneNumber}</TableCell>
                                            <TableCell>{user.Role.roletype}</TableCell>
                                            <TableCell>{user.status ? "Active" : "Inactive"}</TableCell>
                                            <TableCell>
                                                <div style={{ display: 'flex', gap: '20px' }}>
                                                    <Button variant="contained" color="primary" onClick={() => handleEdit(user)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="contained" color="error" onClick={() => handleDeleteOpen(user.id)}>
                                                        Delete
                                                    </Button>

                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
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

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

const CategoryComponent = () => {
    const [Categorydata, setCategorydata] = useState([]);
    const [isedit, setisedit] = useState(false);
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState(null)
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        category: '',
        description: '',
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
        fetchCategorydata();
    }, [Filter, page, searchQuery]);


    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        fetchCategorydata()
    };

    const handleResetFilter = () => {
        setFilter('');
    };


    const fetchCategorydata = async () => {
        try {
            const response = await axiosInstance.get(`/category/getcategory?page=${page}&limit=5`, {
                params: {
                    searchQuery,
                    Filter
                }
            });
            if (response) {
                setCounts(response.data.CategoryCounts)
                setCategorydata(response.data.categories);
                setTotalPages(response.data.totalPages);
                console.log('Category retrieved successfully:', response.data);
            } else {
                console.error('Failed to retrieve Categorys. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Extract only the required fields
            const { category, description, status } = formData;
            const CategoryData = { category, description, status };
            const token = localStorage.getItem("accesstoken")
            const response = await axiosInstance.post('/category/createcategory', CategoryData);
            // Check if the request was successful
            if (response) {
                fetchCategorydata();
                // Handle success scenario here, if needed
                notifySuccess(response.data.message);
                const message = response.data.message;
                socket.emit('message', message, token);
                handleClose()
            } else {
                // Handle other status codes, if needed
                console.error('Failed to create Category. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while creating Category');
            }
        }
    };


    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id, category, description, status } = formData;
            const CategoryData = { id, category, description, status };

            console.log("formData", CategoryData);
            const response = await axiosInstance.put('/Category/updateCategory', CategoryData);
            // Check if the request was successful
            if (response) {
                fetchCategorydata();
                notifySuccess(response.data.message);
                handleClose()
            } else {
                // Handle other status codes, if needed
                console.error('Failed to update Category. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while updating Category');
            }
        }
    };


    const handleOpen = () => {
        setisedit(false);
        handleEditOpen();
        setFormData({
            categoryId: "",
            subcategory: "",
            description: "",
            status: '',

        });
    }

    const handleEditOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleEdit = (Category) => {
        setisedit(true);
        // Assuming Category.Role.id contains the id of the associated Role
        setFormData(Category);
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
    const handleDeleteOpen = (Categoryid) => {
        setStoredID(Categoryid)
        setDeleteOpen(true);
    };

    // Function to handle closing the delete modal
    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete('/category/deletecategory', {
                params: {
                    storedID
                }
            });
            // Check if the request was successful
            if (response) {
                fetchCategorydata();
                notifySuccess(response.data.message);
                handleDeleteClose();
            } else {
                // Handle other status codes, if needed
                console.error('Failed to delete Category. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while deleting Category');
            }
        }
    }


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    return (
        <div>
            <Navbar />
            <SidebarMenu />
            <ToastContainer />
            <div className="pc-container">
                <div className="pc-content">
                    <div className="row">

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Button onClick={handleOpen}>
                                <CreateBtn text={"New Category"} />
                            </Button>

                            <div>
                                <div className="d-flex align-items-center justify-content-between w-100 mx-3 p-4">
                                    <div className="d-flex align-items-center gap-2"> {/* Adjust alignment */}
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Search Category ..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton onClick={fetchCategorydata} size="large">
                                                        <SearchIcon />
                                                    </IconButton>
                                                ),
                                            }}
                                        />
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
                                            {isedit ? 'Edit Category' : 'Add Category'}
                                        </Typography>
                                        <form onSubmit={isedit ? handleUpdateSubmit : handleSubmit}>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Category Name"
                                                        name="category"
                                                        value={formData.category}
                                                        onChange={handleChange}
                                                        required // Add required attribute
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Description"
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleChange}
                                                        required
                                                    />
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

                        {/* CategoryTable */}

                        <TableContainer sx={{ overflow: 'unset', minHeight: 400 }}>

                            <Table sx={{ minWidth: 600 }}>
                                <TableHead >
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700 }}>Sl no.</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Categorydata && Categorydata.length > 0 ? (
                                        Categorydata.map((Category, index) => (
                                            <TableRow key={Category.id}>
                                                <TableCell>{(page - 1) * 5 + index + 1}</TableCell>
                                                <TableCell>{Category.category}</TableCell>
                                                <TableCell>{Category.description}</TableCell>
                                                <TableCell style={{ color: Category.status ? 'blue' : 'red' }}>
                                                    {Category.status ? 'Active' : 'Inactive'}
                                                </TableCell>

                                                <TableCell>
                                                    <div style={{ display: 'flex', gap: '20px' }}>
                                                        <Button variant="contained" color="primary" onClick={() => handleEdit(Category)}>
                                                            <i class="fa fa-pencil fa-2x"></i>
                                                        </Button>
                                                        <Button variant="contained" color="error" onClick={() => handleDeleteOpen(Category.id)}>
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
                                                    No Categorys available
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
                                    Are you sure you want to delete this Category?
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

export default CategoryComponent;

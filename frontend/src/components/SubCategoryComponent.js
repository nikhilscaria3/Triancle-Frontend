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

const SubCategoryComponent = () => {
    const [SubCategorydata, setSubCategorydata] = useState([]);
    const [Categorydata, setCategorydata] = useState([]);
    const [isedit, setisedit] = useState(false);
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState(null)
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        categoryId: "",
        subcategory: '',
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
        fetchSubCategorydata();
        fetchCategorydata()
    }, [Filter, page, searchQuery]);


    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        fetchSubCategorydata()
    };

    const handleResetFilter = () => {
        setFilter('');
    };

    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value;
        setFormData({ ...formData, categoryId: selectedCategoryId });
    };


    const fetchSubCategorydata = async () => {
        try {
            const response = await axiosInstance.get(`/category/getsubcategory?page=${page}&limit=5`, {
                params: {
                    searchQuery,
                    Filter
                }
            });
            if (response) {
                setCounts(response.data.SubCategoryCounts)
                setSubCategorydata(response.data.subcategories);
                setTotalPages(response.data.totalPages);
                console.log('SubCategory retrieved successfully:', response.data);
            } else {
                console.error('Failed to retrieve SubCategorys. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    const fetchCategorydata = async () => {
        try {
            const response = await axiosInstance.get(`/category/getcategory?page=${page}&limit=5`, {
                params: {
                    searchQuery,
                    Filter
                }
            });
            if (response) {
                setCounts(response.data.SubCategoryCounts)
                setCategorydata(response.data.categories);
                setTotalPages(response.data.totalPages);
                console.log('SubCategory retrieved successfully:', response.data);
            } else {
                console.error('Failed to retrieve SubCategorys. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Extract only the required fields
            const { categoryId, subcategory, description, status } = formData;
            const SubCategoryData = { categoryId, subcategory, description, status };
            const token = localStorage.getItem("accesstoken")
            const response = await axiosInstance.post('/category/createsubcategory', SubCategoryData);
            // Check if the request was successful
            if (response) {
                fetchSubCategorydata();
                // Handle success scenario here, if needed
                notifySuccess(response.data.message);
                const message = response.data.message;
                socket.emit('message', message, token);
                handleClose()
            } else {
                // Handle other status codes, if needed
                console.error('Failed to create SubCategory. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while creating SubCategory');
            }
        }
    };


    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id, categoryId, subcategory, description, status } = formData;
            const SubCategoryData = { id, categoryId, subcategory, description, status };

            console.log("formData", SubCategoryData);
            const response = await axiosInstance.put('/category/updatesubcategory', SubCategoryData);
            // Check if the request was successful
            if (response) {
                fetchSubCategorydata();
                notifySuccess(response.data.message);
                handleClose()
            } else {
                // Handle other status codes, if needed
                console.error('Failed to update SubCategory. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while updating SubCategory');
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

    const handleEdit = (SubCategory) => {
        setisedit(true);
        // Assuming SubCategory.Role.id contains the id of the associated Role
        setFormData({
            ...formData, // Spread the existing formData
            ...SubCategory, // Spread the properties of the File object
            categoryId: SubCategory.categoryid
        });
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
    const handleDeleteOpen = (SubCategoryid) => {
        setStoredID(SubCategoryid)
        setDeleteOpen(true);
    };

    // Function to handle closing the delete modal
    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete('/SubCategory/deleteSubCategory', {
                params: {
                    storedID
                }
            });
            // Check if the request was successful
            if (response) {
                fetchSubCategorydata();
                notifySuccess(response.data.message);
                handleDeleteClose();
            } else {
                // Handle other status codes, if needed
                console.error('Failed to delete SubCategory. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while deleting SubCategory');
            }
        }
    }


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleNotiChange = () => {
        const message = "SubCategory created"; // Assuming response.data.message contains the new SubCategory message
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

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Button onClick={handleOpen}>
                                <CreateBtn text={"New SubCategory"} />
                            </Button>
                            <div>
                                <div className="d-flex align-items-center justify-content-between w-100 mx-3 p-4">
                                    <div className="d-flex align-items-center gap-2"> {/* Adjust alignment */}
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Search Sub Category."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton onClick={fetchSubCategorydata} size="large">
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
                                            {isedit ? 'Edit SubCategory' : 'Add SubCategory'}
                                        </Typography>
                                        <form onSubmit={isedit ? handleUpdateSubmit : handleSubmit}>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Category</InputLabel>
                                                        <Select
                                                            label="Category ID"
                                                            name="categoryId"
                                                            value={formData.categoryId}
                                                            onChange={handleCategoryChange}
                                                            required
                                                        >
                                                            {Categorydata && Categorydata.length > 0 ? (
                                                                Categorydata.map((category) => (
                                                                    <MenuItem key={category.id} value={category.id}>
                                                                        {category.category}
                                                                    </MenuItem>
                                                                ))
                                                            ) : (
                                                                <MenuItem disabled>No Category available</MenuItem>
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="SubCategory Name"
                                                        name="subcategory"
                                                        value={formData.subcategory}
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

                        {/* SubCategoryTable */}

                        <TableContainer sx={{ overflow: 'unset', minHeight: 400 }}>

                            <Table sx={{ minWidth: 600 }}>
                                <TableHead >
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700 }}>Sl no.</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>SubCategory</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {SubCategorydata && SubCategorydata.length > 0 ? (
                                        SubCategorydata.map((SubCategory, index) => (
                                            <TableRow key={SubCategory.id}>
                                                <TableCell>{(page - 1) * 5 + index + 1}</TableCell>
                                                <TableCell>
                                                    {SubCategory.Category.category}
                                                </TableCell>
                                                <TableCell>{SubCategory.subcategory}</TableCell>
                                                <TableCell>{SubCategory.description}</TableCell>
                                                <TableCell style={{ color: SubCategory.status ? 'blue' : 'red' }}>
                                                    {SubCategory.status ? 'Active' : 'Inactive'}
                                                </TableCell>
                                                <TableCell>
                                                    <div style={{ display: 'flex', gap: '20px' }}>
                                                        <Button variant="contained" color="primary" onClick={() => handleEdit(SubCategory)}>
                                                            <i className="fa fa-pencil fa-2x"></i>
                                                        </Button>
                                                        <Button variant="contained" color="error" onClick={() => handleDeleteOpen(SubCategory.id)}>
                                                            <i className="fa fa-trash fa-2x"></i>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7}>
                                                <Typography variant="subtitle1" align="center" color="textSecondary">
                                                    No SubCategories available
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
                                    Are you sure you want to delete this SubCategory?
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

export default SubCategoryComponent;

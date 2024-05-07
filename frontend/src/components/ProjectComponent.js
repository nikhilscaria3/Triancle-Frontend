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

const Project = () => {
    const [Projectdata, setProjectdata] = useState([]);
    const [isedit, setisedit] = useState(false);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        manager: '',
        status: '',
        location: '',
        type: "",
        tags: ""
    });
    const [storedID, setStoredID] = useState(null)
    const [totalPages, setTotalPages] = useState(0);

    const fetchProjectdata = async () => {
        try {
            const response = await axiosInstance.get(`/account/getaccounts`);
            if (response) {
                setProjectdata(response.data.accounts);
                setTotalPages(response.data.totalPages);
                console.log('Project retrieved successfully:', response.data);
            } else {
                console.error('Failed to retrieve Projects. Status code:', response.status);
            }
        } catch (error) {
            console.error('Error retrieving Projects:', error.message);
        }
    }

    useEffect(() => {
        fetchProjectdata();
    }, [page]);

    const handleOpen = () => {
        setisedit(false);
        handleEditOpen();
        setFormData({
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            manager: '',
            status: '',
            location: '',
            type: "",
            tags: ""
        });
    }

    const handleEditOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleEdit = (ProjectData) => {
        setisedit(true);
        setFormData(ProjectData);
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
    const handleDeleteOpen = (Projectid) => {
        setStoredID(Projectid)
        setDeleteOpen(true);
    };

    // Function to handle closing the delete modal
    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleDelete = async (Projectid) => {
        try {
            const response = await axiosInstance.post('/api/v1/Project/deleteProject', Projectid);
            // Check if the request was successful
            if (response) {
                fetchProjectdata();
                // Handle success scenario here, if needed
                console.log('Project Deleted successfully:', response.data);
            } else {
                // Handle other status codes, if needed
                console.error('Failed to delete Project. Status code:', response.status);
            }
        } catch (error) {
            // Handle network errors or other issues
            console.error('Error delete Project:', error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/v1/Project/createProject', formData);
            // Check if the request was successful
            if (response) {
                fetchProjectdata();
                // Handle success scenario here, if needed
                console.log('Project created successfully:', response.data);
            } else {
                // Handle other status codes, if needed
                console.error('Failed to create Project. Status code:', response.status);
            }
        } catch (error) {
            // Handle network errors or other issues
            console.error('Error creating Project:', error.message);
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
                            <Typography variant="h4">Projects</Typography>
                            <div>
                                <Button onClick={handleOpen}>New Project</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            {isedit ? 'Edit Project' : 'Add Project'}
                                        </Typography>
                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Project Name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Description"
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Start Date"
                                                        name="startDate"
                                                        type="date"
                                                        value={formData.startDate}
                                                        onChange={handleChange}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="End Date"
                                                        name="endDate"
                                                        type="date"
                                                        value={formData.endDate}
                                                        onChange={handleChange}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Manager"
                                                        name="manager"
                                                        value={formData.manager}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Location"
                                                        name="location"
                                                        value={formData.location}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Type"
                                                        name="type"
                                                        value={formData.type}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Tags"
                                                        name="tags"
                                                        value={formData.tags}
                                                        onChange={handleChange}
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
                                                        {isedit ? 'Update' : 'Submit'}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>

                                    </Box>
                                </Modal>
                            </div>
                        </Stack>

                        {/* ProjectTable */}

                        <TableContainer sx={{ overflow: 'unset', minHeight: 400 }}>
                            <Table sx={{ minWidth: 600 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sl no.</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>End Date</TableCell>
                                        <TableCell>Manager</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Tags</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell> {/* Add this column for action buttons */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Projectdata ? (
                                        Projectdata.map((Project, index) => (
                                            <TableRow key={Project.id}>
                                                <TableCell>{(page - 1) * 5 + index + 1}</TableCell>
                                                <TableCell>{Project.name}</TableCell>
                                                <TableCell>{Project.startDate}</TableCell>
                                                <TableCell>{Project.endDate}</TableCell>
                                                <TableCell>{Project.manager}</TableCell>
                                                <TableCell>{Project.location}</TableCell>
                                                <TableCell>{Project.type}</TableCell>
                                                <TableCell>{Project.tags}</TableCell>
                                                <TableCell>{Project.status}</TableCell>
                                                <TableCell>
                                                    <div style={{ display: 'flex', gap: '20px' }}>
                                                        <Button variant="contained" color="primary" onClick={() => handleEdit(Project)}>
                                                            Edit
                                                        </Button>
                                                        <Button variant="contained" color="error" onClick={() => handleDeleteOpen(Project.id)}>
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={11}>No projects found</TableCell> {/* Adjust colspan to match the number of columns */}
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
                                    Are you sure you want to delete this Project?
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

export default Project;

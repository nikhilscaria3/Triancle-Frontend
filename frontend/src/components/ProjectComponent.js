import React, { useEffect, useState } from "react";
import Navbar from "./GlobalComponents/NavbarComponent/navbarcomponent";
import { axiosInstance } from "../util/baseurl";
import { TextField, FormControl, InputLabel, Select, Autocomplete, MenuItem, Grid, IconButton } from '@mui/material';
import SidebarMenu from "../layouts/sidebar";
import SearchIcon from '@mui/icons-material/Search';
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
import config from "../util/config";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Test from "./TestComponent";
import ProjectBoxes from "./includes/projectbox";
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

const Project = () => {
    const [Projectdata, setProjectdata] = useState([]);
    const [isedit, setisedit] = useState(false);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [userdata, setuserdata] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [projectIDCount, setProjectIDCount] = useState(1)
    const [formData, setFormData] = useState({
        id: "",
        projectID: 1,
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        managerID: '',
        status: '',
        location: '',
        type: "",
        tags: []
    });
    const [storedID, setStoredID] = useState(null)
    const [filter, setFilter] = useState(''); // State to store the selected filter value
    const [totalPages, setTotalPages] = useState(0);
    const [counts, setCounts] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    // const [searchtag, setSearchTag] = useState("")
    // const [Tags, setTags] = useState([])
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);


    const fetchProjectdata = async () => {
        try {
            const response = await axiosInstance.get(`/account/getaccounts?page=${page}&limit=5`, {
                params: {
                    searchQuery,
                    filter
                }
            });
            if (response) {
                setProjectdata(response.data.accounts);
                setCounts(response.data.projectStatusCounts)
                setTotalPages(response.data.totalPages);
                setProjectIDCount(`${response.data.count}`);
                setFormData(prevState => ({
                    ...prevState,
                    projectID: `${response.data.count}`
                }));

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
    }, [page, searchQuery,filter]);


    const fetchuserdata = async () => {
        try {
            const response = await axiosInstance.get(`/user/getuser?page=${page}&limit=5`);
            if (response) {
                setuserdata(response.data.totalUsers);
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
            projectID: 0, // Reset projectID
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            managerID: '',
            status: '',
            location: '',
            type: "",
            tags: []
        });
        setFormData(prevState => ({
            ...prevState,
            projectID: projectIDCount // Assuming projectIDCount is the count of existing projects
        }));
    }

    const handleEditOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleEdit = (Project) => {
        setSelectedTags(Project.tags);
        setisedit(true);
        setFormData(Project);
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

    const handleDelete = async (storedID) => {
        try {
            const response = await axiosInstance.delete('/account/deleteaccount', {
                params: {
                    storedID
                }
            });
            // Check if the request was successful
            if (response) {
                fetchProjectdata();
                // Handle success scenario here, if needed
                notifySuccess(response.data.message);
                handleDeleteClose();
            } else {
                // Handle other status codes, if needed
                console.error('Failed to delete Project. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while deleting project');
            }
        }
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put('/account/updateaccount', formData);
            // Check if the request was successful
            if (response) {
                fetchuserdata();
                fetchProjectdata()
                // Handle success scenario here, if needed
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
                notifyError('An error occurred while updating project');
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axiosInstance.post('/account/createaccount', formData);
            // Check if the request was successful
            if (response) {
                fetchProjectdata();
                // Handle success scenario here, if needed
                notifySuccess(response.data.message);
                handleClose()
            } else {
                // Handle other status codes, if needed
                console.error('Failed to create Project. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while creating project');
            }
        }
    };

    const [searchTag, setSearchTag] = useState({ tagname: "" });
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [addNewTag, setAddNewTag] = useState(false);

    const handleSearch = async (value) => {
        setSearchTag({ tagname: value }); // Update searchTag state with the search value
        if (value !== "") { // Only perform search if the value is not empty
            try {
                const response = await axiosInstance.get('/search/searchtags', {
                    params: {
                        tag: value
                    }
                });
                if (response && response.data) {
                    setSearchResults(response.data);
                    setAddNewTag(false); // Reset addNewTag state
                } else {
                    setAddNewTag(true); // No matched tags found, show addNewTag button
                    console.error('Failed to search tags. Status code:', response?.status);
                }
            } catch (error) {
                console.error('Failed to search tags:', error);
            }
        } else {
            setSearchResults([]); // Reset search results if search value is empty
        }
    };

    const handleTagSelect = (event, value) => {
        if (value && !selectedTags.includes(value.tagname)) {
            setSelectedTags([...selectedTags, value.tagname]); // Add tag name to selectedTags
            setFormData({
                ...formData,
                tags: [...formData.tags, value.tagname], // Add tag name to the tags array in formData
            });
            setSearchTag({ tagname: "" }); // Clear the search field after selecting a tag
            setSearchResults([]); // Clear search results
        }
    };

    const handleAddNewTag = () => {
        if (searchTag.tagname) {
            setSelectedTags([...selectedTags, searchTag.tagname]); // Add the searched tag to selectedTags
            setFormData({
                ...formData,
                tags: [...formData.tags, searchTag.tagname], // Add the searched tag to the tags array in formData
            });
            setSearchTag({ tagname: "" }); // Clear the search field after adding a new tag
            setSearchResults([]); // Clear search results
            setAddNewTag(false); // Reset addNewTag state
        }
    };

    const handleRemoveTag = (index) => {
        const updatedTags = [...selectedTags];
        updatedTags.splice(index, 1); // Remove the tag at the specified index
        setSelectedTags(updatedTags);
        setFormData({
            ...formData,
            tags: updatedTags, // Update the tags array in formData
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'blue'; // or any other color for active status
            case 'Inactive':
                return 'red'; // or any other color for inactive status
            case 'Completed':
                return 'green'; // or any other color for completed status
            case 'Hold':
                return 'orange'; // or any other color for hold status
            default:
                return 'black'; // default color
        }
    };


    return (
        <div>
            <Navbar />
            <SidebarMenu />
            <ToastContainer />
            <div className="pc-container">
                <div className="pc-content">
                    <div className="row">
                        <ProjectBoxes count={counts} />
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Button onClick={handleOpen}>
                                <CreateBtn text={"Create New Project"} />
                            </Button>
                            <div>
                                <div className="d-flex align-items-center justify-content-between w-100 mx-3 p-4">
                                    <div className="d-flex align-items-center gap-2"> {/* Adjust alignment */}
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Search Name or Type..."
                                            value={searchQuery}
                                            onChange={(event) => setSearchQuery(event.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton onClick={fetchuserdata} size="large">
                                                        <SearchIcon />
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                        <Select
                                            value={filter}
                                            onChange={(event) => setFilter(event.target.value)}
                                            displayEmpty
                                            variant="outlined"
                                            style={{ minWidth: 120 }}
                                        >
                                            <MenuItem value="">All Status</MenuItem>
                                            <MenuItem value="Active">Active</MenuItem>
                                            <MenuItem value="Inactive">Inactive</MenuItem>
                                            <MenuItem value="Completed">Completed</MenuItem>
                                            <MenuItem value="Hold">Hold</MenuItem>
                                        </Select>
                                    </div>

                                </div>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={{
                                        ...style,
                                        overflow: 'auto', // Enable overflow scrolling
                                        maxHeight: '80vh', // Set max height to control scrolling
                                    }}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            {isedit ? 'Edit Project' : 'Add Project'}
                                        </Typography>

                                        <form onSubmit={isedit ? handleUpdateSubmit : handleSubmit}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Project ID"
                                                        name="projectID"
                                                        disabled
                                                        value={`${config.settings.projectprefix} ${formData.projectID}`}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Project Name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
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
                                                        required
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
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Manager</InputLabel>
                                                        <Select
                                                            label="Manager"
                                                            name="managerID"
                                                            value={formData.managerID}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            {userdata && userdata.length > 0 ? (
                                                                userdata.map((user) => (
                                                                    <MenuItem key={user.id} value={user.id}>
                                                                        {user.name}
                                                                    </MenuItem>
                                                                ))
                                                            ) : (
                                                                <MenuItem disabled>No managers available</MenuItem>
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Location"
                                                        name="location"
                                                        value={formData.location}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Type</InputLabel>
                                                        <Select
                                                            label="Type"
                                                            name="type"
                                                            value={formData.type}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            {config.settings.availableTypes && config.settings.availableTypes.length > 0 ? (
                                                                config.settings.availableTypes.map((type, index) => (
                                                                    <MenuItem key={index} value={type}>
                                                                        {type}
                                                                    </MenuItem>
                                                                ))
                                                            ) : (
                                                                <MenuItem disabled>No Types available</MenuItem>
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Search Tags"
                                                        variant="outlined"
                                                        value={searchTag.tagname}
                                                        onChange={(event) => handleSearch(event.target.value)}

                                                    />
                                                    {searchResults && searchResults.length > 0 ? (
                                                        searchResults.map((value, index) => (
                                                            <MenuItem key={index} onClick={(event) => handleTagSelect(event, value)}>
                                                                {value.tagname}
                                                            </MenuItem>
                                                        ))
                                                    ) : (
                                                        <Button onClick={handleAddNewTag} disabled={!searchTag.tagname}>
                                                            Add "{searchTag.tagname}" to Selected Tags
                                                        </Button>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="h6">Selected Tags:</Typography>
                                                    {selectedTags.map((tagname, index) => (
                                                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography variant="body1" disabled>{tagname}</Typography>
                                                            <button type="button" onClick={() => handleRemoveTag(index)}>
                                                                <i class='bx bx-x'></i>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Status</InputLabel>
                                                        <Select
                                                            label="Status"
                                                            name="status"
                                                            value={formData.status}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            {config.settings.projectstatus && config.settings.projectstatus.map((status, index) => (
                                                                <MenuItem key={index} value={status}>
                                                                    {status}
                                                                </MenuItem>
                                                            ))}
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

                        {/* ProjectTable */}

                        <TableContainer sx={{ overflow: 'unset', minHeight: 400 }}>
                            <Table sx={{ minWidth: 600 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700 }}>Sl no.</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Start Date</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>End Date</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Manager</TableCell>
                                        {/* <TableCell sx={{ fontWeight: 700 }}>Location</TableCell> */}
                                        <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                                        {/* <TableCell sx={{ fontWeight: 700 }}>Tags</TableCell> */}
                                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Action</TableCell> {/* Add this column for action buttons */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Projectdata && Projectdata.length > 0 ? (
                                        Projectdata.map((Project, index) => (
                                            <TableRow key={Project.id}>
                                                <TableCell>{(page - 1) * 5 + index + 1}</TableCell>
                                                <TableCell>{Project.name}</TableCell>
                                                <TableCell>{Project.startDate}</TableCell>
                                                <TableCell style={{ color: new Date(Project.endDate) < new Date() ? 'red' : 'black' }}>
                                                    {Project.endDate}
                                                </TableCell>
                                                <TableCell>{Project.User.name}</TableCell>
                                                {/* <TableCell>{Project.location}</TableCell> */}
                                                <TableCell>{Project.type}</TableCell>
                                                {/* <TableCell>{Project.tags.join(', ')}</TableCell> */}
                                                <TableCell style={{ color: getStatusColor(Project.status) }}>
                                                    {Project.status}
                                                </TableCell>

                                                <TableCell>
                                                    <div style={{ display: 'flex', gap: '20px' }}>
                                                        <Button variant="contained" color="primary" onClick={() => handleEdit(Project)}>
                                                            <i class="fa fa-pencil fa-2x"></i>
                                                        </Button>
                                                        <Button variant="contained" color="error" onClick={() => handleDeleteOpen(Project.id)}>
                                                            <i class="fa fa-trash fa-2x"></i>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={10}>
                                                <Typography variant="subtitle1" align="center" color="textSecondary">
                                                    No Projects available
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

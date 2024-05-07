import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "./GlobalComponents/NavbarComponent/navbarcomponent";
import { axiosInstance } from "../util/baseurl";
import { TextField, FormControl, InputLabel, Select, MenuItem, ListItemText, Checkbox, Grid } from '@mui/material';
import SidebarMenu from "../layouts/sidebar";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Switch } from '@mui/material';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import config from "../util/config";
import jsonData from '../util/config.json'
import subjsonData from '../util/subcategory.json'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectBoxes from "./includes/projectbox";
import CreateBtn from "./includes/CreateBtn";
import { useCheckAdminStatus } from "../Auth/UserAuth";
import socket from "../util/socket";



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

const Favfile = () => {
    const [Filedata, setFiledata] = useState([]);
    const [isedit, setisedit] = useState(false);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [ProjectData, setProjectdata] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        accountId: "",
        type: "",
        NumberofDays: "",
        category: "",
        subcategory: "",
        file: null,
        finalDate: "",
        notificationEnabled: false,
        status: "",
        selectedUsers: [],
        tags: [],
        medium: [] // Ensure medium is initialized as an empty array
    });

    const [selectedUsersName, setselectedUsersName] = useState([])
    const [storedID, setStoredID] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [type, setType] = useState([])
    const navigate = useNavigate()
    const [totalPages, setTotalPages] = useState(0);
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);
    const [searchTag, setSearchTag] = useState({ tagname: "", name: "" });
    const [selectedTags, setSelectedTags] = useState([]);
    const [favfileid, setfavfileid] = useState([])
    const [searchResults, setSearchResults] = useState([]);
    const [addNewTag, setAddNewTag] = useState(false);
    const [counts, setCounts] = useState(null);



    const fetchProjectdata = async () => {
        try {
            const response = await axiosInstance.get(`/account/getaccounts`);
            if (response) {
                setProjectdata(response.data.totalaccounts);
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


    const fetchFiledata = async () => {
        try {
            const response = await axiosInstance.get(`/file/getfiles?page=${page}&limit=5`, {
                params: {
                    searchQuery,
                    selectedDate
                }
            });
            if (response) {
                console.log(response.data.favfiles);
                setCounts(response.data.fileStatusCounts);
                setfavfileid(response.data.favfileid);
                setFiledata(response.data.favfiles);
                setTotalPages(response.data.totalPages);
                console.log('File retrieved successfully:', response.data);
            } else {
                console.error('Failed to retrieve Files. Status code:', response.status);
            }
        } catch (error) {
            console.error('Error retrieving Files:', error.message);
        }
    }

    useEffect(() => {
        fetchFiledata();
    }, [page, selectedDate, searchQuery]);


    const fetchUserdata = async (value) => {
        setSearchTag({ name: value })
        try {
            const response = await axiosInstance.get(`/user/getuser`, {
                params: {
                    searchQuery: value
                }
            });
            if (response) {
                setSearchResults(response.data.users);
                console.log('User retrieved successfully:', response.data);
            } else {
                console.error('Failed to retrieve Projects. Status code:', response.status);
            }
        } catch (error) {
            console.error('Error retrieving Projects:', error.message);
        }
    }


    const handleOpen = () => {
        setisedit(false);
        handleEditOpen();
        setSelectedTags([])
        setFormData({
            title: "",
            description: "",
            accountId: "",
            type: "",
            category: "",
            subcategory: "",
            NumberofDays: "",
            file: "",
            finalDate: "",
            notificationEnabled: "",
            tags: "",
            status: "",
            medium: [],
            selectedUsers: []
        });
    }

    const handleEditOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleEdit = (File) => {
        // Extract file details and set the form data
        const selectedProject = ProjectData.find(project => project.id === File.accountId);
        setType(selectedProject.type);
        setFormData({
            ...formData, // Spread the existing formData
            ...File, // Spread the properties of the File object
            category: File.category, // Set the category separately
            accountId: File.accountId,
            subcategory: File.subcategory,
        });

        setSelectedTags(File.tags);
        setisedit(true); // Set isEdit to true
        handleEditOpen(true); // Open edit modal or form
    };


    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        // Handle file input separately
        if (type === 'file') {
            // Create a new FormData object
            // Loop through existing formData and append to newFormData
            setFormData({ ...formData, [name]: value });
        } else {
            // For other input types, handle as usual
            // If the name of the input field is "notificationEnabled", set its value to checked
            // Otherwise, set the value as usual
            const newValue = name === "notificationEnabled" ? checked : value;
            // Update the state with the new value
            setFormData({ ...formData, [name]: newValue });
        }
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
    const handleDeleteOpen = (Fileid) => {
        setStoredID(Fileid)
        setDeleteOpen(true);
    };

    // Function to handle closing the delete modal
    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };




    const handleProjectChange = (event) => {
        const selectedProjectId = event.target.value;
        const selectedProject = ProjectData.find(project => project.id === selectedProjectId);
        setType(selectedProject.type);
        setFormData({ ...formData, accountId: selectedProjectId });
    };


    const handleDelete = async (storedID) => {
        try {
            const response = await axiosInstance.delete('/file/deletefile', {
                params: {
                    storedID
                }
            });
            // Check if the request was successful
            if (response) {
                fetchFiledata();
                // Handle success scenario here, if needed
                notifySuccess(response.data.message);
                handleDeleteClose();
            } else {
                // Handle other status codes, if needed
                console.error('Failed to delete File. Status code:', response.status);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while deleting file');
            }
        }
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put('/file/updatefile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Check if the request was successful
            if (response) {
                fetchFiledata();
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
                notifyError('An error occurred while creating project');
            }
        }
    };

    const handleImageFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0]
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("data", formData);
            const token = localStorage.getItem("accesstoken")
            const response = await axiosInstance.post('/file/createfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Check if the request was successful
            if (response) {
                fetchFiledata();
                notifySuccess(response.data.message);
                const message = response.data.message
                socket.emit('message', message, token);
                handleClose()
            } else {
                // Handle other status codes, if needed
                console.error('Failed to create File. Status code:', response.status);
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

    const handleDateChange = (event) => {
        const { value } = event.target;
        setSelectedDate(value); // Update the selectedDate state with the new value
        setSearchQuery(''); // Clear the search query when a date is selected
        fetchFiledata(); // Perform the search
    };



    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const handleSearch = async (value) => {
        setSearchTag({ tagname: value }); // Update searchTag state with the search value
        if (value !== "") { // Only perform search if the value is not empty
            try {
                const response = await axiosInstance.get('/search/searchtags', {
                    params: {
                        tag: value,

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

    // React component handleFavClick function
    const handleFavClick = async (fileId) => {
        try {
            console.log("fileId", fileId);
            const response = await axiosInstance.post('/file/removefav', null, {
                params: {
                    fileId // Send fileId as a query parameter
                }
            });
            if (response) {
                setIsFavorite(true);
                notifySuccess(response.data.message);
                fetchFiledata()
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                notifyError(errorMessage);
            } else {
                console.log(error);
                notifyError('An error occurred while saving fav');
            }
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

    const handleUserSelect = (event, value) => {
        if (!formData.selectedUsers) {
            // Initialize selectedUsers as an empty array if it's undefined
            setFormData({
                ...formData,
                selectedUsers: [],
            });
        }

        if (value && !formData.selectedUsers.includes(value.id)) {
            setFormData({
                ...formData,
                selectedUsers: [...formData.selectedUsers, value.id],
            });
            setselectedUsersName([...selectedUsersName, value.name])
            setSearchTag({ name: "" }); // Clear the search field after selecting a user
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
        const updateUser = [...formData.selectedUsers]
        const updatedTags = [...selectedTags];
        updateUser.splice(index, 1);
        updatedTags.splice(index, 1); // Remove the tag at the specified index
        setSelectedTags(updatedTags);
        setFormData({
            ...formData,
            selectedUsers: updateUser,
            tags: updatedTags, // Update the tags array in formData
        });
    };


    const handleSelectChange = (event) => {
        const { value } = event.target;
        setFormData({ ...formData, medium: value });
    };

    const handleViewNavigate = (File) => {
        navigate('/viewfile', { state: { data: File } });
    };

    const isAdmin = useCheckAdminStatus()

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
                        {/* <ProjectBoxes count={counts} /> */}
                        <Stack direction="row" alignItems="center" justifyContent="space-between">

                            <div>
                                <div className="d-flex align-items-center flex-grow-1 justify-content-end  p-4">
                                    <div className="d-flex align-items-center gap-2"> {/* Adjust alignment */}
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Search Fav File..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton onClick={fetchFiledata} size="large">
                                                        <SearchIcon />
                                                    </IconButton>
                                                ),
                                            }}

                                        />
                                        <FormControl sx={{ 'width': '14rem' }}>
                                            <TextField
                                                label="End Date"
                                                name="enddate"
                                                type="date"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </FormControl>
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
                                            {isedit ? 'Edit File' : 'Add File'}
                                        </Typography>
                                        <form onSubmit={isedit ? handleUpdateSubmit : handleSubmit}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Title"
                                                        name="title"
                                                        value={formData.title}
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
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Project/Account</InputLabel>
                                                        <Select
                                                            label="Project"
                                                            name="accountId"
                                                            value={formData.accountId}
                                                            onChange={handleProjectChange}
                                                            required
                                                        >
                                                            {ProjectData && ProjectData.length > 0 ? (
                                                                ProjectData.map((project) => (
                                                                    <MenuItem key={project.id} value={project.id}>
                                                                        {project.name}
                                                                    </MenuItem>
                                                                ))
                                                            ) : (
                                                                <MenuItem disabled>No project available</MenuItem>
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Category</InputLabel>
                                                        <Select
                                                            label="Category"
                                                            name="category"
                                                            value={formData.category}
                                                            onChange={handleChange}
                                                            disabled={!type || !formData.accountId}
                                                            required
                                                        >
                                                            {type && formData.accountId && jsonData[type]?.fileType.map((cat, index) => (
                                                                <MenuItem key={index} value={cat}>
                                                                    {cat}
                                                                </MenuItem>
                                                            ))}
                                                            {!type && <MenuItem disabled>Please select a type first</MenuItem>}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                {/* <Grid item xs={12} sm={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Sub Category</InputLabel>
                                                        {type && formData.category ? ( // Check if both type and category are selected
                                                            <Select
                                                                label="Sub Category"
                                                                name="subcategory"
                                                                value={formData.subcategory}
                                                                onChange={handleChange}
                                                                disabled={!formData.accountId}
                                                            >
                                                                {subjsonData[formData.category]?.fileType.map((cat, index) => (
                                                                    <MenuItem key={index} value={cat}>
                                                                        {cat}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        ) : (
                                                            <Typography>Please select a type and category first</Typography>
                                                        )}
                                                    </FormControl>
                                                </Grid> */}
                                                <Grid item xs={12} sm={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Sub Category</InputLabel>
                                                        <Select
                                                            label="Sub Category"
                                                            name="subcategory"
                                                            value={formData.subcategory}
                                                            onChange={handleChange}
                                                            disabled={!formData.accountId}
                                                            required
                                                        >
                                                            {type && formData.category && subjsonData[formData.category]?.fileType.map((cat, index) => (
                                                                <MenuItem key={index} value={cat}>
                                                                    {cat}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>

                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Medium</InputLabel>
                                                        <Select
                                                            label="Medium"
                                                            name="medium"
                                                            multiple
                                                            value={formData.medium || []} // Ensure formData.medium is always an array
                                                            onChange={handleSelectChange}
                                                            renderValue={(selected) => selected.join(', ')}
                                                            required
                                                        >
                                                            <MenuItem value="Email">
                                                                <Checkbox
                                                                    checked={formData.medium && formData.medium.includes('Email')}
                                                                    color="primary"
                                                                />
                                                                <ListItemText primary="Email" />
                                                            </MenuItem>
                                                            <MenuItem value="Mobile">
                                                                <Checkbox
                                                                    checked={formData.medium && formData.medium.includes('Mobile')}
                                                                    color="primary"
                                                                />
                                                                <ListItemText primary="Mobile" />
                                                            </MenuItem>
                                                            <MenuItem value="In App">
                                                                <Checkbox
                                                                    checked={formData.medium && formData.medium.includes('In App')}
                                                                    color="primary"
                                                                />
                                                                <ListItemText primary="In App" />
                                                            </MenuItem>
                                                        </Select>

                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Users List"
                                                        variant="outlined"
                                                        value={searchTag.name}
                                                        onChange={(event) => fetchUserdata(event.target.value)}

                                                    />
                                                    {searchResults ? (
                                                        searchResults.map((value, index) => (
                                                            <MenuItem key={value.id} onClick={(event) => handleUserSelect(event, value)}>
                                                                {value.name}
                                                            </MenuItem>

                                                        ))
                                                    ) : (
                                                        // You can add a message here if no search results are found
                                                        <MenuItem>No results found</MenuItem>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    {formData.selectedUsers && formData.selectedUsers.length > 0 ? (
                                                        <>
                                                            <Typography variant="h6">Selected Users:</Typography>
                                                            {selectedUsersName.map((tagname, index) => (
                                                                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Typography variant="body1" disabled>{tagname}</Typography>
                                                                    <button type="button" onClick={() => handleRemoveTag(index)}>
                                                                        <i className='bx bx-x'></i>
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <Typography variant="body1">No users selected</Typography>
                                                    )}
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <input
                                                        fullWidth
                                                        type="file"
                                                        name="file"
                                                        onChange={handleImageFileChange}
                                                        required
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="final Date"
                                                        name="finalDate"
                                                        type="date"
                                                        value={formData.finalDate}
                                                        onChange={handleChange}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        required
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <FormControl component="fieldset">
                                                        <Typography component="legend">Notification</Typography>
                                                        <div className="d-flex m-auto">
                                                            <Typography onClick={handleChange} style={{ cursor: 'pointer' }}>Disable</Typography>
                                                            <Switch
                                                                checked={formData.notificationEnabled}
                                                                onChange={handleChange}
                                                                name="notificationEnabled"
                                                                inputProps={{ 'aria-label': 'notification switch' }}
                                                            />
                                                            <Typography onClick={handleChange} style={{ cursor: 'pointer' }}>Enable</Typography>
                                                        </div>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Number of Days"
                                                        name="NumberofDays"
                                                        type="text"
                                                        value={formData.NumberofDays}
                                                        onChange={handleChange}
                                                        required
                                                    />
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

                        {/* FileTable */}

                        <TableContainer sx={{ overflow: 'unset', minHeight: 400 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700 }}>Sl no.</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Title</TableCell> {/* Change Name to Title */}
                                        <TableCell sx={{ fontWeight: 700 }}>End Date</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Notification Date</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                                        {/* <TableCell sx={{ fontWeight: 700 }}>Account</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Tags</TableCell> */}
                                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Fav</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Filedata && Filedata.length > 0 ? (
                                        Filedata.map((File, index) => (
                                            <TableRow key={File.id}>
                                                <TableCell>{(page - 1) * 5 + index + 1}</TableCell>
                                                <TableCell>{File.title}</TableCell>
                                                <TableCell style={{ color: new Date(File.finalDate) < new Date() ? 'red' : 'black' }}>
                                                    {File.finalDate}
                                                </TableCell>
                                                <TableCell>{File.notificationDate}</TableCell>
                                                <TableCell>{File.Account.type}</TableCell>
                                                <TableCell>{File.category}</TableCell>
                                                <TableCell style={{ color: getStatusColor(File.status) }}>
                                                    {File.status}
                                                </TableCell>
                                                <TableCell onClick={() => handleFavClick(File.id)}>
                                                    <i className="fa fa-star fa-2x" style={{ color: "#FFD43B" }}></i>
                                                </TableCell>
                                                <TableCell>
                                                    <div style={{ display: 'flex', gap: '20px' }}>
                                                        {isAdmin &&
                                                            <>
                                                                <Button variant="contained" color="primary" onClick={() => handleEdit(File)}>
                                                                    <i className="fa fa-pencil fa-2x"></i>
                                                                </Button>
                                                                <Button variant="contained" color="error" onClick={() => handleDeleteOpen(File.id)}>
                                                                    <i className="fa fa-trash fa-2x"></i>
                                                                </Button>
                                                            </>
                                                        }
                                                        <Button variant="contained" color="secondary" onClick={() => handleViewNavigate(File)}>
                                                            <i className="fa fa-eye fa-2x"></i>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={10}>
                                                <Typography variant="subtitle1" align="center" color="textSecondary">
                                                    No Favorite Files available
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
                                    Are you sure you want to delete this File?
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

export default Favfile;

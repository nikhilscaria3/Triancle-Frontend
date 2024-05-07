import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import config from '../util/config';
const BackendURL = config.BackendURL

const getFileType = (file) => {
    const fileType = file.split('.').pop().toLowerCase();
    if (['mp4', 'webm', 'ogg'].includes(fileType)) {
        return 'video';
    } else if (['mp3', 'wav', 'ogg'].includes(fileType)) {
        return 'audio';
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
        return 'image';
    } else if (['docx', 'doc'].includes(fileType)) {
        return 'document';
    } else if (['pdf'].includes(fileType)) {
        return 'pdf';
    }
    return 'unknown';
};

const renderFile = (fileType, fileUrl) => {
    switch (fileType) {
        case 'video':
            return <video style={{ width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'solid' }} src={fileUrl} controls />;
        case 'audio':
            return <audio src={fileUrl} controls />;
        case 'image':
            return <img src={fileUrl} className='img-fluid' alt='File' style={{ objectFit: 'cover' }} />;
        case 'document':
            return <a href={fileUrl} target='_blank' rel='noreferrer'>Open Document</a>;
        case 'pdf':
            return <embed src={fileUrl} type='application/pdf' width='100%' height='600px' />;
        default:
            return <p>File type not supported</p>;
    }
};


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


const ViewFile = () => {
    const location = useLocation();
    const { data } = location.state;
    const fileType = getFileType(data.file);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const link = `${BackendURL}${data.file}`

    const handleCopyLink = () => {
        navigator.clipboard.writeText(link)
            .then(() => alert('Link copied to clipboard'))
            .catch((error) => console.error('Failed to copy link:', error));
    };

    // Function to handle opening the delete modal
    const handleShareButtonOpen = () => {
        setDeleteOpen(true);
    };

    // Function to handle closing the delete modal
    const handleShareButtonClose = () => {
        setDeleteOpen(false);
    };


    const handleShareWhatsApp = () => {
        window.open(`whatsapp://send?text=${encodeURIComponent(link)}`);
    };

    const handleShareTelegram = () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}`);
    };

    // favoriteController.js
    const handleDownload = () => {
        fetch(link)
            .then(response => response.blob())
            .then(blob => {
                // Create a temporary URL for the blob
                const url = window.URL.createObjectURL(new Blob([blob]));

                // Create a temporary link element
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', data.file);

                // Append the link to the document body and trigger a click event
                document.body.appendChild(link);
                link.click();

                // Remove the link from the document body
                document.body.removeChild(link);

                // Release the object URL
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    };


    const handleShareLinkedIn = () => {
        window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(link)}`);
    };


    return (
        <div className='p-5'>
            <Paper elevation={3} style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h5" style={{ fontWeight: 700 }} gutterBottom>
                    File Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Name:</Typography>
                        <Typography>{data.title}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Description:</Typography>
                        <Typography>{data.description}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Category:</Typography>
                        <Typography>{data.category}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Sub Category:</Typography>
                        <Typography>{data.subcategory}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Final Date:</Typography>
                        <Typography>{data.finalDate}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Notification Enabled:</Typography>
                        <Typography>{data.notificationEnabled ? 'Yes' : 'No'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Tags:</Typography>
                        <Typography>{data.tags.join(', ')}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Status:</Typography>
                        <Typography>{data.status}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>File:</Typography>
                        <div className='d-flex'>
                            <div style={{ width: '300px', height: "300px", display: 'flex', alignItems: 'center', justifyContent: 'center', border: "solid" }}>
                                {renderFile(fileType, `${BackendURL}${data.file}`)}
                            </div>
                            <Button onClick={() => handleShareButtonOpen()}>
                                <i class="fa fa-share fa-2x"></i>
                            </Button>
                        </div>

                    </Grid>

                </Grid>
            </Paper>
            <Modal
                open={deleteOpen}
                onClose={handleShareButtonClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='d-flex gap-4 flex-wrap'>
                        <Button onClick={handleShareWhatsApp} variant="contained" startIcon={<i class='bx bxl-whatsapp' />}>
                            WhatsApp
                        </Button>
                        <Button onClick={handleShareTelegram} variant="contained" startIcon={<i class='bx bxl-telegram' />}>
                            Telegram
                        </Button>
                        <Button onClick={handleCopyLink} variant="contained" startIcon={<i class='bx bx-copy' ></i>}>
                            Copy Link
                        </Button>
                        <Button onClick={handleDownload} variant="contained" startIcon={<i class="fa fa-download"></i>}>
                            Download
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Paper elevation={3} style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h5" style={{ fontWeight: 700 }} gutterBottom>
                    Account Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Name:</Typography>
                        <Typography>{data.Account.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Description:</Typography>
                        <Typography>{data.Account.description}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Start Date:</Typography>
                        <Typography>{data.Account.startDate}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>End Date:</Typography>
                        <Typography>{data.Account.endDate}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Location:</Typography>
                        <Typography>{data.Account.location}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Type:</Typography>
                        <Typography>{data.Account.type}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Notification Enabled:</Typography>
                        <Typography>{data.Account.notificationEnabled ? 'Yes' : 'No'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Tags:</Typography>
                        <Typography>{data.Account.tags.join(', ')}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Status:</Typography>
                        <Typography>{data.Account.status}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" style={{ fontWeight: 700 }} gutterBottom>
                    User Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Name:</Typography>
                        <Typography>{data.Account.User.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Email:</Typography>
                        <Typography>{data.Account.User.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Phone Number:</Typography>
                        <Typography>{data.Account.User.phoneNumber}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Status:</Typography>
                        <Typography>{data.Account.User.status ? "Active" : "Deactive"}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default ViewFile;

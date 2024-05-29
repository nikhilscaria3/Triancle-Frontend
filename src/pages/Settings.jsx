import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText
} from "@mui/material";
import { axiosInstance } from "../utils/baseurl";
import { ToastContainer } from "react-toastify";
import { showNotification } from "../utils/toastmessage";

const SettingsContainer = styled.div`
  padding: 20px;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
`;

const ResetButton = styled(Button)`
  margin-bottom: 20px;
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [
  "Project",
  "User",
  "Inventory",
  "Document",
  "Material",
  "MaterialRequest",
  "Checklist",
  "Notificationmessage"
];


const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSelectChange = (event) => {
    const { target: { value } } = event;
    setSelectedOptions(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleReset = async () => {
    console.log("Selected Options: ", selectedOptions);
    try {
      const response = await axiosInstance.post('/reset/resettables', { options: selectedOptions });
      if (response) {
        console.log(response.data.message);
        // Add your success handling logic here, like a success notification
      }
      showNotification({ type: "SUCCESS", message: response.data.message });
      handleCloseModal();
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error;
        showNotification({ type: "ERROR", message: errorMessage });

      }
    }
  };


  return (

    <>
      <ToastContainer />
      <SettingsContainer>
        <Title variant="h4">Settings</Title>
        <ResetButton variant="contained" color="primary" onClick={handleOpenModal}>
          Reset
        </ResetButton>

        <Modal
          open={showModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Reset Options
            </Typography>
            <FormControl sx={{ mt: 2, width: '100%' }}>
              <InputLabel id="mutiple-select-label">Select Options to Reset</InputLabel>
              <Select
                labelId="mutiple-select-label"
                multiple
                value={selectedOptions}
                onChange={handleSelectChange}
                input={<OutlinedInput label="Select Options to Reset" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={selectedOptions.indexOf(option) > -1} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleReset}
                sx={{ ml: 2 }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Modal>
      </SettingsContainer>
    </>

  );
};

export default Settings;

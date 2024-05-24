import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { axiosInstance } from '../../../utils/baseurl';
import { TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';


const InventoryForm = ({ onClose, onSubmit }) => {

    const [formData, setFormData] = useState({
        name: "",
        count: ""
    });

    const [inventoryType, setInventoryType] = useState([]);
    const [filteredInventoryList, setFilteredInventoryList] = useState([]);
    const [selectedInventory, setSelectedInventory] = useState('');
    const [isNewInventory, setIsNewInventory] = useState(false);

    useEffect(() => {
        fetchInventoryType();
    }, []);

    const fetchInventoryType = async () => {
        try {
            const response = await axiosInstance.get('/inventory/getinventorytypedata');
            setInventoryType(response.data.inventorytypedata);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInventoryNameChange = (value) => {
        setFormData({ ...formData, name: value });
        setSelectedInventory(value);

        // Filter inventory list based on input value
        const filteredList = inventoryType.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredInventoryList(filteredList);

        // Check if the input value matches any existing inventory
        const isNew = value && filteredList.every(item => item.name.toLowerCase() !== value.toLowerCase());
        setIsNewInventory(isNew);
    };

    const handleAutocompleteChange = (event, value) => {
        const selectedType = inventoryType.find(item => item.name === value);
        setSelectedInventory(value);

        if (selectedType) {
            // If a matched inventory is selected, update count field with selected inventory's count
            setFormData({ ...formData, name: value, count: selectedType.count });
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData) {
            console.log(formData);
            onSubmit({ formData });
            fetchInventoryType()
            setFormData({ name: "", count: "" });
            setSelectedInventory('');
            onClose()
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Top>
                    <Title>Create Inventory</Title>
                    <Close onClick={onClose}><i class='bx bx-x' style={{ fontSize: "30px" }}></i></Close>
                </Top>
                <FormGroup>
                    <InputLabel htmlFor="inventoryName">Inventory Name:</InputLabel>
                    <Autocomplete
                        id="inventoryName"
                        value={selectedInventory}
                        onChange={(event, value) => handleAutocompleteChange(event, value)}
                        inputValue={formData.name}
                        onInputChange={(event, value) => handleInventoryNameChange(value)}
                        options={filteredInventoryList.map((option) => option.name)}
                        renderInput={(params) => (
                            <TextField {...params} label="Inventory Name" variant="outlined" />
                        )}
                    />
                    {/* Display option to create new inventory */}
                    {isNewInventory && (
                        <Typography variant="body2">
                            No matching inventory found. Create new
                        </Typography>
                    )}

                    <InputLabel htmlFor="inventoryCount">Inventory Count:</InputLabel>
                    <TextField
                        id="inventoryCount"
                        type="number"
                        name="count"
                        value={formData.count}
                        onChange={handleChange}
                    />

                    <Buttons>
                        <CancelBtn onClick={onClose}>Cancel</CancelBtn>

                        <CreateBtn type="submit" variant="contained">Submit</CreateBtn>


                    </Buttons>

                </FormGroup>


            </Form>
        </Container>
    );
};

export default InventoryForm;

const Container = styled.div`
  margin: 60px auto;
  z-index: 999;
  //glassmorphism effect
`;

const Form = styled.form``;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 35px;
  border-bottom: 1px solid #74747454;
  background-color: white;
  border-radius: 20px 20px 0 0;
`;


const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;
const Close = styled.p`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

const FormGroup = styled.div`
padding: 10px 40px;
width: 700px; /* Adjust width as needed */
height:auto;
overflow-y: scroll; /* Add vertical scroll if content exceeds height */
background-color: #e0edea;
border-radius: 0 0 20px 20px;
`;

const InputLabel = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;


const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;
const CancelBtn = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  background-color: transparent;
  border-radius: 5px;
  color: #595959;
`;
const CreateBtn = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  background-color: #009432;
  color: #fff;
  border-radius: 5px;
`;

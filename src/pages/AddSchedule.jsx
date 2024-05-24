import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const AddSchedule = ({ onAddSchedule }) => {
  const [schedule, setSchedule] = useState({
    title: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSchedule(schedule);
    setSchedule({
      title: "",
      date: "",
      time: ""
    });
  };

  return (
    <Container>
      <h2>Add Schedule</h2>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Title:</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={schedule.title}
          onChange={handleChange}
          required
        />

        <Label htmlFor="date">Date:</Label>
        <Input
          type="date"
          id="date"
          name="date"
          value={schedule.date}
          onChange={handleChange}
          required
        />

        <Label htmlFor="time">Time:</Label>
        <Input
          type="time"
          id="time"
          name="time"
          value={schedule.time}
          onChange={handleChange}
          required
        />

        <Button type="submit">Add Schedule</Button>
      </Form>
    </Container>
  );
};

export default AddSchedule;

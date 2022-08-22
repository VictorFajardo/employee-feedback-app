// React components
import React, { useState } from "react";
// Redux components
import { useAppDispatch } from '../../hooks';
import { addEmployee } from "../../features/employees/employeesSlice";
// Api components
import { addUserApi, createAuthUserWithEmailAndPassword, getUserApi } from "../../utilities/firebase";
// Chidren components
import Title from "../elements/title";
// Material components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
// Interface components
import { DefaultEmployeeFields } from '../../data';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface AddEmployeesProps {
  closeMethod: () => void,
}

const AddEmployees: React.FC<AddEmployeesProps> = ({ closeMethod }) => {
  const dispatch = useAppDispatch();
  const [employeeFields, setEmployeeFields] = useState(DefaultEmployeeFields); // Employee detail values
  const { firstName, lastName, jobTitle, email, password, confirmPassword, admin } = employeeFields;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    if (name === 'admin') {
      setEmployeeFields({ ...employeeFields, admin: checked });
    } else {
      setEmployeeFields({ ...employeeFields, [name]: value });
    }
  };

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Password confirmation managment
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      // Api call to create the auth user
      const userCredential = await createAuthUserWithEmailAndPassword(email, password);
      if (userCredential) {
        const { user: { uid } } = userCredential;
        // Api call to create the user in the users collection
        await addUserApi(uid, { firstName, lastName, email, jobTitle, admin });
        // Api to retrive the new user from the users collection
        const newEmployee = await getUserApi(uid);
        // Reducer to update the new user into the state manager
        dispatch(addEmployee(newEmployee));
        closeMethod();
      }
    } catch (error: any) {
      // Error managment
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  return (
    <Container>
      <Title text='Add a new employee' align={'column'} />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          autoFocus
          margin="normal"
          required
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="jobTitle"
          name="jobTitle"
          label="Job Title"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={handleChange}
        />
        <FormControlLabel control={<Checkbox name="admin" checked={admin} onChange={handleChange} />} label="Administrator" />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: 'center' }}>
          <Button type="submit" sx={{ my: 2, ml: 2, display: 'flex' }} variant="outlined">ADD</Button> <Button onClick={closeMethod} sx={{ my: 2, ml: 2, display: 'flex' }} variant="contained">CANCEL</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default AddEmployees
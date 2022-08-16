// React components
import { useState } from "react";
// Redux components
import { useAppDispatch } from '../../../app/hooks';
import { addEmployee } from "../../../features/employees/employeesSlice";
// Api components
import { addUserApi, createAuthUserWithEmailAndPassword, getUserApi } from "../../../utilities/firebase";
// Material components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const defaultEmployeeFields = {
  id: '',
  firstName: '',
  lastName: '',
  jobTitle: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const AddEmployees = ( props ) => {
  const dispatch = useAppDispatch();
  const [employeeFields, setEmployeeFields] = useState(defaultEmployeeFields); // Employee detail values
  const { firstName, lastName, jobTitle, email, password, confirmPassword } = employeeFields;
  const { closeMethod } = props;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeFields({ ...employeeFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Password confirmation managment
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      // Api call to create the auth user
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // Api call to create the user in the users collection
      await addUserApi(user.uid, { firstName, lastName, email, jobTitle });
      // Api to retrive the new user from the users collection
      const newUser = await getUserApi(user.uid);
      // Reducer to update the new user into the state manager
      dispatch(addEmployee(newUser));
      closeMethod();
    } catch (error) {
      // Error managment
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  return (
    <>
      <h2>Add a new employee</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">first name: </label>
        <input type="text" name="firstName" onChange={handleChange} value={firstName} /><br />
        <label htmlFor="lastName">last name: </label>
        <input type="text" name="lastName" onChange={handleChange} value={lastName} /><br />
        <label htmlFor="jobTitle">job title: </label>
        <input type="text" name="jobTitle" onChange={handleChange} value={jobTitle} /><br />
        <label htmlFor="email">email address: </label>
        <input type="email" name="email" onChange={handleChange} value={email} /><br />
        <label htmlFor="password">password: </label>
        <input type="password" name="password" onChange={handleChange} value={password} /><br />
        <label htmlFor="confirmPassword">confirm password: </label>
        <input type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: 'center' }}>
          <Button type="submit" sx={{ my: 2, ml: 2, display: 'flex' }} variant="outlined">ADD</Button> <Button onClick={closeMethod} sx={{ my: 2, ml: 2, display: 'flex' }} variant="contained">CANCEL</Button>
        </Box>
      </form>
    </>
  )
}

export default AddEmployees
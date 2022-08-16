// React components
import { useEffect, useState } from "react";
// Redux components
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { currentEmployee } from "../../../features/employees/employeesSlice";
import { updateEmployee } from "../../../features/employees/employeesSlice";
// Api components
import { updateUserApi } from "../../../utilities/firebase";
// Material components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const defaultEmployeeFields = {
  firstName: '',
  lastName: '',
  jobTitle: '',
  email: '',
};

const UpdateEmployees = ( props ) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(currentEmployee); // Select the current employee to display details
  const [employeeFields, setEmployeeFields] = useState(defaultEmployeeFields); // Employee detail values
  const { id, firstName, lastName, jobTitle, email } = employeeFields;
  const { closeMethod } = props;

  useEffect(() => {
    setEmployeeFields(current);
  },[current]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeFields({ ...employeeFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Api call to update the user in the users collection
      await updateUserApi({ id, firstName, lastName, jobTitle, email})
      // Reducer to update the user into the state manager
      dispatch(updateEmployee(employeeFields));
      closeMethod();
    } catch (error) {
      // Error managment
      console.log('user update encountered an error', error);
    }
  };

  return (
    <>
      <h2>Update employee information</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">first name: </label>
        <input type="text" name="firstName" onChange={handleChange} value={firstName} /><br />
        <label htmlFor="lastName">last name: </label>
        <input type="text" name="lastName" onChange={handleChange} value={lastName} /><br />
        <label htmlFor="jobTitle">job title: </label>
        <input type="text" name="jobTitle" onChange={handleChange} value={jobTitle} /><br />
        <label htmlFor="email">email address: </label>
        <input readOnly type="email" name="email" value={email} /><br />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: 'center' }}>
          <Button type="submit" sx={{ my: 2, ml: 2, display: 'flex' }} variant="outlined">SAVE</Button> <Button value="signout" onClick={closeMethod} sx={{ my: 2, ml: 2, display: 'flex' }} variant="contained">CANCEL</Button>
        </Box>
      </form>
      
    </>
  )
}

export default UpdateEmployees
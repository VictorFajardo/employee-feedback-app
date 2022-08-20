// React components
import { useEffect, useState } from "react";
// Redux components
import { useAppSelector } from '../../hooks';
import { currentEmployee } from "../../features/employees/employeesSlice";
// Material components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// Interface components
import { DefaultEmployeeFields } from "../../data";

interface ViewEmployeesProps {
  closeMethod: () => void,
}

const ViewEmployees: React.FC<ViewEmployeesProps> = ({ closeMethod }) => {
  const current = useAppSelector(currentEmployee); // Select the current review to employee details
  const [employeeFields, setEmployeeFields] = useState(DefaultEmployeeFields); // Employee detail values
  const { firstName, lastName, jobTitle, email } = employeeFields;

  useEffect(() => {
    setEmployeeFields(current);
  },[current]);
 
  return (
    <>
      <h2>View employee information</h2>
      first name: {firstName}<br />
      last name: {lastName}<br />
      job title: {jobTitle}<br />
      email address: {email}<br />
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: 'center' }}>
        <Button value="signout" onClick={closeMethod} sx={{ my: 2, ml: 2, display: 'flex' }} variant="contained">CLOSE</Button>
      </Box>
    </>
  )
}

export default ViewEmployees
// React components
import { useEffect, useState } from "react";
// Redux components
import { useAppSelector } from '../../hooks';
import { currentEmployee } from "../../features/employees/employeesSlice";
// Children components
import Title from "../elements/title";
// Material components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
// Interface components
import { DefaultEmployeeFields, ModalType } from "../../data";

interface ViewEmployeesProps {
  closeMethod: () => void,
  clickMethod: (modal: ModalType, id?: string) => void,
}

const ViewEmployees: React.FC<ViewEmployeesProps> = ({ closeMethod, clickMethod }) => {
  const current = useAppSelector(currentEmployee); // Select the current review to employee details
  const [employeeFields, setEmployeeFields] = useState(DefaultEmployeeFields); // Employee detail values
  const { id, firstName, lastName, jobTitle, email, admin } = employeeFields;

  useEffect(() => {
    setEmployeeFields(current);
  },[current]);
 
  return (
    <Container>
      <Title text='View employee information' align={'column'} />
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={firstName}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={lastName}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="jobTitle"
          name="jobTitle"
          label="Job Title"
          value={jobTitle}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={email}
          InputProps={{
            readOnly: true,
          }}
        />
        <FormControlLabel control={<Checkbox name="admin" checked={admin} />} label="Administrator" />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: 'center' }}>
        <Button onClick={() => clickMethod(ModalType.UPDATE, id)} sx={{ my: 2, ml: 2, display: 'flex' }} variant="outlined">UPDATE</Button> <Button onClick={closeMethod} sx={{ my: 2, ml: 2, display: 'flex' }} variant="contained">CLOSE</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default ViewEmployees
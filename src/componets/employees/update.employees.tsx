// React components
import { useEffect, useState } from 'react';
// Redux components
import { useAppSelector, useAppDispatch } from '../../hooks';
import { currentEmployee, updateEmployee } from '../../features/employees/employeesSlice';
// Api components
import { updateUserApi } from '../../utilities/firebase';
// Chidren components
import Title from '../elements/title';
// Material components
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// Interface components
import { EmployeeInterface } from '../../interfaces';
import { DefaultEmployeeFields } from '../../data';

interface UpdateEmployeesProps {
  closeMethod: () => void;
}

function UpdateEmployees({ closeMethod }: UpdateEmployeesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const current = useAppSelector(currentEmployee); // Select the current employee to display details
  const [employeeFields, setEmployeeFields] = useState<EmployeeInterface>(
    DefaultEmployeeFields
  ); // Employee detail values
  const { id, firstName, lastName, jobTitle, email, admin } = employeeFields;

  useEffect(() => {
    setEmployeeFields(current);
  }, [current]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked } = event.target;
    if (name === 'admin') {
      setEmployeeFields({ ...employeeFields, admin: checked });
    } else {
      setEmployeeFields({ ...employeeFields, [name]: value });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      // Api call to update the user in the users collection
      await updateUserApi(id, {
        firstName,
        lastName,
        jobTitle,
        email,
        admin,
      });
      // Reducer to update the user into the state manager
      dispatch(updateEmployee(employeeFields));
      closeMethod();
    } catch (error) {
      // Error managment
      console.log('user update encountered an error', error);
    }
  };

  return (
    <Container>
      <Title text='Update employee information' align={'column'} />
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          autoFocus
          margin='normal'
          fullWidth
          id='firstName'
          name='firstName'
          label='First Name'
          value={firstName}
          onChange={handleChange}
        />
        <TextField
          margin='normal'
          fullWidth
          id='lastName'
          name='lastName'
          label='Last Name'
          value={lastName}
          onChange={handleChange}
        />
        <TextField
          margin='normal'
          fullWidth
          id='jobTitle'
          name='jobTitle'
          label='Job Title'
          value={jobTitle}
          onChange={handleChange}
        />
        <TextField
          margin='normal'
          disabled
          fullWidth
          id='email'
          name='email'
          label='Email'
          type='email'
          value={email}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox name='admin' checked={admin} onChange={handleChange} />
          }
          label='Administrator'
        />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            type='submit'
            sx={{ my: 2, ml: 2, display: 'flex' }}
            color='info'
            variant='contained'
            endIcon={<SaveIcon />}
          >
            SAVE
          </Button>{' '}
          <Button
            onClick={closeMethod}
            sx={{ my: 2, ml: 2, display: 'flex' }}
            color='error'
            variant='contained'
            endIcon={<CloseIcon />}
          >
            CANCEL
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateEmployees;

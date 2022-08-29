// React components
import React, { useState } from 'react';
// Redux components
import { useAppDispatch } from '../../hooks';
import { addEmployee } from '../../features/employees/employeesSlice';
// Api components
import {
  addUserApi,
  createAuthUserWithEmailAndPassword,
  getUserApi,
} from '../../utilities/firebase';
import { UserCredential } from 'firebase/auth';
// Chidren components
import Title from '../elements/title';
// Material components
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// Interface components
import { EmployeeInterface } from '../../interfaces';
import { DefaultEmployeeFields } from '../../data';

interface AddEmployeesProps {
  closeMethod: () => void;
}

function AddEmployees({ closeMethod }: AddEmployeesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [employeeFields, setEmployeeFields] = useState(DefaultEmployeeFields); // Employee detail values
  const {
    firstName,
    lastName,
    jobTitle,
    email,
    password,
    confirmPassword,
    admin,
  } = employeeFields;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked } = event.target;
    if (name === 'admin') {
      setEmployeeFields({ ...employeeFields, admin: checked });
    } else {
      setEmployeeFields({ ...employeeFields, [name]: value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // TODO convert all the nested promises into a one

    // Password confirmation managment
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    async function returnsPromise(): Promise<UserCredential | undefined> {
      // Api call to create the auth user
      return await createAuthUserWithEmailAndPassword(email, password);
    }

    returnsPromise()
      .then((userCredential) => {
        if (userCredential === undefined) return;

        const { user: { uid } } = userCredential;

        async function returnsPromise(): Promise<void> {
          // Api call to create the user in the users collection
          await addUserApi(uid, { firstName, lastName, email, jobTitle, admin });
        }

        returnsPromise()
          .then(() => {

            async function returnsPromise(): Promise<EmployeeInterface> {
              // Api to retrive the new user from the users collection
              return await getUserApi(uid);
            }

            returnsPromise()
              .then((newEmployee) => {
                // Reducer to update the new user into the state manager
                dispatch(addEmployee(newEmployee));
                closeMethod();
              })
              .catch(error => console.log(error));

          })
          .catch(error => console.log(error));

      })
      .catch(error => {
        // Error managment
        if (error.code === 'auth/email-already-in-use') {
          alert('Cannot create user, email already in use');
        } else {
          console.log('user creation encountered an error', error);
        }
      });
  };

  return (
    <Container>
      <Title text='Add a new employee' align={'column'} />
      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          autoFocus
          margin='normal'
          required
          fullWidth
          id='firstName'
          name='firstName'
          label='First Name'
          onChange={handleChange}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='lastName'
          name='lastName'
          label='Last Name'
          onChange={handleChange}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='jobTitle'
          name='jobTitle'
          label='Job Title'
          onChange={handleChange}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          name='email'
          label='Email'
          type='email'
          onChange={handleChange}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='password'
          name='password'
          label='Password'
          type='password'
          onChange={handleChange}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='confirmPassword'
          name='confirmPassword'
          label='Confirm Password'
          type='password'
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
            endIcon={<PersonAddIcon />}
          >
            ADD
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

export default AddEmployees;

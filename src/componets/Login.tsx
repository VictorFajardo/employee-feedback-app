// React components
import React, { useState } from 'react';
// Api components
import { signInAuthUser } from '../utilities/firebase';
// Material components
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserCredential } from 'firebase/auth';

const defaultUserFields = {
  password: '',
  email: '',
};

function Login(): JSX.Element {
  const [userFields, setUserFields] = useState(defaultUserFields); // User detail values
  const { email, password } = userFields;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUserFields({ ...userFields, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    async function returnsPromise(): Promise<UserCredential | undefined> {
      return await signInAuthUser(email, password);
    }

    returnsPromise()
      .then()
      .catch(error => {
        switch (error.code) {
          case 'auth/wrong-password':
            alert('Incorrect password for email');
            break;
          case 'auth/user-not-found':
            alert('No user associated with this email');
            break;
          default:
            console.log(error);
        }
      });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
      <Typography component='h1' variant='h5'>
        Feedback App
      </Typography>
      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
          onChange={handleChange}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          onChange={handleChange}
        />
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} endIcon={<LoginIcon />}>
          Sign In
        </Button>
      </Box>
    </Box>
  );
}

export default Login;

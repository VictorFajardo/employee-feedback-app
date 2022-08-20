// React components
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// Redux components
import { useAppDispatch } from './hooks';
import { setCurrentUser } from './features/authentication/authenticationSlice';
import { cleanReviews } from './features/reviews/reviewsSlice';
import { cleanEmployees } from './features/employees/employeesSlice';
// Api components
import { onAuthStateChangedListener, getUserApi } from './utilities/firebase';
// Pages components
import Home from './componets/Home';
import Login from './componets/Login';
import Dashboard from './componets/Dashboard';
import EmployeeList from './componets/EmployeeList';
import ReviewList from './componets/ReviewsList';
// Material components
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Unsubscribe } from 'firebase/auth';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = createTheme();

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        // Api to retrive the new user from the users collection
        const data = await getUserApi(user.uid)
        // Reducer to set the user into the state manager
        dispatch(setCurrentUser(data));
        // Reducer to clean the reviews from the state manager
        dispatch(cleanReviews());
        // Reducer to clean the employees from the state manager
        dispatch(cleanEmployees());
        navigate('/dashboard');
        
      }
    });

    return unsubscribe;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container fixed component="main" maxWidth="lg">
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/' element={<Navigate replace to="login" />} />
            <Route path='login' element={<Login />} />
            <Route path='dashboard' element={<Dashboard />}>
              <Route path='/dashboard' element={<Navigate replace to="reviews" />} />
              <Route path='reviews' element={<ReviewList />} />
              <Route path='employees' element={<EmployeeList />} />
            </Route>
          </Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;


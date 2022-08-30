// React components
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// Redux components
import { useAppSelector, useAppDispatch } from '../hooks';
import { currentUser } from '../features/authentication/authenticationSlice';
import { setEmployees } from '../features/employees/employeesSlice';
import { setReviews } from '../features/reviews/reviewsSlice';
// Api components
import { getUsersApi, getReviewsApi } from '../utilities/firebase';
// Interface components
import { EmployeeInterface, ReviewInterface } from '../interfaces';
// Material components
import Header from './header/header';
import Menu from './menu/menu';
import Divider from '@mui/material/Divider';

const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser); // Select the current user to verify level access

  useEffect(() => {
    if (user === null || user.admin === null) return;

    async function getUsersMap(): Promise<EmployeeInterface[]> {
      // Api to retrive the users from the users collection
      return await getUsersApi();
    }

    getUsersMap()
      .then(data => {
        // Reducer to set users into the state manager
        dispatch(setEmployees(data));
      })
      .catch(error => console.log(error));
  }, [user]);

  useEffect(() => {
    if (user === null) return;

    async function getReviewsMap(): Promise<ReviewInterface[]> {
      // Api to retrive the users from the users collection
      return await getReviewsApi(user?.admin ?? false, user?.email ?? '');
    }

    getReviewsMap()
      .then(data => {
        // Reducer to set users into the state manager
        dispatch(setReviews(data));
      })
      .catch(error => console.log(error));
  }, [user]);

  return (
    <>
      <Header />
      <Menu />
      <Divider variant='middle' />
      <Outlet />
    </>
  );
};

export default Dashboard;

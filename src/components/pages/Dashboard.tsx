// React components
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// Redux components
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { currentUser } from '../../features/authentication/authenticationSlice';
import { setEmployees } from '../../features/employees/employeesSlice';
import { setReviews } from '../../features/reviews/reviewsSlice';
// Api components
import { getUsersApi, getReviewsApi } from '../../utilities/firebase';
// Material components
import Header from './header/header';
import Menu from './menu/menu';
import Divider from '@mui/material/Divider'

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser); // Select the current user to verify level access

  useEffect(() => {
    if (!user || !user.admin) return;

    async function getUsersMap (){
      // Api to retrive the users from the users collection
      const usersMap = await getUsersApi();
      // Reducer to set users into the state manager
      dispatch(setEmployees(usersMap));
    };
    
    getUsersMap();
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) return;

    async function getReviewsMap() {
      // Api to retrive the users from the users collection
      const reviewsMap = await getReviewsApi();
      // Reducer to set users into the state manager
      if (user?.admin) dispatch(setReviews(reviewsMap)); // Admin: All the reviews
      else dispatch(setReviews(reviewsMap.filter((review) => user?.reviews.includes(review.id)))); // User: Only his/her assigned reviews
    };

    getReviewsMap();
  }, [dispatch, user]);

  return (
    <>
      <Header />
      <Menu />
      <Divider variant="middle" />
      <Outlet />
    </>
  )
}

export default Dashboard

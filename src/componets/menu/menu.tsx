// React components
import { useNavigate } from "react-router-dom";
//Redux components
import { useAppSelector, useAppDispatch } from "../../hooks";
import { currentUser } from '../../features/authentication/authenticationSlice';
import { cleanReviews } from "../../features/reviews/reviewsSlice";
// Api components
import { signOutUser } from "../../utilities/firebase";
// Material components
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Menu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser); // Select the current user to verify level access
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>, target: string) => {
    if (target === 'signout') {
      // Api call to sign out
      signOutUser();
      // Reducer to delete all the reviews from the state manager
      dispatch(cleanReviews());
      navigate('/login');
    } else {
      navigate(target);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <Button value="reviews" onClick={(e) => handleClick(e, 'reviews')} sx={{ my: 2 }} variant="contained">Reviews List</Button>
        {user && user.admin && <Button value="employees" onClick={(e) => handleClick(e, 'employees')} sx={{ my: 2, ml: 2 }} variant="contained">Employees List</Button>}
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: 'row-reverse' }}>
        <Button value="signout" onClick={(e) => handleClick(e, 'signout')} sx={{ my: 2, ml: 2 }} variant="outlined">SIGN OUT</Button>
      </Box>
    </Container>
  )
}

export default Menu
// React components
import { useNavigate } from 'react-router-dom';
// Redux components
import { useAppSelector, useAppDispatch } from '../../hooks';
import { currentUser } from '../../features/authentication/authenticationSlice';
import { cleanReviews } from '../../features/reviews/reviewsSlice';
// Api components
import { signOutUser } from '../../utilities/firebase';
// Material components
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Menu(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser); // Select the current user to verify level access
  const navigate = useNavigate();

  const handleClick = (_event: React.MouseEvent<HTMLElement>, target: string): void => {
    if (target !== 'signout') {
      navigate(target);
      return;
    }

    async function returnsPromise(): Promise<void> {
      // Api call to sign out
      return await signOutUser();
    }

    returnsPromise()
      .then(() => {
        // Reducer to delete all the reviews from the state manager
        dispatch(cleanReviews());
        navigate('/login');
      })
      .catch(error => console.log(error));
  };

  return (
    <Container maxWidth='xl' sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Button
          onClick={e => handleClick(e, 'reviews')}
          sx={{ my: 2 }}
          variant='contained'
          startIcon={<FormatListBulletedIcon />}
        >
          Reviews List
        </Button>
        {(user?.admin ?? false) && (
          <Button
            onClick={e => handleClick(e, 'employees')}
            sx={{ my: 2, ml: 2 }}
            color='secondary'
            variant='contained'
            startIcon={<FormatListBulletedIcon />}
          >
            Employees List
          </Button>
        )}
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'row-reverse',
        }}
      >
        <Button
          onClick={e => handleClick(e, 'signout')}
          sx={{ my: 2, ml: 2 }}
          color='error'
          variant='contained'
          startIcon={<LogoutIcon />}
        >
          SIGN OUT
        </Button>
      </Box>
    </Container>
  );
}

export default Menu;

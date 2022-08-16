// React components
import { useState, Fragment } from 'react';
// Redux components
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectReviews, setCurrentReview } from '../../../features/reviews/reviewsSlice';
import { currentUser } from '../../../features/authentication/authenticationSlice';
// Chidren components
import AddReviews from './add.reviews';
import ViewReviews from './view.reviews';
import UpdateReviews from './update.reviews';
import Review from '../elements/review';
// Material components
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MainReviews = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser); // Select the current user to verify level access
  const reviews = useAppSelector(selectReviews); // Select all the reviews to build the review list
  const [open, setOpen] = useState(false); // Modal open status: true | false
  const [modal, setModal] = useState(''); // Modal content component: ADD | VIEW | UPDATE | DELETE //! improve this with a switch statement / enum

  const handleClose = () => setOpen(false);

  const handleClick = (modal, id) => {
    // If 'id' parameter esxist, update the current employee in the state manager
    if (id) {
      const currentReview = reviews.find(review => review.id === id);
      // Reducer to set the currentReview into the state manager
      dispatch(setCurrentReview(currentReview));
    }

    setModal(modal);
    setOpen(true);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modal === 'VIEW' && <ViewReviews closeMethod={handleClose} />}
          {modal === 'UPDATE' && <UpdateReviews closeMethod={handleClose} />}
          {modal === 'ADD' && <AddReviews closeMethod={handleClose} />}
        </Box>
      </Modal>
      <Container maxWidth="xl" sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  my: 2,
                  display: 'flex',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  alignItems: 'center',
                }}
                >
                  Reviews List
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: 'row-reverse' }}>
        {user && user.admin && <Button onClick={() => handleClick('ADD')} sx={{ my: 2, ml: 2, display: 'flex' }} variant="outlined">ADD REVIEW</Button>}
        </Box>
      </Container>
      <Container>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {reviews.map((review, index) => {
              return (
                <Fragment key={review.id}>
                  <Review user={review} clickMethod={handleClick} />
                  {index !== (reviews.length - 1) && <Divider key={index} variant="middle" component="li" />}
                </Fragment>
              )
            })}
        </List>
      </Container>
    </>
  )
}

export default MainReviews
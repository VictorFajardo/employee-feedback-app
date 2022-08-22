// React components
import React from 'react';
import { useState, Fragment } from 'react';
// Redux components
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectReviews, setCurrentReview } from '../features/reviews/reviewsSlice';
import { currentUser } from '../features/authentication/authenticationSlice';
// Chidren components
import Review from './elements/review';
// Material components
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
// Interface components
import { ModalType } from '../data';
import IndexReviews from './reviews/index.reviews';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ReviewsList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser); // Select the current user to verify level access
  const reviews = useAppSelector(selectReviews); // Select all the reviews to build the review list
  const [open, setOpen] = useState(false); // Modal open status: true | false
  const [modal, setModal] = React.useState<ModalType>(ModalType.VIEW); // Modal content component: ADD | VIEW | UPDATE | DELETE

  const handleClose = () => setOpen(false);

  const handleClick = (modal: ModalType, id?: string) => {
    // If 'id' parameter esxist, update the current employee in the state manager
    if (id) {
      const currentReview = reviews.find(review => review.id === id);
      // Reducer to set the currentReview into the state manager
      if (currentReview) dispatch(setCurrentReview(currentReview));
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
          <IndexReviews modal={modal} closeMethod={handleClose} clickMethod={handleClick} />
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
        {user && user.admin && <Button onClick={() => handleClick(ModalType.ADD)} sx={{ my: 2, ml: 2, display: 'flex' }} variant="outlined">ADD REVIEW</Button>}
        </Box>
      </Container>
      <Container>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {reviews.map((review, index) => {
              return (
                <Fragment key={review.id}>
                  <Review review={review} clickMethod={handleClick} />
                  {index !== (reviews.length - 1) && <Divider key={index} variant="middle" component="li" />}
                </Fragment>
              )
            })}
        </List>
      </Container>
    </>
  )
}

export default ReviewsList
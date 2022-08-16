// React components
import { useEffect, useState } from "react";
// Redux components
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { currentReview } from "../../../features/reviews/reviewsSlice";
import { updateReview } from "../../../features/reviews/reviewsSlice";
// Api components
import { updateReviewApi } from "../../../utilities/firebase";
// Material components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const defaultReviewFields = {
  id: '',
  employeeName: '',
  employeeJobTitle: '',
  employeeemail: '',
  content: '',
  reviewerName: '',
  reviewerJobTitle: '',
  revieweremail: '',
  completed: false,
};

const UpdateReviews = ( props ) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(currentReview); // Select the current review to display details
  const [reviewFields, setReviewFields] = useState(defaultReviewFields); // Review detail values
  const { id, employeeName, employeeJobTitle, employeeEmail, content, reviewerName, reviewerJobTitle, reviewerEmail } = reviewFields;
  const { closeMethod } = props;

  useEffect(() => {
    setReviewFields(current);
  },[current]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewFields({ ...reviewFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const completed = content.length ? true : false;

    try {
      // Api call to update the review in the reviews collection
      await updateReviewApi({ id, content, completed: completed })
      // Reducer to update the review into the state manager
      dispatch(updateReview({ ...reviewFields, completed: completed }));
      closeMethod();
    } catch (error) {
      // Error managment
      console.log('user update encountered an error', error);
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Update review details</h2>
        <h3>Review for {employeeName} | {employeeJobTitle} ({employeeEmail})</h3>
        <textarea name="content" cols="30" rows="10" value={content} onChange={handleChange} /><br />
        {/* {reviewBody}<br /> */}
        <br />
        <small>Assigned to: {reviewerName} | {reviewerJobTitle} ({reviewerEmail})</small>
        <br />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: 'center' }}>
          <Button type="submit" sx={{ my: 2, ml: 2, display: 'flex' }} variant="outlined">SAVE</Button> <Button value="signout" onClick={closeMethod} sx={{ my: 2, ml: 2, display: 'flex' }} variant="contained">CANCEL</Button>
        </Box>
      </form>
    </>
  )
}

export default UpdateReviews
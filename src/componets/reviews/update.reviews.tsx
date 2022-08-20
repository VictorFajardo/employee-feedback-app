// React components
import { useEffect, useState } from "react";
// Redux components
import { useAppSelector, useAppDispatch } from '../../hooks';
import { currentReview } from "../../features/reviews/reviewsSlice";
import { updateReview } from "../../features/reviews/reviewsSlice";
// Api components
import { updateReviewApi } from "../../utilities/firebase";
// Material components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// Interface components
import { DefaultReviewFields } from "../../data";

interface UpdateReviewsProps {
  closeMethod: () => void,
}

const UpdateReviews: React.FC<UpdateReviewsProps> = ({ closeMethod }) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(currentReview); // Select the current review to display details
  const [reviewFields, setReviewFields] = useState(DefaultReviewFields); // Review detail values
  const { id, employeeName, employeeJobTitle, employeeEmail, content, reviewerName, reviewerJobTitle, reviewerEmail } = reviewFields;

  useEffect(() => {
    setReviewFields(current);
  },[current]);


  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setReviewFields({ ...reviewFields, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const completed = content.length ? true : false;

    try {
      // Api call to update the review in the reviews collection
      await updateReviewApi(id, { content, completed: completed })
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
        <textarea name="content" cols={30} rows={10} value={content} onChange={handleChange} /><br />
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
// React components
import { useEffect, useState } from "react";
// Redux components
import { useAppSelector, useAppDispatch } from '../../hooks';
import { currentReview } from "../../features/reviews/reviewsSlice";
import { updateReview } from "../../features/reviews/reviewsSlice";
// Api components
import { updateReviewApi } from "../../utilities/firebase";
// Chidren components
import Title from "../elements/title";
// Material components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
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
    <Container>
    <Title text='View review details' align={'column'} />
    <Box sx={{ display: 'flex', mt: 1, '& > div': { flexGrow: 1 }}}>
      <TextField
        sx={{ mr: 2 }}
        margin="normal"
        id="employeeName"
        name="employeeName"
        label="Employee name"
        value={employeeName}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        margin="normal"
        id="reviewerName"
        name="reviewerName"
        label="Reviewer name"
        value={reviewerName}
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
    <Box sx={{ display: 'flex', '& > div': { flexGrow: 1 }}}>
      <TextField
        sx={{ mr: 2 }}
        margin="normal"
        id="employeeJobTitle"
        name="employeeJobTitle"
        label="Employee title"
        value={employeeJobTitle}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        margin="normal"
        id="reviewerJobTitle"
        name="reviewerJobTitle"
        label="Reviewer title"
        value={reviewerJobTitle}
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
    <Box sx={{ display: 'flex', '& > div': { flexGrow: 1 }}}>
      <TextField
        sx={{ mr: 2 }}
        margin="normal"
        id="employeeEmail"
        name="employeeEmail"
        label="Employee email"
        value={employeeEmail}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        margin="normal"
        id="reviewerEmail"
        name="reviewerEmail"
        label="Reviewer email"
        value={reviewerEmail}
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        multiline
        id="content"
        name="content"
        label="Content"
        value={content}
        onChange={handleChange}
      />
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: 'center' }}>
        <Button type="submit" sx={{ my: 2, ml: 2, display: 'flex' }} variant="outlined">SAVE</Button> <Button onClick={closeMethod} sx={{ my: 2, ml: 2, display: 'flex' }} variant="contained">CANCEL</Button>
      </Box>
    </Box>
  </Container>
  )
}

export default UpdateReviews
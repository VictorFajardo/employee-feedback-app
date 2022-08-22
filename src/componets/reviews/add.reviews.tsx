// React components
import { SyntheticEvent, useState } from "react";
// Redux components
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addReview } from "../../features/reviews/reviewsSlice";
import { selectEmployees, updateEmployee } from "../../features/employees/employeesSlice";
// Api components
import { createReviewApi, updateUserApi, getReviewApi } from "../../utilities/firebase";
// Chidren components
import Title from "../elements/title";
// Interface components
import { EmployeeInterface } from "../../interfaces";
// Material components
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";

interface AddReviewsProps {
  closeMethod: () => void,
}

const AddReviews: React.FC<AddReviewsProps> = ({ closeMethod }) => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(selectEmployees);
  const [employee, setEmployee] = useState<EmployeeInterface | null>(null);
  const [inputEmployee, setInputEmployee] = useState('');
  const [reviewer, setReviewer] = useState<EmployeeInterface | null>(null);
  const [inputReviewer, setInputReviewer] = useState('');

  const handleChangeEmployee = (event: SyntheticEvent<Element, Event>, newValue: EmployeeInterface | null) => setEmployee(newValue);

  const handleChangeReviewer = (event: SyntheticEvent<Element, Event>, newValue: EmployeeInterface | null) => setReviewer(newValue);
  
  const handleChangeInputEmployee = (event: SyntheticEvent<Element, Event>, newInputValue: string) => setInputEmployee(newInputValue);

  const handleChangeInputReviewer = (event: SyntheticEvent<Element, Event>, newInputValue: string) => setInputReviewer(newInputValue);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (employee && reviewer) {
        // Api call to create the review in the reviews collection
        const { id } = await createReviewApi(employee, reviewer);
        // Api to update the reviewer from the users collection
        const newReview = await getReviewApi(id);
        // Reducer to update the new user into the state manager
        dispatch(addReview(newReview));
        // Api to update the reviewer from the users collection
        await updateUserApi(reviewer.id, { reviews: [...reviewer.reviews, id] });
        // Reducer to update the new user into the state manager
        dispatch(updateEmployee({ ...reviewer, reviews: [...reviewer.reviews, id] }));
        closeMethod();
      }
    } catch (error: any) {
      // Error managment
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  return (
    <Container>
    <Title text='Add a new review' align={'column'} />
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Autocomplete
        sx={{ margin: '16px 0 8px' }}
        autoSelect={true}
        value={employee}
        onChange={handleChangeEmployee}
        inputValue={inputEmployee}
        onInputChange={handleChangeInputEmployee}
        options={employees}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => `${option.firstName} ${option.lastName} | ${option.jobTitle}`}
        renderInput={(params) => <TextField {...params} label="Select employee" required />}
      />
      <Autocomplete
        sx={{ margin: '16px 0 8px' }}
        value={reviewer}
        onChange={handleChangeReviewer}
        inputValue={inputReviewer}
        onInputChange={handleChangeInputReviewer}
        options={employees}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => `${option.firstName} ${option.lastName} | ${option.jobTitle}`}
        renderInput={(params) => <TextField {...params} label="Select reviewer" required />}
      />
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: 'center' }}>
        <Button type="submit" sx={{ my: 2, ml: 2, display: 'flex' }} color="info" variant="contained" endIcon={<PersonAddIcon />}>ADD</Button> <Button onClick={closeMethod} sx={{ my: 2, ml: 2, display: 'flex' }} color="error" variant="contained" endIcon={<CloseIcon />}>CANCEL</Button>
      </Box>
    </Box>
  </Container>
  )
}

export default AddReviews
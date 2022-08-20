// React components
import { useState } from "react";
// Redux components
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addReview } from "../../features/reviews/reviewsSlice";
import { selectEmployees, updateEmployee } from "../../features/employees/employeesSlice";
// Api components
import { createReviewApi, updateUserApi, getReviewApi } from "../../utilities/firebase";
// Material components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface AddReviewsProps {
  closeMethod: () => void,
}

const AddReviews: React.FC<AddReviewsProps> = ({ closeMethod }) => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(selectEmployees); // Select all the epmloyees to build the employee list

  //TODO Select the employee and the reviewer directly from the dropdown boxes
  const [employeeId, setEmployeeId] = useState('');
  const [reviewerId, setReviewerId] = useState('');

  const handleChangeEmployee = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //TODO Select the employee and the reviewer directly from the dropdown boxes
    setEmployeeId(event.target.value);
  };

  const handleChangeReviewer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //TODO Select the employee and the reviewer directly from the dropdown boxes
    setReviewerId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO Select the employee and the reviewer directly from the dropdown boxes
    const employee = employees.find((employee) => employee.id === employeeId);
    const reviewer = employees.find((employee) => employee.id === reviewerId);

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
    <>
      <h2>Add a new review</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">Employee </label>
        <select value={employeeId} onChange={handleChangeEmployee}>
          {!employeeId && <option value=''></option>}
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>{employee.lastName}, {employee.firstName}</option>
          ))}
        </select>
        <br />
        <label htmlFor="lastName">Reviewer </label>
        <select value={reviewerId} onChange={handleChangeReviewer}>
          {!reviewerId && <option value=''></option>}
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>{employee.lastName}, {employee.firstName}</option>
          ))}
        </select>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: 'center' }}>
          <Button type="submit" sx={{ my: 2, ml: 2, display: 'flex' }} variant="outlined">ADD</Button> <Button onClick={closeMethod} sx={{ my: 2, ml: 2, display: 'flex' }} variant="contained">CANCEL</Button>
        </Box>
      </form>
    </>
  )
}

export default AddReviews
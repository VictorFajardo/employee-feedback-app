/* eslint-disable @typescript-eslint/no-misused-promises */
// React components
import { SyntheticEvent, useState } from 'react';
// Redux components
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addReview } from '../../features/reviews/reviewsSlice';
import { selectEmployees, updateEmployee } from '../../features/employees/employeesSlice';
// Api components
import { createReviewApi, updateUserApi, getReviewApi } from '../../utilities/firebase';
// Chidren components
import Title from '../elements/title';
// Interface components
import { EmployeeInterface, ReviewInterface } from '../../interfaces';
// Material components
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface AddReviewsProps {
  closeMethod: () => void;
}

function AddReviews({ closeMethod }: AddReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(selectEmployees);
  const [employee, setEmployee] = useState<EmployeeInterface | null>(null);
  const [inputEmployee, setInputEmployee] = useState('');
  const [reviewer, setReviewer] = useState<EmployeeInterface | null>(null);
  const [inputReviewer, setInputReviewer] = useState('');

  const handleChangeEmployee = (_event: SyntheticEvent<Element, Event>, newValue: EmployeeInterface | null): void =>
    setEmployee(newValue);

  const handleChangeReviewer = (_event: SyntheticEvent<Element, Event>, newValue: EmployeeInterface | null): void =>
    setReviewer(newValue);

  const handleChangeInputEmployee = (_event: SyntheticEvent<Element, Event>, newInputValue: string): void =>
    setInputEmployee(newInputValue);

  const handleChangeInputReviewer = (_event: SyntheticEvent<Element, Event>, newInputValue: string): void =>
    setInputReviewer(newInputValue);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (employee === null || reviewer === null) return;

    async function returnsPromise(): Promise<string> {
      // Api call to create the review in the reviews collection
      return await createReviewApi(employee as EmployeeInterface, reviewer as EmployeeInterface);
    }

    returnsPromise()
      .then(id => {
        async function returnsPromise(): Promise<ReviewInterface> {
          // Api to update the review from the reviewss collection
          return await getReviewApi(id);
        }

        returnsPromise()
          .then(review => {
            // Reducer to update the new review into the state manager
            dispatch(addReview(review));

            async function returnsPromise(): Promise<void> {
              // Api to update the reviewer from the users collection
              return await updateUserApi(reviewer?.id ?? '', {
                reviews: [...(reviewer?.reviews ?? []), id],
              });
            }

            returnsPromise()
              .then(() => {
                // Reducer to update the new user into the state manager
                dispatch(
                  updateEmployee({
                    ...reviewer,
                    reviews: [...reviewer.reviews, id],
                  })
                );
                closeMethod();
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  return (
    <Container>
      <Title text='Add a new review' align={'column'} />
      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Autocomplete
          sx={{ margin: '16px 0 8px' }}
          autoSelect={true}
          value={employee}
          onChange={handleChangeEmployee}
          inputValue={inputEmployee}
          onInputChange={handleChangeInputEmployee}
          options={employees}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={option => `${option.firstName} ${option.lastName} | ${option.jobTitle}`}
          renderInput={params => <TextField {...params} label='Select employee' required />}
        />
        <Autocomplete
          sx={{ margin: '16px 0 8px' }}
          value={reviewer}
          onChange={handleChangeReviewer}
          inputValue={inputReviewer}
          onInputChange={handleChangeInputReviewer}
          options={employees}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={option => `${option.firstName} ${option.lastName} | ${option.jobTitle}`}
          renderInput={params => <TextField {...params} label='Select reviewer' required />}
        />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            type='submit'
            sx={{ my: 2, ml: 2, display: 'flex' }}
            color='info'
            variant='contained'
            endIcon={<PersonAddIcon />}
          >
            ADD
          </Button>{' '}
          <Button
            onClick={closeMethod}
            sx={{ my: 2, ml: 2, display: 'flex' }}
            color='error'
            variant='contained'
            endIcon={<CloseIcon />}
          >
            CANCEL
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddReviews;

// React components
import { useEffect, useState } from 'react';
// Redux components
import { useAppSelector } from '../../hooks';
import { currentReview } from '../../features/reviews/reviewsSlice';
// Children components
import Title from '../elements/title';
// Material components
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
// Interface components
import { DefaultReviewFields, ModalType } from '../../data';

interface ViewEmployeesProps {
  closeMethod: () => void;
  clickMethod: (modal: ModalType, id?: string) => void;
}

function ViewReview({ closeMethod, clickMethod }: ViewEmployeesProps): JSX.Element {
  const current = useAppSelector(currentReview); // Select the current review to display details
  const [reviewFields, setReviewFields] = useState(DefaultReviewFields); // Review detail values
  const {
    id,
    employeeName,
    employeeJobTitle,
    employeeEmail,
    content,
    reviewerName,
    reviewerJobTitle,
    reviewerEmail,
  } = reviewFields;

  useEffect(() => {
    setReviewFields(current);
  }, [current]);

  return (
    <Container>
      <Title text='View review details' align={'column'} />
      <Box sx={{ display: 'flex', mt: 1, '& > div': { flexGrow: 1 } }}>
        <TextField
          sx={{ mr: 2 }}
          margin='normal'
          id='employeeName'
          name='employeeName'
          label='Employee name'
          value={employeeName}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin='normal'
          id='reviewerName'
          name='reviewerName'
          label='Reviewer name'
          value={reviewerName}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', '& > div': { flexGrow: 1 } }}>
        <TextField
          sx={{ mr: 2 }}
          margin='normal'
          id='employeeJobTitle'
          name='employeeJobTitle'
          label='Employee title'
          value={employeeJobTitle}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin='normal'
          id='reviewerJobTitle'
          name='reviewerJobTitle'
          label='Reviewer title'
          value={reviewerJobTitle}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', '& > div': { flexGrow: 1 } }}>
        <TextField
          sx={{ mr: 2 }}
          margin='normal'
          id='employeeEmail'
          name='employeeEmail'
          label='Employee email'
          value={employeeEmail}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin='normal'
          id='reviewerEmail'
          name='reviewerEmail'
          label='Reviewer email'
          value={reviewerEmail}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      <Box>
        <TextField
          margin='normal'
          fullWidth
          multiline
          id='content'
          name='content'
          label='Content'
          value={content}
          InputProps={{
            readOnly: true,
          }}
        />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={() => clickMethod(ModalType.UPDATE, id)}
            sx={{ my: 2, ml: 2, display: 'flex' }}
            color='info'
            variant='contained'
            endIcon={<EditIcon />}
          >
            UPDATE
          </Button>{' '}
          <Button
            onClick={closeMethod}
            sx={{ my: 2, ml: 2, display: 'flex' }}
            color='error'
            variant='contained'
            endIcon={<CloseIcon />}
          >
            CLOSE
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ViewReview;

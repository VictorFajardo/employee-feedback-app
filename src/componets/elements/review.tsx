// Material components
import ReviewsIcon from '@mui/icons-material/Reviews';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// Element components
import { ReviewInterface } from '../../interfaces/index';
import { ModalType } from '../../data';

interface ReviewProps {
  review: ReviewInterface;
  clickMethod: (modal: ModalType, id: string) => void;
}

function Review({ review, clickMethod }: ReviewProps): JSX.Element {
  const { id, employeeName, employeeJobTitle, employeeEmail, reviewerName, reviewerJobTitle, completed } = review;

  return (
    <>
      <ListItem alignItems='center'>
        <ListItemAvatar>
          <Avatar
            sx={{
              backgroundColor: completed ? '#66bb6a' : '#f44336',
            }}
            variant='rounded'
          >
            <ReviewsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`Review for ${employeeName} - ${employeeJobTitle} (${employeeEmail})`}
          secondary={`Assigned to ${reviewerName} - ${reviewerJobTitle} [status: ${
            completed ? 'completed' : 'pending'
          }]`}
        />
        <Button
          sx={{ mr: 2 }}
          onClick={() => clickMethod(ModalType.UPDATE, id)}
          variant='outlined'
          endIcon={<EditIcon />}
        >
          UPDATE
        </Button>
        <Button onClick={() => clickMethod(ModalType.VIEW, id)} variant='outlined' endIcon={<VisibilityIcon />}>
          VIEW
        </Button>
      </ListItem>
    </>
  );
}

export default Review;

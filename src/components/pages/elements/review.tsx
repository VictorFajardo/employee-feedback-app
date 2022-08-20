// Material components
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import { stringAvatar } from '../../../utilities/stringavatar';
// Element components
import { ModalType, ReviewInterface } from '../../../interfaces/index';

interface ReviewProps {
  review: ReviewInterface,
  clickMethod: (modal: ModalType, id: string) => void,
}

const Review: React.FC<ReviewProps> = ({ review, clickMethod }) => {
  const { id, employeeName, employeeJobTitle, employeeEmail, reviewerName, reviewerJobTitle, completed } = review;

  return (
    <>
    <ListItem alignItems="center">
      {/* <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'red' }} children='' />
      </ListItemAvatar> */}
      <ListItemText
        primary={`Review for ${employeeName} - ${employeeJobTitle} (${employeeEmail})`}
        secondary={`Assigned to ${reviewerName} - ${reviewerJobTitle} [status: ${completed ? 'completed' : 'pending'}]`}
      />
      <Button onClick={() => clickMethod(ModalType.UPDATE, id)}>UPDATE</Button>
      <Button onClick={() => clickMethod(ModalType.VIEW, id)}>VIEW</Button>
    </ListItem>
    </>
  )
}

export default Review
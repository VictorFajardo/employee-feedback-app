import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { stringAvatar } from '../../../utilities/stringavatar';

const Review = ({ user, clickMethod }) => {
  const { id, employeeName, employeeJobTitle, employeeEmail, reviewerName, reviewerJobTitle, completed } = user;

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
      <Button onClick={() => clickMethod('UPDATE', id)}>EDIT</Button>
      <Button onClick={() => clickMethod('VIEW', id)}>VIEW</Button>
    </ListItem>
    </>
  )
}

export default Review
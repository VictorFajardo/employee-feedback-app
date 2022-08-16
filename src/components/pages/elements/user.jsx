import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { stringAvatar } from '../../../utilities/stringavatar';

const User = ({ user, clickMethod }) => {
  const { id, firstName, lastName, jobTitle, email } = user;

  return (
    <ListItem alignItems="center">
      <ListItemAvatar>
        <Avatar {...stringAvatar(`${firstName} ${lastName}`)} />
      </ListItemAvatar>
      <ListItemText
        primary={`${firstName} ${lastName} - ${jobTitle}`}
        secondary={email}
      />
      <Button onClick={() => clickMethod('UPDATE', id)}>UPDATE</Button>
      <Button onClick={() => clickMethod('VIEW', id)}>VIEW</Button>
    </ListItem>
  )
}

export default User
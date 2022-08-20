// Material components
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { stringAvatar } from '../../utilities/stringavatar';
// Element components
import { EmployeeInterface } from '../../interfaces/index';
import { ModalType } from '../../data';

interface EmployeeProps {
  employee: EmployeeInterface,
  clickMethod: (modal: ModalType, id: string) => void,
}

const Employee: React.FC<EmployeeProps> = ({ employee, clickMethod }) => {
  const { id, firstName, lastName, jobTitle, email } = employee;

  return (
    <ListItem alignItems="center">
      <ListItemAvatar>
        <Avatar {...stringAvatar(`${firstName} ${lastName}`)} />
      </ListItemAvatar>
      <ListItemText
        primary={`${firstName} ${lastName} - ${jobTitle}`}
        secondary={email}
      />
      <Button onClick={() => clickMethod(ModalType.UPDATE, id)}>UPDATE</Button>
      <Button onClick={() => clickMethod(ModalType.VIEW, id)}>VIEW</Button>
    </ListItem>
  )
}

export default Employee
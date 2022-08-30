// Material components
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
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
  employee: EmployeeInterface;
  clickMethod: (modal: ModalType, id: string) => void;
}

function Employee({ employee, clickMethod }: EmployeeProps): JSX.Element {
  const { id, firstName, lastName, jobTitle, email } = employee;

  return (
    <ListItem alignItems='center'>
      <ListItemAvatar>
        <Avatar {...stringAvatar(`${firstName} ${lastName}`)} />
      </ListItemAvatar>
      <ListItemText primary={`${firstName} ${lastName} - ${jobTitle}`} secondary={email} />
      <Button
        sx={{ mr: 2 }}
        onClick={() => clickMethod(ModalType.UPDATE, id)}
        color='secondary'
        variant='outlined'
        endIcon={<EditIcon />}
      >
        UPDATE
      </Button>
      <Button
        onClick={() => clickMethod(ModalType.VIEW, id)}
        color='secondary'
        variant='outlined'
        endIcon={<VisibilityIcon />}
      >
        VIEW
      </Button>
    </ListItem>
  );
}

export default Employee;

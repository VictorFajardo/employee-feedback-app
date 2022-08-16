// React components
import { useState, Fragment } from 'react';
// Redux components
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectEmployees, setCurrentEmployee } from "../../../features/employees/employeesSlice";
// Chidren components
import AddEmployees from './add.employees';
import ViewEmployees from './view.employees';
import UpdateEmployees from './update.employees';
import User from '../elements/user';
// Material components
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MainEmployees = () => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(selectEmployees); // Select all the epmloyees to build the employee list
  const [open, setOpen] = useState(false); // Modal open status: true | false
  const [modal, setModal] = useState(''); // Modal content component: ADD | VIEW | UPDATE | DELETE //! improve this with a switch statement / enum

  const handleClose = () => setOpen(false);

  const handleClick = (modal, id) => {
    // If 'id' parameter esxist, update currentEmployee in the state manager
    if (id) {
      const currentEmployee = employees.find(user => user.id === id);
      // Reducer to set the currentEmployee into the state manager
      dispatch(setCurrentEmployee(currentEmployee));
    }

    setModal(modal);
    setOpen(true);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modal === 'VIEW' && <ViewEmployees closeMethod={handleClose} />}
          {modal === 'UPDATE' && <UpdateEmployees closeMethod={handleClose} />}
          {modal === 'ADD' && <AddEmployees closeMethod={handleClose} />}
        </Box>
      </Modal>
      <Container maxWidth="xl" sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: 'flex',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  alignItems: 'center',
                }}
                >
                  Employees List
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: 'row-reverse' }}>
          <Button value="signout" onClick={() => handleClick('ADD')} sx={{ my: 2, ml: 2, display: 'flex' }} variant="outlined">ADD EMPLOYEE</Button>
        </Box>
      </Container>
      <Container>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {employees.map((employee, index) => {
              return (
                <Fragment key={employee.id}>
                  <User user={employee} clickMethod={handleClick} />
                  {index !== (employees.length - 1) && <Divider variant="middle" component="li" />}
                </Fragment>
              )
            })}
        </List>
      </Container>
    </>
  )
}

export default MainEmployees
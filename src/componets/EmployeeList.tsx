// React components
import { useState, Fragment } from 'react';
// Redux components
import { useAppSelector, useAppDispatch } from '../hooks';
import {
  selectEmployees,
  setCurrentEmployee,
} from '../features/employees/employeesSlice';
// Chidren components
import IndexEmployees from './employees/index.employees';
import Employee from './elements/employee';
import Title from './elements/title';
// Material components
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import React from 'react';
// Interface components
import { ModalType } from '../data';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EmployeeList = () => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(selectEmployees); // Select all the epmloyees to build the employee list
  const [open, setOpen] = useState(false); // Modal open status: true | false
  const [modal, setModal] = React.useState<ModalType>(ModalType.VIEW); // Modal content component: ADD | VIEW | UPDATE | DELETE

  const handleClose = () => setOpen(false);

  const handleClick = (modal: ModalType, id?: string): void => {
    // If 'id' parameter esxist, update currentEmployee in the state manager
    if (id) {
      const currentEmployee = employees.find((employee) => employee.id === id);
      // Reducer to set the currentEmployee into the state manager
      if (currentEmployee) dispatch(setCurrentEmployee(currentEmployee));
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
          {}
          <IndexEmployees
            modal={modal}
            closeMethod={handleClose}
            clickMethod={handleClick}
          />
        </Box>
      </Modal>
      <Container maxWidth="xl" sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Title text="Employees List" />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
        >
          <Button
            onClick={() => handleClick(ModalType.ADD)}
            sx={{ my: 2, ml: 2, display: 'flex' }}
            color="secondary"
            variant="outlined"
            startIcon={<PersonAddIcon />}
          >
            ADD EMPLOYEE
          </Button>
        </Box>
      </Container>
      <Container>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {employees.map((employee, index) => {
            return (
              <Fragment key={employee.id}>
                <Employee employee={employee} clickMethod={handleClick} />
                {index !== employees.length - 1 && (
                  <Divider variant="middle" component="li" />
                )}
              </Fragment>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default EmployeeList;

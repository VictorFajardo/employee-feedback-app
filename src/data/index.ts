import { EmployeeInterface, ReviewInterface } from '../interfaces';

export const DefaultEmployeeFields: EmployeeInterface = {
  id: '',
  createdAt: '',
  firstName: '',
  lastName: '',
  jobTitle: '',
  email: '',
  password: '',
  confirmPassword: '',
  admin: false,
  reviews: [],
};

export const DefaultReviewFields: ReviewInterface = {
  id: '',
  createdAt: '',
  employeeName: '',
  employeeJobTitle: '',
  employeeEmail: '',
  reviewerName: '',
  reviewerJobTitle: '',
  reviewerEmail: '',
  content: '',
  completed: false,
};

export enum ModalType {
  VIEW,
  UPDATE,
  ADD,
  DELETE,
}

export const ModalStyle = {
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

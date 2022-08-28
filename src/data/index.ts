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

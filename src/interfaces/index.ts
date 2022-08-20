export interface EmployeeInterface {
  id: string,
  createdAt: string,
  firstName: string,
  lastName: string,
  jobTitle: string,
  email: string,
  password: string,
  confirmPassword: string,
  admin: boolean,
  reviews: string[],
}

export interface ReviewInterface {
  id: string,
  createdAt: string,
  employeeName: string,
  employeeJobTitle: string,
  employeeEmail: string,
  reviewerName: string,
  reviewerJobTitle: string,
  reviewerEmail: string,
  content: string,
  completed: boolean,
}

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
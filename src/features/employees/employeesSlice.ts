import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { EmployeeInterface, DefaultEmployeeFields } from '../../interfaces';

export interface EmployeeState {
  data: EmployeeInterface[],
  current: EmployeeInterface,
}

const initialState: EmployeeState = {
  data: [],
  current: DefaultEmployeeFields,
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<EmployeeInterface[]>) => {
      state.data = [...action.payload];
    },
    setCurrentEmployee: (state, action: PayloadAction<EmployeeInterface>) => {
      state.current = action.payload;
    },
    cleanEmployees: (state) => {
      state.data = [];
    },
    addEmployee: (state, action: PayloadAction<EmployeeInterface>) => {
      state.data = [...state.data, action.payload];
    },
    updateEmployee: (state, action: PayloadAction<EmployeeInterface>) => {
      state.data = [...state.data.filter(user => user.id !== action.payload.id), action.payload];
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.data = [...state.data.filter(user => user.id !== action.payload)];
    },
  },
});

export const { setCurrentEmployee, setEmployees, cleanEmployees, addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;

export const selectEmployees = (state: RootState) => state.employees.data;
export const currentEmployee = (state: RootState) => state.employees.current;

export default employeesSlice.reducer;

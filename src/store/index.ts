import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import employeesSlice from '../features/employees/employeesSlice';
import reviewsSlice from '../features/reviews/reviewsSlice';
import authenticationSlice from '../features/authentication/authenticationSlice';

export const store = configureStore({
  reducer: {
    employees: employeesSlice,
    reviews: reviewsSlice,
    authentication: authenticationSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

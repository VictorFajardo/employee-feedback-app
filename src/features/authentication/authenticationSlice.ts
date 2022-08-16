import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { UserInterface } from '../../interfaces';

export interface AuthenticationState {
  user: UserInterface | null,
}

const initialState: AuthenticationState = {
  user: null,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserInterface>) => {
      state.user = action.payload;
    }
  },
});

export const { setCurrentUser } = authenticationSlice.actions;

export const currentUser = (state: RootState) => state.authentication.user;

export default authenticationSlice.reducer;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/users/userSlice'
import departmentReducer from '../features/department/departmentSlice'
import memberReducer from '../features/members/membersSlice'

export const store = configureStore({
  reducer: {
    auth : authReducer,
    users : userReducer,
    departments : departmentReducer,
    members : memberReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

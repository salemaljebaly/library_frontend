import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/users/userSlice'
import departmentReducer from '../features/department/departmentSlice'

export const store = configureStore({
  reducer: {
    auth : authReducer,
    users : userReducer,
    departments : departmentReducer,
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

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    getuser:(state)=>{
        return state.user;
    }
  },
});

export const { login, logout, getuser } = userSlice.actions;

export default userSlice.reducer;
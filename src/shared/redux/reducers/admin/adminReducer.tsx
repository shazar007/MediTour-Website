import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  user: null,
};

export const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = adminReducer.actions;

export default adminReducer.reducer;

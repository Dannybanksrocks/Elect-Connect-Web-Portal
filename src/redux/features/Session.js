import { createSlice } from "@reduxjs/toolkit";

const reducer = createSlice({
  name: "session",
  initialState: null,
  reducers: {
    sessionInit: (_, action) => {
      return action.payload;
    },
    sessionEnd: () => {
      return null;
    },
  },
});

export default reducer.reducer;
export const { sessionInit, sessionEnd } = reducer.actions;

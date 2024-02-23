import { createSlice } from "@reduxjs/toolkit";

const emailState = {
  sentMail: [],
  count: 0,
};

export const MailSlice = createSlice({
  name: "EMAIL",
  initialState: emailState,
  reducers: {
    receivedMail: (state, action) => {
      if (!state.sentMail) {
        state.sentMail = [];
      }
      state.sentMail.push(action.payload);
    },
    replaceMail: (state, action) => {
      state.sentMail = action.payload;
    },
    changeBlueTickStatus: (state, action) => {
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.sentMail.find((item) => item.id === newItem);
      existingItem.blueTick = false;
    },
    increaseCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const {
  receivedMail,
  replaceMail,
  changeBlueTickStatus,
  increaseCount,
  decreaseCount,
} = MailSlice.actions;
export default MailSlice.reducer;

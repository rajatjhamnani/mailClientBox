import { createSlice } from "@reduxjs/toolkit";

const emailState = {
  sentMail: [],
  count: 0,
  to: "",
  newCount: 0,
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
      state.to = action.payload.to;
    },

    replaceMail: (state, action) => {
      state.sentMail = action.payload;
    },
    deleteEmail: (state, action) => {
      const id = action.payload;
      state.sentMail = state.sentMail.filter((item) => item.id !== id);
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
    increaseNewCount: (state, action) => {
      state.newCount = action.payload;
    },
  },
});

export const {
  inboxData,
  receivedMail,
  replaceMail,
  changeBlueTickStatus,
  increaseCount,
  decreaseCount,
  deleteEmail,
  sentEmails,
  increaseNewCount,
} = MailSlice.actions;
export default MailSlice.reducer;

import { replaceMail } from "./MailSlice";

export const fetchMailData = (newEmail) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://mail-client-box-70bff-default-rtdb.firebaseio.com/${newEmail}.json`
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      // ;
      return data;
    };
    try {
      const getData = await fetchData();
      console.log(getData);
      dispatch(replaceMail(getData));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const mailData = (data, sendTo) => {
  return async (dispatch) => {
    const Email = localStorage.getItem("email");
    const newEmail = Email.replace(/[^\w\s]/gi, "");
    const sendRequest = async () => {
      const response = await fetch(
        `https://mail-client-box-70bff-default-rtdb.firebaseio.com/${newEmail}.json`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const sentData = await response.json();

      return sentData;
    };
    try {
      const res = await sendRequest();
      console.log(res);
    } catch (error) {
      throw new Error("something went wrong");
    }
  };
};

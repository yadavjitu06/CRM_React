import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../confiq/axiosInstance";
import toast from "react-hot-toast";
const initialState = {
  ticketList: [],
};

export const getAllTicketsforTheUser = createAsyncThunk(
  "tickets/getAllTicketsforTheUser",
  async () => {
    try {
      const responce = axiosInstance.get("getMyAssignedTickets", {
        headers: { "x-access-token": localStorage.getItem("token") },
      });
      toast.promise(responce, {
        success: "successfully  loaded  all  the tickets",
        loading: "fetching all the tickets belonging  to you ",
        error: "something went wrong ",
      });

      return await responce;
    } catch (error) {
      console.log(error);
    }
  }
);
const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTicketsforTheUser.fulfilled, (state, action) => {
      if(!action?.payload?.data?.result)return
      state.ticketList = action?.payload?.data?.result;
    });
  },
});
export default ticketSlice.reducer;

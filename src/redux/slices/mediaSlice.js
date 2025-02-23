// redux/slices/mediaSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  media: [],
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    addMedia: (state, action) => {
      state.media.push(action.payload);
    },
    setMedia: (state, action) => {
      state.media = action.payload;
    },
  },
});

export const { addMedia, setMedia } = mediaSlice.actions;
export default mediaSlice.reducer;
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial State
const initialState = {
  loading: false,
  video: {},
  error: "",
};

const fetchVideo = createAsyncThunk("videos/fetchVideo", async () => {
  const response = await fetch("http://localhost:9000/videos");

  const video = await response.json();

  return video;
});

const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideo.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.video = action.payload;
    });
    builder.addCase(fetchVideo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.video = {};
    });
  },
});


module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;

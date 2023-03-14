const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");


function transformNumbers(x) {
  parsed = parseFloat(x);
  return x.endsWith("k") ? parsed * 1000 : parsed;
}
// initial State
const initialState = {
  loading: false,
  relatedVideo: [],
  error: "",
};

const fetchRelatedVideo = createAsyncThunk("videos/fetchRelatedVideo", async (item) => {
  let queryString =
        item?.length > 0
            ? item.map((tag) => `tags_like=${tag}`).join("&") 
            : null;
    const response = await fetch(
      `http://localhost:9000/videos?${queryString}`
    );

    const relatedVideo = await response.json();
    
    return relatedVideo?.sort((a, b)=> Number(transformNumbers(b.views))- Number(transformNumbers(a.views)));
  }
);

const relatedVideoSlice = createSlice({
  name: "relatedVideo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedVideo.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchRelatedVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.relatedVideo = action.payload;
    });
    builder.addCase(fetchRelatedVideo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.relatedVideo = {};
    });
  },
});

module.exports = relatedVideoSlice.reducer;
module.exports.fetchRelatedVideo = fetchRelatedVideo;

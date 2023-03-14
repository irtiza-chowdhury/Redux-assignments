const { configureStore } = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger");
const videoReducer = require("../features/videos/videoSlice");
const relatedVideoReducer = require("../features/relatedVideo/relatedVideoSlice");

const logger = createLogger();

const store = configureStore({
  reducer: {
    video: videoReducer,
    relatedVideo: relatedVideoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;

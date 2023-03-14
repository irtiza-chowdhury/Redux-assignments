const { getState } = require("./app/store");
const store = require("./app/store");
const {fetchRelatedVideo} = require("./features/relatedVideo/relatedVideoSlice");
const { fetchVideo } = require("./features/videos/videoSlice");


require('util').inspect.defaultOptions.depth = null;

const combineFunction = async () => {
  await store.dispatch(fetchVideo());
  const { video } = getState();

  await store.dispatch(fetchRelatedVideo(video.tags))
  
};

combineFunction();

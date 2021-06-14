import Video from '../models/video';

var VideoCollection = Backbone.Collection.extend({
  model: Video,
});

export default VideoCollection;

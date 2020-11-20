import Speaker from '../models/speaker';

var SpeakerCollection = Backbone.Collection.extend({
  model: Speaker,
});

export default SpeakerCollection;

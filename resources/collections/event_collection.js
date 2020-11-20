import Event from '../models/event';

var EventCollection = Backbone.Collection.extend({
  model: Event,
});

export default EventCollection;

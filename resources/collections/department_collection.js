import Deparment from '../models/department';

var DeparmentCollection = Backbone.Collection.extend({
  model: Deparment,
});

export default DeparmentCollection;

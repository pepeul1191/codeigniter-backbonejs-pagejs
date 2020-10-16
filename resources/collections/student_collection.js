import Student from '../models/student';

var StudentCollection = Backbone.Collection.extend({
  model: Student,
});

export default StudentCollection;

import Document from '../models/document';

var DocumentCollection = Backbone.Collection.extend({
  model: Document,
});

export default DocumentCollection;

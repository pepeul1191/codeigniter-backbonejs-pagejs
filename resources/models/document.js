var Document = Backbone.Model.extend({
  initialize : function() {
    this.id = null;
    this.name = null;
    this.description = null;
    this.url = null;
    this.upload_path = null;
  }
});

export default Document;
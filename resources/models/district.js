var District = Backbone.Model.extend({
  initialize : function() {
    this.id = null;
    this.name = null;
    this.province_id = null;
  }
});

export default District;
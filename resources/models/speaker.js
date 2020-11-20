var Speaker = Backbone.Model.extend({
  initialize : function() {
    this.id = null;
    this.dni = null;
    this.code = null;
    this.tuition = null;
    this.names = null;
    this.last_names = null;
    this.email = null;
    this.phone = null;
    this.picture_url = null;
    this.resume = null;
    this.gender_id = null;
  }
});

export default Speaker;
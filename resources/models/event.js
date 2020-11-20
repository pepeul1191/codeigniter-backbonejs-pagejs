var Event = Backbone.Model.extend({
  initialize : function() {
    this.id = null;
    this.hours = null;
    this.name = null;
    this.picture_url = null;
    this.init_date = null;
    this.init_hour = null;
    this.gift = null;
    this.event_type_id = null;
    this.description = null;
    this.code = null;
  }
});

export default Event;
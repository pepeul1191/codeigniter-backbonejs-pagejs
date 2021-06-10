import Table from '../../libs/table';
import DepartmentCollection from '../../collections/department_collection';
import Department from '../../models/department';

var ModalEventVideoView = Backbone.View.extend({
  el: '#workspace',
  branch_id: null,
  modalId: '#modal',
	initialize: function(){
	},
	events: {
    // TODO
  },
  render: function(data, type){
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/modal_event_video.html',
		  type: 'GET',
		  async: false,
		  success: function(resource) {
        var template = _.template(resource);
        templateCompiled = template(data);
      },
      error: function(xhr, status, error){
        console.error(error);
				console.log(JSON.parse(xhr.responseText));
      }
    });
    var _this = this;
    $(_this.modalId).html(templateCompiled);
    $(_this.modalId).modal('toggle');
  },
  loadComponents: function(){
    
  },
});

export default ModalEventVideoView;
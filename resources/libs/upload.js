var Upload = Backbone.View.extend({
  // attributes
  el: '#byDefine',
  url: null,
  path: null,
  inputFile: null, // String
  helpText: null,
  buttonChoose: null, // String
  buttonUpload: null, // String
  img: null, // String
  service: {
    url: null, // String
    formDataKey: null, // String
    uploadMessage: null,// String
    erroMessage: null,// String
    successMessage: null,
  },
  id: null,
  name: null,
  extensions: {
    allow: [],
    message: 'Formato no válido',
  },
  size: {
    allow: 0, // bytes
    message: 'Archivo supera el máximo permitido',
  },
  statusClasses: { // bootstrap classes by default
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  },
  // constructor
	initialize: function(params){
    this.el = params.el;
    this.inputFile = params.inputFile;
    this.helpText = params.helpText;
    this.inputHelp = params.inputHelp;
    this.buttonChoose = params.buttonChoose;
    this.buttonUpload = params.buttonUpload;
    this.img = params.img;
    this.service = params.service;
    this.extensions = params.extensions;
    this.size = params.size;
    this.statusClasses = params.statusClasses;
    // dynamic allocation of events
    this.events = this.events || {};
    this.events['click #' + this.buttonChoose] = 'choose';
    this.events['click #' + this.buttonUpload] = 'upload';
    this.delegateEvents();
  },
  // events
  events: {
    'click .hint': 'hintClick',
  },
  // methods
  choose: function(event) {
    $('#' + this.inputFile).click();
  },
  upload: function(event){
    var file = $('#' + this.inputFile)[0].files[0];
    if(!_.contains(this.extensions.allow, file.type)){
      $('#' + this.helpText).removeClass(this.statusClasses.success);
      $('#' + this.helpText).removeClass(this.statusClasses.warning);
      $('#' + this.helpText).addClass(this.statusClasses.danger);
      $('#' + this.helpText).html(this.extensions.message);
    }else{
      if(file.size > this.size.allow){
        $('#' + this.helpText).removeClass(this.statusClasses.success);
        $('#' + this.helpText).removeClass(this.statusClasses.warning);
        $('#' + this.helpText).addClass(this.statusClasses.danger);
        $('#' + this.helpText).html(this.size.message);
      }else{
        var formData = new FormData();
        formData.append(this.service.formDataKey, file);
        var _this = this;
        $.ajax({
          url: _this.service.url,
          type: 'POST',
          data: formData,
		      contentType: false,
		      processData: false,
          headers: {
            [CSRF_KEY]: CSRF,
          },
          async: false,
          beforeSend: function() {
            $('#' + _this.buttonUpload).attr('disabled', 'true');
            $('#' + _this.helpText).removeClass(_this.statusClasses.success);
            $('#' + _this.helpText).removeClass(_this.statusClasses.danger);
            $('#' + _this.helpText).addClass(_this.statusClasses.warning);
						$('#' + _this.helpText).html(_this.service.uploadMessage);
					},
          success: function(data) {
            $('#' + _this.buttonUpload).removeAttr('disabled');
            $('#' + _this.helpText).removeClass(_this.statusClasses.danger);
            $('#' + _this.helpText).removeClass(_this.statusClasses.warning);
            $('#' + _this.helpText).addClass(_this.statusClasses.success);
            $('#' + _this.helpText).html(_this.service.successMessage);
            var resp = JSON.parse(data);
            _this.url = resp.url;
            _this.path = resp.path;
            _this.showImg();
          },
          error: function(xhr, status, error){
            console.error(error);
            console.log(xhr.responseText);
            $('#' + _this.buttonUpload).removeAttr('disabled');
            $('#' + _this.helpText).removeClass(_this.statusClasses.success);
            $('#' + _this.helpText).removeClass(_this.statusClasses.warning);
            $('#' + _this.helpText).addClass(_this.statusClasses.danger);
						$('#' + _this.helpText).html(_this.service.errorMessage);
          }
        });
      }
    }
  },
  showImg: function(){
    if(this.img != null){
      var url = this.url + this.path;
      $('#' + this.img).attr('src', url);
    }
  },
});

export default Upload;
var ValidationForm = Backbone.View.extend({
  // attributes
  el: '#byDefine',
  entries: [
    {
      id: null,
      help: null,
      validations: [
        {
          type: null, // notEmpty, isEmail, customFunction, isSelected
          message: null,
        }, 
      ],
    },
  ],
  classes: {
    textError: null,
    textSuccess: null,
    inputInvalid: null,
  },
  messageForm: null,
  result: false,
  isOk: true,
  // constructor
  initialize: function(params){
    this.el = params.el;
    this.entries = params.entries;
    this.classes = params.classes;
    this.messageForm = params.messageForm;
  },
  // events
  events: {
    'click .hint': 'hintClick',
  },
  // methods
  check: function(event) {
    this.isOk = true;
    var _this = this;
    // define isOk
    this.entries.forEach(function(entry) {

      var lastEntryIsOk = null;
      entry.validations.forEach(function(validation){
        try {
          if(lastEntryIsOk == null || lastEntryIsOk == true){
            var isOk = _this[validation.type](entry, validation);
            if(entry.isOk != false || isOk == true){
              entry.isOk = isOk;
            }
            lastEntryIsOk = isOk;
          }
        } catch (e) {
          if (e instanceof TypeError){
            _this.isOk = false;
            $('#' +_this.messageForm).addClass(_this.classes.textDanger);
            $('#' +_this.messageForm).removeClass(_this.classes.textWarning);
            $('#' +_this.messageForm).removeClass(_this.classes.textSuccess);
            $('#' +_this.messageForm).html('Validación no existente');
          }
        }
      });
    });
    // check if isOk == true
    if (this.isOk == true){ // not entered to try catch
      var _this = this;
      _this.isOk = true;
      this.entries.forEach(function(entry){
        if(entry.isOk == false){
          _this.isOk = false;
        }
      });
    }
  },
  // validation methods
  notEmpty: function(entry, validation){
    var isOk = false;
    if($('#' + entry.id).val() == ''){
      $('#' + entry.help).html(validation.message);
      $('#' + entry.help).removeClass(this.classes.textSuccess);
      $('#' + entry.help).removeClass(this.classes.textWarning);
      $('#' + entry.help).addClass(this.classes.textDanger);
      $('#' + entry.id).addClass(this.classes.inputInvalid);
    }else{
      $('#' + entry.help).html('');
      $('#' + entry.help).removeClass(this.classes.textDanger);
      $('#' + entry.id).removeClass(this.classes.inputInvalid);
      isOk = true;
    }
    return isOk;
  },
  isEmail: function(entry, validation){
    var isOk = false;
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test($('#' + entry.id).val()) == false){
      $('#' + entry.help).html(validation.message);
      $('#' + entry.help).removeClass(this.classes.textSuccess);
      $('#' + entry.help).removeClass(this.classes.textWarning);
      $('#' + entry.help).addClass(this.classes.textDanger);
      $('#' + entry.id).addClass(this.classes.inputInvalid);
    }else{
      $('#' + entry.help).html('');
      $('#' + entry.help).removeClass(this.classes.textDanger);
      $('#' + entry.id).removeClass(this.classes.inputInvalid);
      isOk = true;
    }
    return isOk;
  },
  customFunction: function(entry, validation){
    var isOk = false;
    if(validation.customFunction() == false){
      $('#' + entry.help).html(validation.message);
      $('#' + entry.help).removeClass(this.classes.textSuccess);
      $('#' + entry.help).removeClass(this.classes.textWarning);
      $('#' + entry.help).addClass(this.classes.textDanger);
      $('#' + entry.id).addClass(this.classes.inputInvalid);
    }else{
      $('#' + entry.help).html('');
      $('#' + entry.help).removeClass(this.classes.textDanger);
      $('#' + entry.id).removeClass(this.classes.inputInvalid);
      isOk = true;
    }
    return isOk;
  },
  isSelected: function(entry, validation){
    var isOk = false;
    if($('#' + entry.id).val() == 'E'){
      $('#' + entry.help).html(validation.message);
      $('#' + entry.help).removeClass(this.classes.textSuccess);
      $('#' + entry.help).removeClass(this.classes.textWarning);
      $('#' + entry.help).addClass(this.classes.textDanger);
      $('#' + entry.id).addClass(this.classes.inputInvalid);
    }else{
      $('#' + entry.help).html('');
      $('#' + entry.help).removeClass(this.classes.textDanger);
      $('#' + entry.id).removeClass(this.classes.inputInvalid);
      isOk = true;
    }
    return isOk;
  },
  notEmptyCKEditor: function(entry, validation){
    var isOk = false;
    if(CKEDITOR.instances[entry.id].getData() == ''){
      $('#' + entry.help).html(validation.message);
      $('#' + entry.help).removeClass(this.classes.textSuccess);
      $('#' + entry.help).removeClass(this.classes.textWarning);
      $('#' + entry.help).addClass(this.classes.textDanger);
      $('#cke_' + entry.id).css('border-color', '#dc3545');
    }else{
      $('#' + entry.help).html('');
      $('#' + entry.help).removeClass(this.classes.textDanger);
      $('#cke_' + entry.id).css('border-color', '#d1d1d1');
      isOk = true;
    }
    return isOk;
  },
});

export default ValidationForm;
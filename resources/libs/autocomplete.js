var Autocomplete = Backbone.View.extend({
  // attributes
  el: '#byDefine',
  inputText: null, // String
  inputHelp: null, // String
  hintList: null, // String
  service: {
    url: null, // String
    param: null, // String
  },
  model: null, // String
  collection: null, // Backbone collection
  formatResponseData: {
    id: null, // ID
    name: null, // String
  },
  formatModelData: {
    id: null, // ID
    name: null, // String
  },
  id: null,
  name: null,
  // constructor
	initialize: function(params){
    this.el = params.el;
    this.service = params.service;
    this.inputText = params.inputText;
    this.inputHelp = params.inputHelp;
    this.hintList = params.hintList;
    this.model = params.model;
    this.collection = params.collection;
    this.formatResponseData = params.formatResponseData;
    this.formatModelData = params.formatModelData;
    // dynamic allocation of events
    this.events = this.events || {};
    this.events['keyup #' + this.inputText] = 'search';
    this.events['focusout #' + this.inputText] = 'focusOut';
    this.delegateEvents();
  },
  // events
  events: {
    'click .hint': 'hintClick',
  },
  // methods
  search: function(event) {
    var text = $(event.target).val();
    if(event.keyCode != 27){ // 27 == Escape
      var _this = this;
      $.ajax({
        url: _this.service.url,
        type: 'GET',
        data: {
          [_this.service.param]: text,
        },
        headers: {
          [CSRF_KEY]: CSRF,
        },
        async: false,
        success: function(data) {
          var hints = JSON.parse(data);
          _this.collection.reset();
          $('#' + _this.hintList).empty();
          for(var i = 0; i < hints.length; i++){
            var model = new _this.model({
              [_this.formatModelData.id]: hints[i][_this.formatResponseData.id], 
              [_this.formatModelData.name]: hints[i][_this.formatResponseData.name]
            });
            _this.collection.add(model);
          }
          _this.showHints();
        },
        error: function(xhr, status, error){
          console.error(error);
          console.log(JSON.parse(xhr.responseText));
        }
      });
    }else{
      this.clean(event);
    }
  },
  clean: function(event) {
    this.collection.reset();
    $('#' + this.hintList).empty();
    $('#' + this.hintList).addClass('d-none');
  },
  showHints: function(){
    var _this = this;
    this.collection.each(function(model){
      var li = document.createElement('li');
      li.classList.add('hint');
      li.setAttribute(_this.formatModelData.id, model.get(_this.formatModelData.id));
      li.appendChild(document.createTextNode(model.get(_this.formatModelData.name)));
      $('#' + _this.hintList).append(li);
      $('#' + _this.hintList).removeClass('d-none');
      var inputTextWidth = $('#' + _this.inputText).outerWidth();
      $('#' + _this.hintList).outerWidth(inputTextWidth);
    });
  },
  focusOut: function(event){
    
  },
  hintClick: function(event){
    this.id = $(event.target).attr('id');
    this.name = $(event.target).html();
    $('#' + this.inputText).val(this.name);
    this.clean();
  },
});

export default Autocomplete;
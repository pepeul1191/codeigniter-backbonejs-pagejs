var EventService = {
  saveDetail: function(model, messageLabelId){
    var resp = {};
    $.ajax({
      type: 'POST',
      url: BASE_URL + 'admin/event/save',
      data: {
        id: model.get('id'),
        dni: model.get('dni'),
        code: model.get('code'),
        name: model.get('name'),
        hours: model.get('hours'),
        init_hour: model.get('init_hour'),
        init_date: model.get('init_date'),
        gift: model.get('gift'),
        event_type_id: model.get('event_type_id'),
        picture_url: model.get('picture_url'), 
        description: model.get('description'),
      },
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data){
        // show message
        $('#' + messageLabelId).removeClass('alert-danger');
        $('#' + messageLabelId).removeClass('alert-warning');
        $('#' + messageLabelId).addClass('alert-success');
        $('#' + messageLabelId).html('Detalle de evento guardado con éxito');
        // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        // return data
        resp.message = data;
        resp.status = 200;
      },
      error: function(xhr, status, error){
        // show message
        if(xhr.status == 404){
          $('#' + messageLabelId).removeClass('alert-success');
          $('#' + messageLabelId).removeClass('alert-warning');
          $('#' + messageLabelId).addClass('alert-danger');
          $('#' + messageLabelId).html('Recurso no encontrado');
          // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        }else if(xhr.status == 501){
          $('#' + messageLabelId).removeClass('alert-success');
          $('#' + messageLabelId).removeClass('alert-warning');
          $('#' + messageLabelId).addClass('alert-danger');
          $('#' + messageLabelId).html('Ocurrió un error controlado en grabar el detalle del evento');
          // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        }else{
          $('#' + messageLabelId).removeClass('alert-success');
          $('#' + messageLabelId).removeClass('alert-warning');
          $('#' + messageLabelId).addClass('alert-danger');
          $('#' + messageLabelId).html('Ocurrió un error no controlado en grabar el detalle del evento');
          // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        }
        console.error(error);
        // return data
				resp.message = JSON.parse(xhr.responseText);
				resp.status = 500;
      }
    });
    return resp;
  },
  getDetail: function(id){
    var resp = {};
    $.ajax({
      type: 'GET',
      url: BASE_URL + 'admin/event/get',
      data: {
        id: id,
      },
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data){
        resp.message = JSON.parse(data);
        resp.status = 200;
      },
      error: function(xhr, status, error){
        console.error(error);
				resp.message = JSON.parse(xhr.responseText);
        resp.status = xhr.status;
      }
    });
    return resp;
  },
};

export default EventService;
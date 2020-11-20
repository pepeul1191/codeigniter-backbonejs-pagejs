var SpeakerService = {
  saveDetail: function(model, messageLabelId){
    var resp = {};
    $.ajax({
      type: 'POST',
      url: BASE_URL + 'admin/speaker/save',
      data: {
        id: model.get('id'),
        dni: model.get('dni'),
        code: model.get('code'),
        tuition: model.get('tuition'),
        names: model.get('names'),
        last_names: model.get('last_names'),
        email: model.get('email'),
        phone: model.get('phone'),
        picture_url: model.get('picture_url'),
        resume: model.get('resume'),
        gender_id: model.get('gender_id'),
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
        $('#' + messageLabelId).html('Detalle de ponente guardado con éxito');
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
          $('#' + messageLabelId).html('Ocurrió un error controlado en grabar el detalle del ponente');
          // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        }else{
          $('#' + messageLabelId).removeClass('alert-success');
          $('#' + messageLabelId).removeClass('alert-warning');
          $('#' + messageLabelId).addClass('alert-danger');
          $('#' + messageLabelId).html('Ocurrió un error no controlado en grabar el detalle del ponente');
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
      url: BASE_URL + 'admin/speaker/get',
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

export default SpeakerService;
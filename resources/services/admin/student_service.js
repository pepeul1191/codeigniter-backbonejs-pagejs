var StudentService = {
  saveDetail: function(model, messageLabelId){
    var resp = {};
    $.ajax({
      type: 'POST',
      url: BASE_URL + 'admin/student/save',
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
        address: model.get('address'),
        district_id: model.get('district_id'),
        district_name: model.get('district_name'),
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
        $('#' + messageLabelId).html('Detalle de alumno guardado con éxito');
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
          $('#' + messageLabelId).html('Ocurrió un error controlado en grabar el detalle del alumno');
          // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        }else{
          $('#' + messageLabelId).removeClass('alert-success');
          $('#' + messageLabelId).removeClass('alert-warning');
          $('#' + messageLabelId).addClass('alert-danger');
          $('#' + messageLabelId).html('Ocurrió un error no controlado en grabar el detalle del alumno');
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
      url: BASE_URL + 'admin/student/get',
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
  checkDNI: function(student_id, dni){
    console.log(student_id)
    var resp = {};
    $.ajax({
      type: 'GET',
      url: BASE_URL + 'admin/student/check_dni',
      data: {
        dni: dni,
        student_id: student_id,
      },
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data){
        // 0 -> no duplicated
        // 1 -> duplicated
        resp.message = data;
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

export default StudentService;
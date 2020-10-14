import queryParamsParser from '../helpers/query_params_parser';

page.base('/');

page('', index);
page('about', about);
page('contact', contact);
page('contact/:contactName', contact);
// page('*', notfound)
page();

function index(ctx, next) {
  document.querySelector('p')
    .textContent = 'viewing index';
  alert('index');
}

function about(ctx, next) {
  document.querySelector('p')
    .textContent = 'viewing about';
}

function contact(ctx) {
  var queryParams = queryParamsParser(ctx.querystring);
  console.log(queryParams)
  document.querySelector('p')
    .textContent = 'viewing contact ' + (ctx.params.contactName || '');
}

function notfound(ctx, next) {
  window.location = BASE_URL + 'error/access/404';
}

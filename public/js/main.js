//MaterializeCSS 1.0.0 Beta
/* Auto Init allows you to initialize all of the Materialize Components with a single function call. It is important to note that you cannot pass in options using this method.
*/
M.AutoInit();

// initializing the .sidenav element

var elem = document.querySelector('.sidenav');
var instance = M.Sidenav.init(elem);

// initializing the .sidenav element and modifying its options
var elem = document.querySelector('.sidenav');
var instance = M.Sidenav.init(elem, {
  inDuration: 350,
  outDuration: 350,
  edge: 'left' //or right
});

M.FormSelect.init(document.querySelector('#status'))
CKEDITOR.replace( 'body')
//put only (body) to have all plugins available


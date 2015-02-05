var form = document.getElementsByTagName('form')[0];
var input_field = document.getElementsByTagName('input')[0];
var default_txt = input_field.value;
var task_list = document.getElementsByTagName('ul')[0];
var lis = document.getElementsByTagName('li');

// when form's submitted, get input field value
form.onsubmit = function() {
  var txt = input_field.value;
  if (txt.length && txt !== default_txt) {
    var li = document.createElement('li');	
	  var txt_node = document.createTextNode(txt);
	  li.appendChild(txt_node);
		li.onclick = function(){
		  this.parentNode.removeChild(this);
		}
	  task_list.appendChild(li);
		input_field.value = default_txt;
	}
	return false;
};


input_field.onclick = function() {
  input_field.value = '';
}

// when you click away from the input field
// and it's not the task list items, restore default input text
document.onclick = function(e) {
  if (e.target.nodeName != 'LI' && e.target.nodeName != 'INPUT'){
    input_field.value = default_txt;	
	}
}

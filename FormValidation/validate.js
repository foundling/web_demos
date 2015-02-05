/* 
  HTML FORM VALIDATION WITH JAVASCRIPT

	purpose:
	1) to prevent sending invalid login information to the server,
	which helps minimize web traffic and server-side processing.
	2) to provide useful error information to a user
	
	Q: Does it gracefully degrade for users without JavaScript?
	

*/

// Document is the top-level element of every web page
// we want to find the information inside of that 
// To get a SINGLE element by its element name, use
// document.querySelector
var form = document.querySelector('form');

// error box is where the validation errors are displayed
// for the user
var error_box = document.querySelector('p');

// now that we have a way to refer to the form, we want 
// to find the input nested inside of it

// note: i'm using the querySelectorAll here, which returns
// a list of 'input' items

// we use the list[number] syntax to access items in a list
// the first item is [0]
// because i know there are 3 input fields and I know their order, 
// i know i can use [0], [1] and [2] to refer to each.


var username = form.querySelectorAll('input')[0];
var pw = form.querySelectorAll('input')[1];
var pw_confirm = form.querySelectorAll('input')[2];

// minimum and maximum values for user password and usernames
var PW_MIN = 6;
var PW_MAX = 12;
var USER_MIN = 6;


// using the form variable I created above
// i'm specifying the behavior that happens when the form is
// submitted, aka when the user presses 'submit'
// note, we haven't covered functions, so the function(e) might be mysterious to you
// that's okay for now

form.onsubmit = function(e) {

  // set innerHTML value of error_box to nothing.
  // this basically clears the form each time the user hits submit
  // otherwise, multiple submits would be added to each other,
  // resulting in an ever-lengthening list of errors
  error_box.innerHTML = "";
  error_box.className = "";

  // errors is an empty list that we'll add any relevant errors to
  // when we detect them
  var errors = [];

  // a long list of things that need to be true for the form to submit
  // if ANY are false, then the function goes to the else block
  if ( (username.value.length > USER_MIN) &&
       (pw.value === pw_confirm.value) &&
       (pw.value.length > PW_MIN) &&
       (pw.value.length < PW_MAX) ) {
       console.log('all good');
  }

  // if any of the above are false, the else block executes 
  else {
    // preventDefault prevents the form from sending data to server
    e.preventDefault();
    if (username.value.length === 0){
      errors.push('missing a username');
    }
    if (username.value.length < USER_MIN){
      errors.push('usernames must be greater than ' + USER_MIN + ' characters');
    }
    if (pw.value.length === 0){
	  errors.push('password field is empty');
    }
    if (pw.value.length < PW_MIN)
    {
       errors.push('password must be longer than ' + PW_MIN + ' characters');
    }
    if (pw_confirm.value.length === 0){
      errors.push('password confirmation field is empty');
    }
    if (pw_confirm.value.length < PW_MIN)
    {
       errors.push('password confirmation must be longer than ' + PW_MIN + ' characters');
    }
    if (pw.value.length !== pw_confirm.value.length){
      errors.push("your passwords don't match"); 
    }

    // now we go through the list of errors and create list elements
    // and put them inside the error_box ul element
    if (errors.length > 0) {
      //alert(errors.join(', '));
      error_box.className='error';
      for (var i=0; i<errors.length; i++)
      {
        var txt_node = document.createTextNode(errors[i]);
        var li = document.createElement('li');
        li.appendChild(txt_node);
        error_box.appendChild(li);
      }
    }
  }
}; 

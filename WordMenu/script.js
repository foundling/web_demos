var body = $('body');
var word_menu = $('.word-menu');
var toggled = false;
var testList = ['one','two','three'];

word_menu.hover(function(e){

			var left_offset = Math.floor($(this).offset().left) + 'px';
			var ul = document.createElement('ul');
			ul.className = 'word-menu-list';
			ul.style.left = word_menu.offset().left + "px";
			console.log(offset);
			for (var i = 0; i < testList.length; i++)
			{
				var offset = word_menu.offset().left + "px";
				var li = document.createElement('li');
				var textNode = document.createTextNode(testList[i]);
				li.appendChild(textNode);
				li.className = 'word-menu-list-item';
				//li.style.left = offset; // if i pass this into func, it changes
				ul.appendChild(li);
			}
			word_menu.append(ul);
			toggled = !toggled;
		},
		function(e) {
		  word_menu.find('ul').remove();
	    toggled = !toggled;
	    console.log(toggled);
    }
);


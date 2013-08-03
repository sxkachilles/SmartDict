$(document).ready(function() {
	var dict = window.localStorage;
	$('#delete-all').bind('click', function() {
		dict.clear();
		$('.btn-warning').remove();
	});
	for (var word in dict) {
		var a = $('<a href="#">').attr({id: word})
			.addClass('list-group-item btn btn-large btn-block btn-warning')
			.text(word);
		$('#word-list').append(a);
	};
	$('#word-list a').bind('click', function(){
		dict.removeItem($(this).attr('id'));
		$(this).remove();
	});
});
$(document).ready(function() {
	$('.lightbox').hide();
	$("#search-term").submit(function(event) {
		event.preventDefault();
		var query = $('#query').val();
		getRequest(query);
		
	});

	$('#modal .close_button').click(function(event) {
		$('.lightbox').hide();
		$('iframe').attr('src', "");
	});
	$('ul').on('click', 'a', function(event) {
		event.preventDefault();
		var url = $(this).attr('href');
		$('iframe').attr('src', url)
		$('.lightbox').show();
	});

});

function getRequest(query){
	var parameter ={
		part: 'snippet',
		key:'AIzaSyCrHmNdR2MwUvy32H8fwKd5RTKw6VMyKUk',
		q:query,
		maxResults: 50
	};
	$.getJSON('https://www.googleapis.com/youtube/v3/search', parameter, function(data) {

			console.log(data.items[0].id.videoId);
			console.log(data.items[0].snippet.thumbnails.medium.url);
			showResults(data.items);
	});
	
}

function showResults(data){
	$('#search-results ul').html(" ");
	$.each(data,function(index, value) {
		var block = '<li><div class="box">'+
					'<a  href="https://www.youtube.com/embed/'+value.id.videoId+'"><img src="'+value.snippet.thumbnails.medium.url+'">'+
					'<div class="details">'+
						'<h6 class="movieTitle">'+value.snippet.title+'</a></h6></div></div></li>';
		$('#search-results ul').append(block);		
	});
}


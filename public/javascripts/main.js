$(document).ready(function(){
	var userColor = $('#user').val();
	if (userColor){
		$('body').css('background-color', userColor);
		$('#colorPicker').css('color', userColor);
	}
	$('#colorPick').submit(function () {
		var color = $('#color').val();
		if (color){		
			$('#color').val('');
			$('body').css('background-color', color);
			$('#colorPicker').css('color', color);
			$.post("/color", { "color": color },
				function(data){
					console.log('hi')
		            if (!data.err){
					}
		        }, 'json');
		}
		return false;
	});
	$('#commentForm').submit(function () {
		var comment = $('#comment').val();
		var photoID = $('#commentForm').parent().attr('id');
		console.log(photoID);
		if (comment){		
			$('#comment').val('');
			$.post("/comment", { "message": comment, "id": photoID },
				function(data){
		            if (!data.err){
					}
		        }, 'json');
		}
		return false;
	});
});
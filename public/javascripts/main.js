$(document).ready(function(){
	var userColor = $('#user').val();
	if (userColor){
		$('body').css('background-color', userColor);
		$('a').css('color', userColor);
	}
	$('#colorPick').submit(function () {
		var color = $('#color').val();
		$('body').css('background-color', color);
		$('a').css('color', color);
		if (color){		
			$.post("/color", { "color": color },
				function(data){
		            if (!data.err){
						$('#color').val('');
					}
		        }, 'json');
		}
		return false;
	});
});
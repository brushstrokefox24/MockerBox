//When DOM loaded we attach click event to button
$(document).ready(function() {
	var countwidth=1;
	$('#button1').click(function(){
		$.ajax({
			url: "data/quiz.json",
			dataType: "text",
			success: function(data) {
				var json = $.parseJSON(data);
				var output= '';	

				for ( var i=0; i<json.questions.length;i++){
					if(i===0){
						output= output + '<div class="questionContainer radius">';
					}else{
						output= output + '<div class="questionContainer hide radius">';
					}
					output= output + '<div class="question"><h4>' + json.questions[i].q + '</h4></div>';
					output= output + ' <div class="answers"><ul><li><input type="radio" name="q'+i+'" id="q'+i+'-a"/> ' + json.questions[i].a[0].option + '</li><li><input type="radio" name="q'+i+'" id="q'+i+'-b"/>'+ json.questions[i].a[1].option + '</li></ul></div><div class="btnContainer">';
					if (i===0){
						
					}else{
						output= output + '<div class="prev button"><a class="btnPrev">&lt;&lt; Prev</a></div>';
					}
					if(i===4){
						output= output + '<div class="next button"><a class="btnShowResult">Finish!</a></div>';	
					}else{
						output= output +'<div class="next button"><a class="btnNext">Next &gt;&gt;</a></div>';
					}
					output= output + '<div class="clear"></div></div></div>';	
				}
				output = output + '<div class="txtStatusBar">Status Bar</div><div id="progressKeeper" class="radius"><div id="progress"></div></div><div id="resultKeeper" class="radius hide"></div>';
				$('#pages').html(output);
				$('#button1').hide();

				$('.btnNext').click(function(){
					if ($('input[type=radio]:checked:visible').length === 0) {
								
						return false;
					}
					$(this).parents('.questionContainer').fadeOut(500, function(){
						$(this).next().fadeIn(500);
					});
					var el = $('#progress');
					el.width((countwidth*20) + '%');
					countwidth++;
				});
				$('.btnPrev').click(function(){
					$(this).parents('.questionContainer').fadeOut(500, function(){
						$(this).prev().fadeIn(500);
					});
					countwidth--;
					var el = $('#progress');
					el.width((countwidth*20) + '%');	
				});
				$('.btnShowResult').click(function(){
					$('#progress').width(300);
					$('#progressKeeper').fadeOut(300);
					$('.txtStatusBar').fadeOut(300);
					var arr = $('input[type=radio]:checked');
					var ans = [];
					for (var i = 0, ii = arr.length; i < ii; i++) {
						ans.push(arr[i].getAttribute('id'));
					}
					var resultSet = '';
					resultSet += '<div class="totalScore multibox">Total</div><div class="infototal multibox">Something<br></div>';
					$('#resultKeeper').html(resultSet).show();		
				});
			}			
		});
		$(document).on({
				ajaxStart: function() { $("#loading").append("<img id='theImg' src='img/loading.png'/>");},
				ajaxStop: function() { $("#loading").empty(); }    
			});
	});	
});
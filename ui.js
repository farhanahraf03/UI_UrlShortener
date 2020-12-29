$(document).ready(function () {
	let searchParams = new URLSearchParams(window.location.search)

	if (searchParams.has('url')){
		
		console.log('search event triggered')
		$(document).empty();
		$.ajax({
			url: "https://78zb18i69h.execute-api.ap-south-1.amazonaws.com/db_dev/db-functions",
			data: JSON.stringify({action:'search',short_url:'https://'+window.location.hostname + '/?url='+searchParams.get('url')}),
            type: 'POST',
           	crossDomain: true,
            contentType: 'application/json',
            dataType: "json",
            headers: {
				      
				      'Content-Type': 'application/json'
				    },
			success: function(data){
				console.log(JSON.parse(data['body']));
				window.location = JSON.parse(data['body']);
			},
			error : function(err){
				alert(err)
			}

		})
		
		//window.location.replace('http://www.google.com')
	}

	else{
		$(".url_short").click(function(event){
			console.log('event triggered')
			$('#dataloading').css('display','')
			$.ajax({
				url: "https://78zb18i69h.execute-api.ap-south-1.amazonaws.com/db_dev/db-functions",
				data: JSON.stringify({action:'short',short_url:'https://'+window.location.hostname +'/?url='+ parseInt(event.timeStamp).toString(), original_url:$("#longURL").val()}),
	            type: 'POST',
	           	crossDomain: true,
	            contentType: 'application/json',
	            dataType: "json",
	            headers: {
					      
					      'Content-Type': 'application/json',
					    },
				success : function(data){
					console.log("Success")
					console.log(data['body'])
					$('#dataloading').css('display','none')
					$('#shortURL').val('https://'+window.location.hostname +'/?url='+ parseInt(event.timeStamp).toString())
					$('#shortURL').attr('disabled','true')
				},
				error : function (err){
					console.log("Error")
					console.log(err)
					$('#dataloading').css('display','none')
					alert(err)
				}

			})
		})
	}
})

<!DOCTYPE html>
<html>
<head>
	<title>myProject</title>
	<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
	<style type="text/css">
		#canvas{
			margin-top:10em;
		}
		svg{
			border: 4px solid black;
			
			height: 400px;
			width: 400px;
		}
		#card{
			display: inline-flex;
			background: #fff;
			border-radius: 2px;
			height: 700px;
			position: relative;
			margin-left: 650px;
			margin-top: 250px;
			width: 1200px;
			box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
		}
		#form-bar{
			margin: 2rem;
			width: 700px;
			height:inherit;
		}
		input[type="url"]{
			width: 500px;
			height:70px;
			border-radius: 10px;
			font-size:30px;
			color:gray;
			padding-left: 10px;
		}
		input[type="submit"]{
			width: 250px;
			height: 40px;
			border-radius: 20px;
			display: block;
			border: 2px solid #1ECD97;
			background: none;
			outline: none;
			margin-top: 50px;
		}
		input[type="submit"]:hover{
			cursor: pointer;
			background-color: #1ECD97;
		}
	</style>
</head>
<body>
	<div id="card" class="card">
		<div id="form-bar">
			<div>
				
					<div>
						<input type="text" id="linkUrl" name="linkUrl" placeholder="type the url" autocomplete="off">
					</div>
					<div>
						<input type="submit" value="Generate Qr code">
					</div>
				
			</div>
		</div>
		<div id="canvas">
		</div>
	</div>
	<!--<form method ="post" action="/">
		<input type="url" id="linkUrl" name="linkUrl">
		<input type="submit" value="submit">
	</form>
	<div id="canvas"></div>-->
	<script type="text/javascript">
		var obj = $.parseHTML("<%= (name)%>");
		console.log(obj);
		/*if(obj){
			$("#canvas").append(obj[0]['wholeText']);
		}
		function isValid(userInput) {
    		var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    		if(res == null)
        		return false;
    		else
        		return true;
		}
		$(":input[type='submit']").click(function(){
			/*var url = document.getElementById("linkUrl").value;
			if(isValid(val)){

			}else{
				alert("enter valid url");
				return;
			}*/
		});

	</script>
</body>
</html>

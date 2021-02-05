var opt;
	$(".type").on('click',function(){
		 id ="";
		 frameShape = 'square';
		 eyeBallShape = 'square';;
		 eyeFrameColor = 'black'; 
		 eyeBallColor = 'black';
		 dataPattern = 'square';
		 qrCodeColor = '#000000';
		 logoUrl = '';
		 backgroundUrl='';
		 frame_style = 'none';
		 frameText ='';
		 bulk = false;
		 $("#loading-image").hide();
		 $("#canvas").empty();
		 document.getElementById("btn").style.visibility="hidden";
		var need  = this.value;
			$(".upper").each(function(){
				
				if(this.id==need){
					$(this).removeClass('emp');
				}else{
					$(this).addClass('emp');
				}
			});
			
		});
		$("#bulk_upload").change(function(){
			console.log("bulk load changed");
			bulkUpload();
		});
		function bulkUpload(){
			url = "abc.com";
			bulk = true;
			var input =document.getElementById('bulk_upload');
			console.log("inside bulk load function");
			if (input.files && input.files[0]) {
			 	var reader = new FileReader();
				//console.log('working');
				reader.onload = function(e) {

					var form = {
						'file':e.target.result
					};
					console.log(form);
					$.ajax({
						type: 'POST',
						url:'/bulkUpload',
						data:form,
						beforeSend: function() {
							console.log($("#loading-image"));
							$("#loading-image").show();
						},
						success: function(response){
							opt = JSON.parse(response);
						//console.log(response);
							reqToServer();
							$("#loading-image").hide();
						//	console.log(response);;
						}
					});
					
				}
				reader.readAsDataURL(input.files[0]);
			}
		}

		function readURL(input) {
			console.log('working');
		  if (input.files && input.files[0]) {
		    var reader = new FileReader();
		    console.log('working');
		    reader.onload = function(e) {
		    	backgroundUrl = e.target.result;
		    	reqToServer();
		     //console.log(e.target.result);
		    }
		    
		    reader.readAsDataURL(input.files[0]); // convert to base64 string
		  }
		}

		$("#imgInp").change(function() {
		  readURL(this);
		});
		function showEyes(){
			document.getElementById("custom_section_eye").style.display="block";
			document.getElementById("custom_section_data").style.display="none";
			document.getElementById("custom_section_color").style.display="none";
			document.getElementById("custom_section_frame").style.display="none";	
		}
		function showData(){
			document.getElementById("custom_section_eye").style.display="none";
			document.getElementById("custom_section_data").style.display="block";
			document.getElementById("custom_section_color").style.display="none";	
			document.getElementById("custom_section_frame").style.display="none";
		}
		function showColor(){
			document.getElementById("custom_section_eye").style.display="none";
			document.getElementById("custom_section_data").style.display="none";	
			document.getElementById("custom_section_color").style.display="block";
			document.getElementById("custom_section_frame").style.display="none";
		}
		function showFrame(){
			document.getElementById("custom_section_eye").style.display="none";
			document.getElementById("custom_section_data").style.display="none";
			document.getElementById("custom_section_color").style.display="none";
			document.getElementById("custom_section_frame").style.display="block";
		}
		var id ="";
		var frameShape = 'square';//document.getElementById("eyeFrameShape").value;
		var eyeBallShape = 'square';;//document.getElementById("eyeBallShape").value;
		var eyeFrameColor = 'black'; //document.getElementById("eyeFrameColor").value;
		var eyeBallColor = 'black';//document.getElementById("eyeBallColor").value;
		var dataPattern = 'square';
		var qrCodeColor = '#000000';
		var logoUrl = '';
		var backgroundUrl='';
		var frame_style = 'none';
		var frameText ='';
		
		var bulk = false;
		
		function isValid(userInput) {
    		var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    		if(res == null)
        		return false;
    		else
        		return true;
		}
		function reqToServer(){
			var tmp = document.getElementById("linkUrl").value;
			//console.log(document.getElementById("eyeFrameShape").value);
			if(bulk==false)
				url = tmp;
			console.log(url,frameShape);
			if(isValid(url)){
				var form = {
					"linkUrl":url,
					"eyeFrameShape":frameShape,
					"eyeBallShape":eyeBallShape,
					"eyeFrameColor":eyeFrameColor,
					"eyeBallColor":eyeBallColor,
					"dataPattern":dataPattern,
					"colorDark":qrCodeColor,
					"backgroundImage":backgroundUrl,
					"frameStyle":frame_style,
					"frameText":frameText
				};
				//form.append("linkedUrl", url);
				$.post("/build",form,function(response){
					$("#canvas").empty();
					$("#canvas").append(response);
					document.getElementById("btn").style.visibility="visible";
				});
			}else{
				return;
			}
		}
		/*$(":input[type='submit']").click(function(){
			reqToServer();
		});*/
		function updateFrameText(){
			let tmp = document.getElementById("frametext").value;
			if(tmp.length<=10){
				frameText = tmp;
				reqToServer();
			}
		}
		function updateFrameShape(){
			frameShape = document.getElementById("eyeFrameShape").value;
			reqToServer();
		}
		function updateEyeShape(){
			eyeBallShape = document.getElementById("eyeBallShape").value;
			reqToServer();
		}
		function updateColor(){
			qrCodeColor = document.getElementById("qrColor").value;
			reqToServer();
		}
		function updateFrameColor(){
			eyeFrameColor =  document.getElementById("eyeFrameColor").value;
			reqToServer();
		}
		function updateEyeBallColor(){
			eyeBallColor = document.getElementById("eyeBallColor").value;
			reqToServer();
		}
		function customize(){
			var id = document.getElementById("custom-select").value;
			$(".custom-area").empty();
			$("#custom_"+id).append('<div><h2>Frame Shape</h2><select onchange="updateFrameShape();" class="custom-select" id="eyeFrameShape"> <option value="square">SQUARE</option> <option value="circle">CIRCLE</option> <option value="rounded">ROUNDED</option> <option value="left-leaf">LEFT_LEAF</option> <option value="right-leaf">RIGHT_LEAF</option> </select></div><div><h2>Eye Ball Shape</h2><select onchange="updateEyeShape();" class="custom-select" id="eyeBallShape"><option value="square">SQUARE</option> <option value="circle">CIRCLE</option> <option value="rounded">ROUNDED</option> <option value="left-leaf">LEFT_LEAF</option> <option value="right-leaf">RIGHT_LEAF</option> <option value="left-diamond">LEFT_DIAMOND</option> <option value="right-diamond">RIGHT_DIAMOND</option> </select></div><div> <h2>Frame color</h2> <input onchange="updateFrameColor();" type="color" id="eyeFrameColor" name="eyeFrameColor" value="#000000"> </div><div> <h2>Eye Ball color</h2> <input onchange="updateEyeBallColor();" type="color" id="eyeBallColor" name="eyeBallColor" value="#000000"> </div>');;
		}
		function downloadURI(uri, name) {
			var link = document.createElement("a");
			link.download = name;
			link.href = uri;
			document.body.appendChild(link);
			link.click();
			
		}
		function DownloadZip(){
			var form = {
				"id":opt.id,
				"eyeFrameShape":frameShape,
				"eyeBallShape":eyeBallShape,
				"eyeFrameColor":eyeFrameColor,
				"eyeBallColor":eyeBallColor,
				"dataPattern":dataPattern,
				"colorDark":qrCodeColor,
				"backgroundImage":backgroundUrl,
				"frameStyle":frame_style,
				"frameText":frameText
			};
			$.ajax({
				type: 'POST',
				url:'/downloadZip',
				data:form,
				beforeSend: function() {
					$("#download").prop('value','Processing');
					$("#download").prop('disabled',true);
				},
				success: function(response) {
					$("#download").prop('value','Downlaod');
					$("#download").prop('disabled',false);
					
					var link = document.createElement("a");
					link.download = 'qrcodes.zip';
					link.href = response.storage_url;
					document.body.appendChild(link);
					link.click(); 
				}
			});
			/*$.post("/downloadZip",form,function(response){
				console.log(typeof(response));
				
				var link = document.createElement("a");
				link.download = 'qrcodes.zip';
				link.href = response.storage_url;
				document.body.appendChild(link);
				link.click(); 
			});*/
		}
		function DownloadAsImage() {
			if(bulk==true){
				DownloadZip();
				return;
			}
			var element = $("#canvas")[0];
			html2canvas(element).then(function (canvas) {
				var myImage = canvas.toDataURL();
				downloadURI(myImage, "QR_Code.png");
		    });
		}
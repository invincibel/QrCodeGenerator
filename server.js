const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
var stringify = require('json-stringify-safe');
const CircularJSON = require('circular-json');
app.use(bodyParser.json({ limit: "50mb" }));
var request = require("request");
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 500000,
  })
);
var cors = require("cors");
app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:8000'}));

const QRCodeBuilder = require("mobstac-awesome-qr");
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
const fs = require("fs");
app.post("/build",(req,res)=>{








var options = { method: 'POST',
  url: 'https://api.beaconstac.com/api/2.0/qrcodes/',
  headers: 
   { 
     'Content-Type': 'application/json',
     Authorization: 'Token {{token}}' },
  body: 
   { name: 'Static Website QR Code',
     organization: 26724,
     qr_type: 1,
     fields_data: { qr_type: 1, url: req.body.linkUrl },
     attributes: 
      { color: '#2595ff',
        colorDark: req.body.colorDark,
        margin: 80,
        isVCard: false,
        frameText: req.body.frameText,
        logoImage: 'https://d1bqobzsowu5wu.cloudfront.net/15406/36caec11f02d460aad0604fa26799c50',
        logoScale: 0.1992,
        frameColor: '#2595FF',
        frameStyle: req.body.frameStyle,
        backgroundImage:req.body.backgroundImage,
        logoMargin: 10,
        dataPattern: req.body.dataPattern,
        eyeBallShape: req.body.eyeBallShape,
        eyeBallColor: req.body.eyeBallColor,
        gradientType: 'none',
        eyeFrameColor: req.body.eyeFrameColor,
        eyeFrameShape: req.body.eyeFrameShape } },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

 res.send(body);
});





	
	/*const qrCodeGenerator = new QRCodeBuilder.QRCodeBuilder({
			text: req.body.linkUrl,
			canvasType: 'png',
			backgroundImage:req.body.backgroundImage,
			eyeFrameShape: req.body.eyeFrameShape,
			eyeBallShape: req.body.eyeBallShape,
			eyeFrameColor: req.body.eyeFrameColor,
			eyeBallColor: req.body.eyeBallColor,
			dataPattern: req.body.dataPattern,	
			dotScale: 0.96,
			frameStyle: req.body.frameStyle,
			frameColor: '#000000',
			colorDark: req.body.colorDark,
			frameText: req.body.frameText,
			logoMargin: 5,
			isVCard: false,
		});
	qrCodeGenerator.build('svg').then(qrCode=>{
		//var str = qrCode.toBuffer();
		//str = str.replace(/(\r\n|\n|\r)/gm, "");
		var str = qrCode.toBuffer();
		str = str.replace(/\n|\r/g, "");
		//res.render('main',{name:str});
		res.send(str);
	});*/
	
});
app.post("/getImgUrl",(req,res)=>{
	var id  = req.body.id;

	var options = { method: 'GET',
	  url: 'https://api.beaconstac.com/api/2.0/qrcodes/'+id+'/download/',
	  qs: { size: '2048', error_correction_level: '5', canvas_type: 'png' },
	  headers: 
	   { 
	     Authorization: 'Token {{token}}' } };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  res.send(body);
	});
});
app.post("/update",(req,res)=>{
	var id  = req.body.id;
	var options = { method: 'PUT',
  	url: 'https://api.beaconstac.com/api/2.0/qrcodes/'+id+'/',
	headers: 
	{ 
	    'Content-Type': 'application/json',
	    Authorization: 'Token {{token}}' },
	body: 
	 {name: 'Static Website QR Code',
     organization: 26724,
     qr_type: 1,
     fields_data: { qr_type: 1, url: req.body.linkUrl },
     attributes: 
      { color: '#2595ff',
        colorDark: req.body.colorDark,
        margin: 80,
        isVCard: false,
        frameText: req.body.frameText,
        logoImage: 'https://d1bqobzsowu5wu.cloudfront.net/15406/36caec11f02d460aad0604fa26799c50',
        logoScale: 0.1992,
        frameColor: '#2595FF',
        frameStyle: req.body.frameStyle,
        backgroundImage:req.body.backgroundImage,
        logoMargin: 10,
        dataPattern: req.body.dataPattern,
        eyeBallShape: req.body.eyeBallShape,
        eyeBallColor: req.body.eyeBallColor,
        gradientType: 'none',
        eyeFrameColor: req.body.eyeFrameColor,
        eyeFrameShape: req.body.eyeFrameShape } },
  		json: true
	};

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  res.send("{status:success}")
	});
});
app.post("/", (req, res) => {
	var eyeFrameShape = 'square';
	var eyeBallShape = 'square';
	var backColor = 'black';
	const qrCodeGenerator = new QRCodeBuilder.QRCodeBuilder({
			text: req.body.linkUrl,
			canvasType: 'png',
			eyeFrameShape: 'square',
			eyeBallShape: 'square',
			dataPattern: 'square',
			dotScale: 0.96,
			frameStyle: 'balloon-top',
			frameColor: '#0b1257',
			frameText: '',
			logoMargin: 5,
			isVCard: false,
		});
	qrCodeGenerator.build('svg').then(qrCode=>{
		//var str = qrCode.toBuffer();
		//str = str.replace(/(\r\n|\n|\r)/gm, "");
		var str = qrCode.toBuffer();
		str = str.replace(/\n|\r/g, "");
		res.render('main',{name:str});
		//res.send(qrCode.toBuffer());
	});
});
app.get("/",(req,res)=>{
	res.render('main',{name:undefined});
});
/*app.get('*', function(req, res){
	return res.redirect("/");
});*/

app.listen(8000, () => console.log("Listening on port 8000!"));
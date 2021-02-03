const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
var stringify = require('json-stringify-safe');
const CircularJSON = require('circular-json');
app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 500000,
  })
);
var cors = require("cors");
app.use(cors());
const QRCodeBuilder = require("mobstac-awesome-qr");
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
const fs = require("fs");
app.post("/build",(req,res)=>{
	
	const qrCodeGenerator = new QRCodeBuilder.QRCodeBuilder({
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
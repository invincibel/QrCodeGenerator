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
const mime = require("mime");
var request = require("request");
var jsonParser = bodyParser.json()
app.post("/bulkUpload",jsonParser,(req,res)=>{
	
	var data = req.body.file;

	var matches = data.match(
        /^data:([A-Za-z-+\/]+);base64,(.+)$/
      ),
    response = {};
    response.type = matches[1];
    response.data =  Buffer.from(matches[2], "base64");
    let csv = response;
    let csvbuf = csv.data;
    let type = csv.type;
    let ext = mime.extension(type);
    let id = new Date().getTime();
    let fileName = id + "." + ext;  
	fs.writeFileSync(fileName, csvbuf, "utf8");
	var options = {
	  'method': 'POST',
	  'url': 'https://api.beaconstac.com/api/2.0/bulkqrcodes/',
	  'headers': {
	    'Authorization': 'Token '+process.env.token
	  },
	  formData: {
	    'organization': '26724',
	    'name': 'Sample Bulk QR Code collection',
	    'file': {
	      'value': fs.createReadStream("/home/invincible/myProject/"+fileName),
	      'options': {
	        'filename': fileName,
	        'contentType': null
	      }
	    },
	    'qr_type': '1',
	    'qr_data_type': '1',
	    'error_correction_level': '1',
	    'size': '1024'
	  }
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
	  		res.send(response.body);
	});
	fs.unlinkSync(fileName);
});
app.post("/downloadZip",(req,res)=>{
	var options = { method: 'PUT',
	  url: 'https://api.beaconstac.com/api/2.0/bulkqrcodes/'+req.body.id+'/',
	  headers: 
	   {'Content-Type': 'application/json',
	     Authorization: 'Token '+process.env.token
	      },
	  body: 
	   { id: req.body.id,
	     attributes:{ color: '#2595ff',
        colorDark: req.body.colorDark,
        margin: 80,
        isVCard: false,
        frameText: req.body.frameText,
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
});
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
	console.log(req.body);
	res.send(req.body);
});

app.get("/",(req,res)=>{

	res.render('main',{name:undefined});
});
/*app.get('*', function(req, res){
	return res.redirect("/");
});*/

app.listen(8080, () => console.log("Listening on port 8080!"));
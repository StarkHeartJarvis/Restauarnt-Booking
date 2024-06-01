var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Register');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	const name = req.body.name;
	const email =req.body.email;
	const pass = req.body.password;
	const phone =req.body.phone;
    const datetime = req.body.datetime;

	const data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone,
		"datetime":datetime
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('signup_success.html');
})


app.get('/sign_up',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('register.html');
}).listen(3000)


console.log("server listening at port 3000");

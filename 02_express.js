const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient // le pilote MongoDB

const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public')) // pour utiliser le dossier public

let db // variable qui contiendra le lien sur la BD
let fs = require('fs');
app.use(express.static('public'));
app.get('/html/01_mongodb.html', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/" + "01_mongodb.html" );
})

/*app.get('/list', (req, res) => {
 fs.readFile( __dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
 console.log( data );
 res.end( data );
 });
})*/






app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

app.get('/traiter_get', function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
 reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 tel:req.query.tel,
 mail:req.query.mail
 };

fs.appendFile(__dirname + "/public/data/" + "adresses.json", ',' + JSON.stringify(reponse), function (err, data) {

    var json = JSON.stringify(reponse);
    fs.appendFile("adresses.json", json);

		console.log('Done!')
	})


console.log(reponse);
 res.end(JSON.stringify(reponse));

})

/*const contenu_objet_json = (o) => {
   let trace = '';
   for (let p in o) { 
     trace += p + ': ' + o[p] + '\n' + '<br></br>'; 
     console.log(trace);
   } 
   return trace;
   }*/


app.get('/membres', (req, res) => {



fs.readFile(__dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
	

	if (err) throw err

	


	let collection = JSON.parse('[' + data + ']');
	

	/*const transforme_en_tableau = (o) =>{

	let trace = '<table style="border:6px solid #2f4591;">' + '<CAPTION>Exercice 4 - Tableau des Membres</CAPTION>'
 	+ '<tr style="border:2px solid black;">' + '<th>' + '<td">PRENOMS</td>'+ '</th>' + '<th>' + '<td>NOMS</td>'+ '</th>' + '<th>' + '<td>TELEPHONE</td>' + '</th>' + '<th>' + '<td>MAIL</td>' + '</th>' + '</tr>';

   for (let i=0; i<collection.length; i++) { 
     trace += '<tr>' + '<th>' + '<td">' + collection[i].prenom + '</td>' + '</th>' + '<th>' + '<td>' + collection[i].nom + '</td>' + '</th>' + '<th>' + '<td>' + collection[i].tel + '</td>' + '</th>' + '<th>' + '<td>' + collection[i].mail + '</td>' + '</th>' + '<th>' + '<br></br>'; 
     
   } 
   return trace + '</table>';
	}*/
	const transforme_en_tableau = (collection) =>{

	let chaine = '<table style="border:4px solid #2f4591;background-color:#E0F2F7;color:2f4591;height:400px;width:600px;margin:auto;font-family:arial;margin-top:200px;">' + '<CAPTION style="color:#2f4591">Exercice 4 - Tableau des Membres</CAPTION>';

	for(elm of collection){

		chaine += '<tr>';

  	for (p in elm) { 
     chaine += '<td style="border:1px solid #2f4591;">' + elm[p] + '</td>'; 

   	} 
   		chaine += '</tr>';
   }

   chaine += '</table>' + '<a href="http://127.0.0.1:8081/html/02_formulaire.html">Formulaire</a>';

   return chaine;
	}


	res.end(transforme_en_tableau(collection));

	
})
})






var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})

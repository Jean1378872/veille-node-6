const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient // le pilote MongoDB

const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public')) // pour utiliser le dossier public

let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})

//////////////////5-Les routes//////////////////
app.get('/adresse', (req, res) => {
 console.log('la route route get / = ' + req.url)
 
 var cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
 if (err) return console.log(err)
 // transfert du contenu vers la vue index.ejs (renders)
 // affiche le contenu de la BD
 res.render('gabarit.ejs', {adresse: resultat})
 }) 
})
/****************************************/

////////////ajouter ///////////////
app.post('/ajouter', (req, res) => {
 db.collection('adresse').save(req.body, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/')
 })
})
/*********************************/

///////////////////////Détruire////////////////////////
app.get('/detruire/:id', (req, res) => {
 var id = req.params.id 
// var critere = 'ObjectId("58bae3feaf5a674b240cfe53")'
// 58bae3feaf5a674b240cfe53
// var critere = ObjectID.createFromHexString(id)
var critere = ObjectID(req.params.id)
console.log(critere)


console.log(id)
 db.collection('adresse')
 .findOneAndDelete({"_id": critere}, (err, resultat) => {

if (err) return console.log(err)
 res.render('gabarit.ejs', {adresse: resultat})
 })
})
/****************************************/


var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})
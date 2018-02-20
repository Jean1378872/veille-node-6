const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient // le pilote MongoDB
const ObjectID = require('mongodb').ObjectID;

const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public')) // pour utiliser le dossier public

let db // variable qui contiendra le lien sur la BD



////////////////// 5-Les routes //////////////////
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

//////////// ajouter ///////////////
app.post('/ajouter', (req, res) => {
 db.collection('adresse').save(req.body, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/')
 })
})
/*********************************/

/////////////////////// Détruire ////////////////////////
app.get('/detruire/:id', (req, res) => {
 var id = req.params.id
 console.log(id)
 db.collection('adresse')
 .findOneAndDelete({"_id": ObjectID(req.params.id)}, (err, resultat) => {

if (err) return console.log(err)
 res.redirect('/adresse')  // redirige vers la route qui affiche la collection
 })
})
/****************************************/

/////////////////////////Trier////////////////////////////
app.get('/trier/:cle/:ordre', (req, res) => {
let cle = req.params.cle
 let ordre = (req.params.ordre == 'asc' ? 1 : -1)
 let cursor = db.collection('adresse').find().sort(cle,ordre).toArray(function(err, resultat){
 ordre = (req.params.ordre == 'asc' ? 'asc' : 'desc')
 res.render('adresses.ejs', {adresses: resultat, cle, ordre })
})
})
/*********************************************/

///////////////////////Modifier///////////////////////
app.post('/modifier', (req, res) => {
console.log('req.body' + req.body)
 /*if (req.body['_id'] != __________)
 {*/ 
 console.log('sauvegarde') 
 var oModif = {
 "_id": ObjectID(req.body['_id']), 
 nom: req.body.nom,
 prenom:req.body.prenom,
 courriel:req.body.courriel, 
 telephone:req.body.telephone
 }
 var util = require("util");
 console.log('util = ' + util.inspect(oModif));
 //}
 //else
 //{
 console.log('insert')
 console.log(req.body)
 var oModif = {
 nom: req.body.nom,
 prenom:req.body.prenom,
 courriel:req.body.courriel,  
 telephone:req.body.telephone
 }
 //}
 db.collection('adresse').save(oModif, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/list')
 })
})
/*********************************************************/


MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})
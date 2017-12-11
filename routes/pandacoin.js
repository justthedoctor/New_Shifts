const fs = require('fs')
var express = require('express');
var router = express.Router();
var shift2btc = require('node-pandacoin')()
var shift2funk = require('node-pandacoin')()
var shift2zeit = require('node-pandacoin')()
var shift2pnd = require('node-pandacoin')()

shift2btc.set('host', '107.174.34.78')
shift2btc.set({ port: 10002 })
shift2btc.auth('bitcoincoinrpc', '38ZjqLZzb2PQujUmQMCir42Ah4c6KUj6MwBWeqT3ffq7')

shift2pnd.set('host', '45.79.170.139')
shift2pnd.set({ port: 10000 })
shift2pnd.auth('pandacoinrpc', '38ZjqLZzb2PQujUmQMCir42Ah4c6KUj6MwBWeqT3ffq6x')

shift2funk.set('host', '45.79.170.139')
shift2funk.set({ port: 20001})
shift2funk.auth('Cypherfunkrpc', '3LtYSz3zb7nErtWEPKzAA2vhEAjutqQMrFo3uRFU9Mfh')

shift2zeit.set('host', '45.79.170.139')
shift2zeit.set({ port: 3000})
shift2zeit.auth('zeitcoinrpc', '3LtYSz3zb7nErtWEPKzAA2vhEAjutqQMrFo3uRFU9Mfh')

module.exports = (panda) => {

router.get('/', function(req, res, next) {
	res.render('pandacoin_main')
});

router.get('/btcshift/', function(req, res, next) {
	panda.getNewAddress()
		.then(token => res.redirect(`/pandacoin/btcshift/${token}`))
		.catch(err => next(err))
});

router.get('/funkshift/', function(req, res, next) {
	panda.getNewAddress()
		.then(token => res.redirect(`/pandacoin/funkshift/${token}`))
		.catch(err => next(err))
});

router.get('/zeitshift', function(req, res, next) {
	panda.getNewAddress()
		.then(token => res.redirect(`/pandacoin/zeitshift/${token}`))
		.catch(err => next(err))
});

router.get('/btcshift/confirm', function(req, res, next) {
	res.render('pandacoin_bitcoin_confirm')
});
router.get('/funkshift/confirm', function(req, res, next) {
	res.render('pandacoin_cypherfunk_confirm')
});

router.get('/zeitshift/confirm', function(req, res, next) {
	res.render('pandacoin_zeitcoin_confirm')
});

router.get('/btcshift/:address/submit', (req, res) => {
	const txns = JSON.parse(fs.readFileSync('/var/www/html/.data/pndbtcshift.json'))
		txns.push(req.query)
			fs.writeFileSync('/var/www/html/.data/pndbtcshift.json', JSON.stringify(txns))
				t_amount = parseFloat(req.query.amount)
				shift2pnd.sendtoaddress(req.query.bitcoin_address, t_amount);
			res.redirect('/pandacoin/btcshift/confirm')
	console.log(req.query)
	console.log(req.query.amount)
	console.log(req.query.bitcoin_address)
});

router.get('/funkshift/:address/submit', (req, res) => {
	const txns = JSON.parse(fs.readFileSync('/var/www/html/.data/pndfunkshift.json'))
		txns.push(req.query)
			fs.writeFileSync('/var/www/html/.data/pndfunkshift.json', JSON.stringify(txns))
				shift2funk.sendtoaddress(req.query.cypherfunk_address, req.query.amount);
			res.redirect('/pandacoin/funkshift/confirm')
	console.log(req.query)
});

router.get('/zeitshift/:address/submit', (req, res) => {
	const txns = JSON.parse(fs.readFileSync('/var/www/html/.data/pndzeitshift.json'))
		txns.push(req.query)
			fs.writeFileSync('/var/www/html/.data/pndzeitshift.json', JSON.stringify(txns))
				shift2zeit.sendtoaddress(req.query.zeitcoin_address, req.query.amount);
			res.redirect('/pandacoin/zeitshift/confirm')
	console.log(req.query)
});

router.get('/funkshift/:address', function(req, res, next) {
	panda.findTransaction(req.params.address)
		.then(trans => res.render('pandacoin_cypherfunk', { title: 'Pandacoin Shift to Cypherfunk', address: req.params.address, trans }))
		.catch(err => res.render('pandacoin_cypherfunk', { title: 'Pandacoin Shift to Cypherfunk', address: req.params.address, error: err.message }))
});

router.get('/btcshift/:address', function(req, res, next) {
	panda.findTransaction(req.params.address)
		.then(trans => res.render('pandacoin_bitcoin', { title: 'Pandacoin Shift to Bitcoin', address: req.params.address, trans }))
		.catch(err => res.render('pandacoin_bitcoin', { title: 'Pandacoin Shift to Bitcoin', address: req.params.address, error: err.message }))
});

router.get('/zeitshift/:address', function(req, res, next) {
	panda.findTransaction(req.params.address)
		.then(trans => res.render('pandacoin_zeitcoin', { title: 'Pandacoin Shift to Zeitcoin', address: req.params.address, trans }))
		.catch(err => res.render('pandacoin_zeitcoin', { title: 'Pandacoin Shift to Zeitcoin', address: req.params.address, error: err.message }))
});
  return router
}

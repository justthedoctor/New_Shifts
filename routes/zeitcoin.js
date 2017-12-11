const fs = require('fs')
var express = require('express');
var router = express.Router();
var shift2btc = require('node-pandacoin')()
var shift2funk = require('node-pandacoin')()
var shift2pnd = require('node-pandacoin')()

shift2btc.set('host', '107.174.34.78')
shift2btc.set({ port: 10002 })
shift2btc.auth('bitcoincoinrpc', '38ZjqLZzb2PQujUmQMCir42Ah4c6KUj6MwBWeqT3ffq7')

shift2funk.set('host', '45.79.170.139')
shift2funk.set({ port: 20001})
shift2funk.auth('Cypherfunkrpc', '3LtYSz3zb7nErtWEPKzAA2vhEAjutqQMrFo3uRFU9Mfh')

shift2pnd.set('host', '')
shift2pnd.set({ port: 2})
shift2pnd.auth('', '')

module.exports = (panda) => {

router.get('/', function(req, res, next) {
	res.render('zeitcoin_main')
});

router.get('/btcshift/', function(req, res, next) {
	panda.getNewAddress()
		.then(token => res.redirect(`/zeitcoin/btcshift/${token}`))
		.catch(err => next(err))
});

router.get('/funkshift/', function(req, res, next) {
	panda.getNewAddress()
		.then(token => res.redirect(`/zeitcoin/funkshift/${token}`))
		.catch(err => next(err))
});

router.get('/pndshift', function(req, res, next) {
	panda.getNewAddress()
		.then(token => res.redirect(`/zeitcoin/pndshift/${token}`))
		.catch(err => next(err))
});

router.get('/btcshift/confirm', function(req, res, next) {
	res.render('zeitcoin_bitcoin_confirm')
});
router.get('/funkshift/confirm', function(req, res, next) {
	res.render('zeitcoin_cypherfunk_confirm')
});

router.get('/pndshift/confirm', function(req, res, next) {
	res.render('zeitcoin_pndcoin_confirm')
});

router.get('/btcshift/:address/submit', (req, res) => {
	const txns = JSON.parse(fs.readFileSync('/var/www/html/.data/pndbtcshift.json'))
		txns.push(req.query)
			fs.writeFileSync('/var/www/html/.data/pndbtcshift.json', JSON.stringify(txns))
				shift2btc.sendtoaddress(req.query.bitcoin_address, req.query.amount);
			res.redirect('/zeitcoin/btcshift/confirm')
	console.log(req.query)
});

router.get('/funkshift/:address/submit', (req, res) => {
	const txns = JSON.parse(fs.readFileSync('/var/www/html/.data/pndfunkshift.json'))
		txns.push(req.query)
			fs.writeFileSync('/var/www/html/.data/pndfunkshift.json', JSON.stringify(txns))
				shift2funk.sendtoaddress(req.query.cypherfunk_address, req.query.amount);
			res.redirect('/zeitcoin/funkshift/confirm')
	console.log(req.query)
});

router.get('/pndshift/:address/submit', (req, res) => {
	const txns = JSON.parse(fs.readFileSync('/var/www/html/.data/pndpndshift.json'))
		txns.push(req.query)
			fs.writeFileSync('/var/www/html/.data/pndpndshift.json', JSON.stringify(txns))
				shift2pnd.sendtoaddress(req.query.pndcoin_address, req.query.amount);
			res.redirect('/zeitcoin/pndshift/confirm')
	console.log(req.query)
});

router.get('/funkshift/:address', function(req, res, next) {
	panda.findTransaction(req.params.address)
		.then(trans => res.render('zeitcoin_cypherfunk', { title: 'zeitcoin Shift to Cypherfunk', address: req.params.address, trans }))
		.catch(err => res.render('zeitcoin_cypherfunk', { title: 'zeitcoin Shift to Cypherfunk', address: req.params.address, error: err.message }))
});

router.get('/btcshift/:address', function(req, res, next) {
	panda.findTransaction(req.params.address)
		.then(trans => res.render('zeitcoin_bitcoin', { title: 'zeitcoin Shift to Bitcoin', address: req.params.address, trans }))
		.catch(err => res.render('zeitcoin_bitcoin', { title: 'zeitcoin Shift to Bitcoin', address: req.params.address, error: err.message }))
});

router.get('/pndshift/:address', function(req, res, next) {
	panda.findTransaction(req.params.address)
		.then(trans => res.render('zeitcoin_pndcoin', { title: 'zeitcoin Shift to pndcoin', address: req.params.address, trans }))
		.catch(err => res.render('zeitcoin_pndcoin', { title: 'zeitcoin Shift to pndcoin', address: req.params.address, error: err.message }))
});
  return router
}

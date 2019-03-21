const tracer = require('dd-trace').init({
    hostname: 'datadog-agent',
    port: 8126
})
const express = require('express')
const app = express()
const StatsD = require('hot-shots');
const dogstatsd = new StatsD();
const dd_options = {'response_code': true, 'tags': ['app:my_app']}
const connect_datadog = require('connect-datadog')(dd_options)

tracer.use('express')
app.use('/', express.static('public'));
app.use(connect_datadog);

app.get('/loaderio-89537a3eb4bfc60da444d2b13a38f8d4', (req, res) => {
    res.send('loaderio-89537a3eb4bfc60da444d2b13a38f8d4')
})

app.get('/', (req, res) => {
    dogstatsd.increment('node.request.count')
    res.send('Kanye is releasing new sneakers on 4.1.19 - check back for updates')
})

app.post('/blue', (req, res) => {
    dogstatsd.increment('node.request.blue')
    res.send('Hitting POST /blue endpoint')
})

app.post('/red', (req, res) => {
    dogstatsd.increment('node.request.red')
    res.send('Hitting POST /red endpoint')
})

// get/blue and get/red routes are for local testing only
// post/blue and post/red will be used for load testing
app.get('/blue', (req, res) => {
    dogstatsd.increment('node.request.blue')
    res.send("Logged a vote for blue")
})

app.get('/red', (req, res) => {
    dogstatsd.increment('node.request.red')
    res.send("Logged a vote for red")
})

app.listen(3000, () => {
    console.log('Server is up on 3000')
})
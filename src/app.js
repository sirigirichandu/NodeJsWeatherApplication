const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const PORT = 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const PublicDirectoryPath = path.join(__dirname, '../public')
const ViewsPath = path.join(__dirname, '../templates/views')
const PartialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', ViewsPath)
hbs.registerPartials(PartialsPath)
app.use(express.static(PublicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        author: 'Chandra Sekhar Sirigiri'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        author: 'Chandra Sekhar Sirigiri'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        author: 'Chandra Sekhar Sirigiri'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Page not Found',
        author: 'Chandra Sekhar Sirigiri'
    })
})

app.get('/*', (req, res) => {
    res.render('404',{
        title: 'Page not Found',
        author: 'Chandra Sekhar Sirigiri'
    })
})

app.listen(PORT, () => {
    console.log('express started')
})
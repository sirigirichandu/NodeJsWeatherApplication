const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/719d9a6e96fdd86fb467ada16f81d686/'+ latitude +','+ longitude

    request( {url, json: true}, (error, { body }) => {        
        if(error){
            callback('Could not able to get info, Please try later', undefined)
        } else if(body.error) {
            callback('Could not able to get data for the location you provided', undefined)
        } else{           
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees fahrenheit out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
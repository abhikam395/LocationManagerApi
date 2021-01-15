var express = require('express');
var router = express.Router();
const Location = require('./../models').Location;
const { checkToken } = require('./../middleware/token-middleware');

router.use(checkToken);

router.get('/', async function(req, res) {
  let locations = await Location.findAll({include: 'user'});
  locations = locations.map(function(location){
    let { id, latitude, longitude, updatedAt, user } = location;
    return {
      id: id,
      latitude: latitude,
      longitude: longitude,
      updatedAt: updatedAt,
      user: {
        id: user ? user.id  : 0,
        name: user ? user.name : null
      }
    }
  })
  res.json({
    status: true,
    data: {
      locations: locations
    }
  })
});

router.post('/', async function(req, res){
  let { latitude, longitude, userId } = req.query;
  let locationObject = Location.update({latitude: latitude, longitude: longitude},{
    where: {
      userId: userId
    }
  });
  locationObject
    .then(data => {
      if(data == null || !data[0]){
        createLocation(userId, latitude, longitude)
          .then(data => {
            res.json({
              status: true,
              message: 'Location object created',
              data: null
            })
          }).catch(err => {
            res.json({
              status: false,
              error: {
                message: err.errors[0].message,
                code: err.parent.code
              }
            })
          })
      }
      else{
        res.json({
          status: true,
          message: 'Location updated',
          data: null
        })
      }
    })
    .catch(err => {
      res.json({
        status: false,
        error: {
          message: 'User id not found'
        }
      })
    })
})

async function createLocation(userId, latitude, longitude){
  return Location.create({
    userId: userId,
    latitude: latitude,
    longitude: longitude
  })
}

module.exports = router;

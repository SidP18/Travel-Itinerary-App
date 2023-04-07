/* const {Router} = require("express");
const { saveToDo, getToDo, updateToDo, deleteToDo } = require("../controllers/ToDoControllers")


const router = Router()

router.get('/', getToDo)
router.post('/save', saveToDo)
router.post('/update', updateToDo)
router.post('/delete', deleteToDo)

module.exports = router;
*/

var express = require('express');
var router = express.Router();
var locations = [
    {
        name: "Denny Lodge",
        id: "ChIJW9_QXt8VkFQRjxIfTNLIlPc",
        position: {
            lat: 47.6237776,
            lng: -122.335088
        },
        url: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        formatted_address: "501 Fairview Ave N, Seattle, WA 98109",
        business_status: "OPERATIONAL",
        rating: 4.5
    },
    {
        name: "Bar Harbor",
        id: "ChIJIXGeJDcVkFQRoS1IiN9C3TY",
        position: {
            lat: 47.622485,
            lng: -122.3338633
        },
        url: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        formatted_address: "400 Fairview Ave N #105, Seattle, WA 98109",
        business_status: "OPERATIONAL",
        rating: 4.5
    }
]

router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

//GET locations
router.get('/location', (req, res) => {
    return res.status(200).send({
        message: "GET location call successful",
        locations: locations
    });
})

modules.export = router;
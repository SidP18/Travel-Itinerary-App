const GoogleApiModel = require('../models/GoogleApiModel')

module.exports.getPlacesData = async (req, res) => {
    const placesdata = await GoogleApiModel.find()
    res.send(placesdata)
}

module.exports.savePlacesData = async (req, res) => {

    const { text } = req.body

    GoogleApiModel
    .create({ text })
    .then((data) => {
        console.log("Added Successfully...")
        console.log(data)
        res.send(data)
    })
}

module.exports.updatePlacesData = async (req, res) => {
    const {_id, text } = req.body
    GoogleApiModel
    .findByIdAndUpdate(_id, {text})
    .then(()=>res.send("Updated Successfully..."))
    .catch((err)=> console.log(err))
}

module.exports.deletePlacesData = async (req, res) => {
    const {_id } = req.body
    GoogleApiModel
    .findByIdAndDelete(_id)
    .then(()=>res.send("Deleted Successfully..."))
    .catch((err) => console.log(err))
}


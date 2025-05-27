const StyleModel = require('../Model/StyleModel');
const fs = require('fs');

const addStyle = async (req, res) => {
    try {
        let imageUrl = "";
        
        if (req.file) {
            if (req.file.size > (1024 * 50)) {
                fs.unlinkSync(`./upload/${req.file.filename}`);
                return res.status(404).send({ message: "Failed", error: "Image size is larger than 50KB" });
            }   
            const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                fs.unlinkSync(`./upload/${req.file.filename}`);
                return res.status(404).send({ message: "Failed", error: "Invalid file extension" });
            }
            imageUrl = `http://localhost:5000/upload/${req.file.filename}`;
        }
        const event = {
            name: req.body.name,
            Date: req.body.Date,
            img: imageUrl
        };
        if(!event.name)
        {
            return res.status(404).send({ message: "Failed", error: "name is required" });
        }
        if(!event.Date)
        {
             return res.status(404).send({ message: "Failed", error: "Date is required" });
        }
        if(!event.img)
        {
           return res.status(404).send({ message: "Failed", error: "img is required" });
        }
        const eventData = await new StyleModel(event).save();
        res.status(201).send({ message: "Success!", data: eventData });

    } catch (error) {
        res.status(400).send({ message: "Request failed", error: error.message });
    }
};

const getStyle = async (req, res) => {
    try {
        const events = await StyleModel.find();
        res.status(200).json({ message: "Success!", data: events });
    } catch (error) {
        res.status(404).json({ message: "Failed to fetch events", error: error.message });
    }
};

module.exports = { addStyle, getStyle};
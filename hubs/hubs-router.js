const express = require('express');

const Hubs = require('../data/db.js');

const router = express.Router();

router.get("/", (req, res) => {
    Hubs.find(req.query)
    .then(hubs => {
        res.status(200).json(hubs)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ 
            error: "The posts information could not be retrieved." 
        });
    });
});

router.post("/", (req, res) => {

    const postInfo = req.body;

    if (postInfo.title == false || postInfo.contents == false) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post"});
    return;
} 
    Hubs.insert(postInfo)
    .then(hub => {
        res.status(201).json(hub)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ 
            error: "There was an error while saving the post to the database" 
        });
    });
});

router.get("/:id", (req, res) => {
    Hubs.findById(req.params.id)
    .then(hubs => {
        if (Hubs === undefined) {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        } else {
            res.status(200).json(hubs)
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ 
            error: "The post information could not be retrieved." 
        });
    });
});



module.exports = router;
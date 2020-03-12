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

router.delete("/:id", (req, res) => {
    Hubs.remove(req.params.id)
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
            error: "The post could not be removed" 
        });
    });
});

router.put("/:id", (req, res) => {
    const postInfo = req.body;

    if (postInfo.title == false || postInfo.contents == false) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post"});
    return;
    }

    Hubs.update(req.params.id, postInfo)
    .then(count => {
        if (count === 1) {
            Hubs.findById(req.params.id)
            .then(hubs => {
                if(hubs === undefined) 
                {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                } else {
                    res.status(200).json(hubs)
                }
            })
            .catch(err => {
                console.log(err)
                res.status()
            })
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

router.get("/:id/comments", (req, res) => {
    Hubs.findPostComments(req.params.id)
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
            error: "The comments information could not be retrieved." 
        });
    });
});

router.post("/:id/comments", (req, res) => {

    const postInfo = req.body;

    postInfo.post_id = req.params.id;

    if (postInfo.text == false) {
        res.status(400).json({errorMessage: "Please provide text for the comment."});
        return;
    } 
    Hubs.insertComment(postInfo)
    .then(hub => {
        res.status(201).json(hub)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ 
            error: "There was an error while saving the comment to the database" 
        });
    });
});

module.exports = router;
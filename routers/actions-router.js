const express = require('express');
const router = express.Router();
const db = require('../data/helpers/actionModel');
const {checkForProjectForAction,checkDescription,checkForAction} = require('../middleware');

router.get('/:id',(req,res) => {
    const { id } = req.params;
    db.get(id)
    .then(resp => {
        if(resp === null){
            res.status(400).json({msg: 'No Action with that ID'});
        }else{
            res.status(200).json(resp);
        }
    })
    .catch(err => {
        res.status(500).json({err: 'Problem geting action from database'});
        console.log(err);
    })
});
router.post('/',checkForProjectForAction,checkDescription,(req,res) => {
    const data = req.body;
    db.insert(data)
    .then(resp => {
        res.status(201).json(resp);
    })
    .catch(err => {
        res.status(500).json({err: 'Problem creating action'});
        console.log(err);
    })
})
router.delete('/:id',checkForAction, (req,res) => {
    const { id } = req.params;
    db.remove(id)
    .then(resp => {
        res.status(200).json(resp);
    })
    .catch(err => {
        res.status(500).json({err:'Problem deleteing action'});
        console.log(err);
    })
});
router.put('/:id',checkForAction,checkForProjectForAction, (req,res) => {
    const { id } = req.params;
    const data = req.body;
    db.update(id,data)
    .then(resp => {
        res.status(201).json(resp);
    })
    .catch(err => {
        res.json(500).json({err:'problem saving changes'});
        console.log(err);
    });


});

module.exports = router;
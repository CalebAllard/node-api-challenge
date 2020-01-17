const express = require('express');
const router = express.Router();
const db = require('../data/helpers/projectModel');

const {validatePostProject,checkForProject} = require('../middleware');

//Projects CRUD
router.get('/', (req,res) => {
    db.get()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err: 'Problem retreiving data from database.'})
    });
});
router.post('/', validatePostProject,(req,res) => {
    const data = req.body;
    db.insert(data)
    .then(resp => {
        res.status(200).json(resp);
    
    })
    .catch(err => {
        res.status(500).json({err: 'Problem adding project'});
    });
});

router.get('/:id', (req,res) => {
    const { id } = req.params;
    db.get(id)
    .then(resp => {
        if(resp === null){
            res.status(400).json({msg: 'no project with that id'});
        }
        res.status(200).json(resp);
    })
    .catch(err => {
        res.status(500).json({err: 'problem retriving a project with that id'})
    })
})

router.delete('/:id', checkForProject, (req,res) => {
    const { id } = req.params;
    db.remove(id)
    .then(resp => {
        res.status(200).json(resp);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json('Problem removing project');
    })
});

router.put('/:id', checkForProject, (req,res) => {
    const { id } = req.params;
    const data = req.body;
    db.update(id, data)
    .then(resp => {
        res.status(201).json(resp);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err: 'Problem updating Project'});
    })
})
// Get allactions for project
router.get('/:id/actions',checkForProject,(req,res) => {
    const { id } = req.params;
    db.getProjectActions(id)
    .then(resp => {
        res.status(200).json(resp);
    })
    .catch(err =>{
        res.status(500).json({err:'Problem getting actions'});
        console.log(err);
    })
})


module.exports = router;
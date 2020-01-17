const pdb = require('../data/helpers/projectModel.js');
const adb = require('../data/helpers/actionModel.js');
function logger(req,res,next){
    const date = new Date();
    console.log(`${req.method} "${req.url}" @ ${date.getHours()}:${date.getMinutes()} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
    next();
}

function validatePostProject(req,res,next){
    const data = req.body;
    if (!data.name || !data.description){
        res.status(400).json({msg: 'You need a name and description to add a project'});
    }else{
        next();
    }
}


function checkForProject(req,res,next){
    const { id } = req.params;
    pdb.get(id)
    .then(resp => {
        if (resp === null){
            res.status(400).json({msg: 'No project with that id'});
        }else{
            next();
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err:'problem when validating id'});
    });
}
function checkForProjectForAction(req,res,next){
    const  id  = req.body.project_id;
    pdb.get(id)
    .then(resp => {
        if (resp === null){
            res.status(400).json({msg: 'No project with that id'});
        }else{
            next();
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err:'problem when validating id'});
    });
}
function checkDescription (req,res,next){
    const body = req.body;
    if(!body.description){
        res.status(400).json({msg:'description needed'})
    }else if(!body.notes){
        res.status(400).json({msg:'Notes field needed needed'})
    }else{
        next();
    }
}

function checkForAction(req,res,next){
    const { id } = req.params;
    adb.get(id)
    .then(resp => {
        if (resp === null){
            res.status(400).json({msg: 'No action with that id'});
        }else{
            next();
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err:'problem when validating id'});
    });
}

module.exports = {
    logger,
    validatePostProject,
    checkForProject,
    checkForProjectForAction,
    checkDescription,
    checkForAction
    
};
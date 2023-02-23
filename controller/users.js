const { response } = require('express')


const getUsers = (req, res = response ) =>{
    res.status(403).json({
        msg: 'get API - controller'
    });
}

const postUsers = (req, res) =>{

    const {} = req.body;

    res.status(403).json({
        msg: 'post API - controller',
        body
    })
}

const putUsers =  (req, res) =>{

    const id = req.params.id

    res.status(403).json({
        msg: 'put API - controller',
        id
    })
}

const patchUsers = (req, res) =>{
    res.status(403).json({
        msg: 'patch API - controller'
    })
}

const deleteUsers = (req, res) =>{
    res.status(403).json({
        msg: 'delete API - controller'
    })
}


module.exports = {
    getUsers,
    putUsers,
    postUsers,
    patchUsers,
    deleteUsers
};
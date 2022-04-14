const noteModel = require("../model/noteModel");

exports.getAllNotes = async (req, res) => {
    try {
        const result = await noteModel.find({userID: req.body.userID});
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: true, message: "Something when wrong"})
    }
}

exports.addNote = async (req, res) => {
    try {
        const result = await noteModel.create(req.body)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);

        let message = "Something when wrong"
        if(error.code == 11000) {
            message = "This title is taken"
        }

        res.status(500).json({error: true, message: message})
    }
}

exports.findNote = async (req, res) => {
    try {
        const result = await noteModel.find({_id: req.params.id, userID: req.body.userID})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: true, message: "Something when wrong"})
    }
}

exports.patchNote = async (req, res) => {
    try {
        const result = await noteModel.findOneAndUpdate( 
            {_id: req.params.id, userID: req.body.userID},
            req.body
        )
        res.status(200).json(result)
    } catch (error) {
        console.log(error);

        let message = "Something when wrong"
        if(error.code == 11000) {
            message = "This title is taken"
        }

        res.status(500).json({error: true, message: message})
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const result = await noteModel.findOneAndDelete({_id: req.params.id, userID: req.body.userID})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: true, message: "Something when wrong"})
    }
}

exports.recentNotes = async (req,res) => {
    try {
        const result = await noteModel.find({ userID: req.body.userID}).sort({dateCreated: -1}).limit(3)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: true, message: "Something when wrong"})
    }
}

exports.getImportantNotes = async (req, res) => {
    try {
        const result = await noteModel.find({userID: req.body.userID, important: true})
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: true, message: "Something when wrong"})
    }
}

exports.getNotesByDate = async (req,res) => {
    const startOfDate = new Date(req.body.date)
    startOfDate.setUTCHours(0,0,0,0)

    const endOfDate = new Date(req.body.date)
    endOfDate.setUTCHours(23,59,59,999)

    try {
        const result = await noteModel.find({
            userID: req.body.userID,
            dateCreated: {$gte: startOfDate.toISOString(), $lte: endOfDate.toISOString()}
        })
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: true, message: "Something when wrong"})
    }
}
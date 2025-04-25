const Schedule = require('../models/schedule');
const User = require('../models/user')

exports.setSchedule = async (req, res) => {
    try {
        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser) {
            return res.status(403).json({ message: 'Only logged-in users have access.' });
        }

        const { plantName, watering, pruning, fertilizing } = req.body;
        if (!plantName || (!watering && !pruning && !fertilizing)) {
            return res.status(400).json({
                message: 'Please provide plant name and atleast one care method to schedule.',
            })
        }
        const schedule = new Schedule({ plantName, watering, pruning, fertilizing, scheduledBy: loggedinid });
        await schedule.save()
        res.status(201).json({
            message: `Plant care scheduled successfully.`,
            schedule
        })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.deleteSchedule = async (req, res) => {
    try {
        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser) {
            return res.status(403).json({ message: 'Only logged-in users have access.' });
        }

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Please provide schedule id to delete.',
            })
        }

        const schedule = await Schedule.findOneAndDelete({_id:id, scheduledBy: loggedinid });
        if(!schedule){
            return res.status(404).json({message:"No schedule found with the id."})
        }
        res.status(200).json({
            message: `Plant care schedule deleted successfully.`,
        })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};

exports.getSchedules = async (req, res) => {
    try {
        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser) {
            return res.status(403).json({ message: 'Only logged-in users have access.' });
        }

        const schedule = await Schedule.find({ scheduledBy: loggedinid });
        if(!schedule.length){
            return res.status(200).json({message:"No saved schedules yet."})
        }
        res.status(200).json({
            message: `Plant care schedule.`,
            schedule
        })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};
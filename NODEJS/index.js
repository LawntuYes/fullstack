// this is the beginning of the API course
import express from 'express';
import {connectDB} from './lib/connect.js';
import User from './models/user.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/add', async (req,res) => {
    try {
        const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return  res.status(400).json({message: 'All fields are required'});
    }

    const emailExists = await User.findOne({email});
    if(emailExists) {
        return res.status(409).json({success: false, message: 'Email already exists'});
    }

    const user = await User.create({name, email, password});

    return res.status(201).json({ success: true, user, message:"User Created"});
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

app.patch('/update/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        const user = await User.findById
        (id);
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        user.name = name;

        await user.save();

        return res.status(200).json({success: true, user, message: 'User updated successfully'});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

app.delete('/delete/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }
        return res.status(200).json({success: true, message: 'User deleted successfully'});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        const filtered = users
            .filter(u => (u.password || '').length > 5)
            .map(u => {
                const obj = u.toObject();
                delete obj.password; // don't return passwords
                return obj;
            });
        return res.status(200).json({ success: true, users: filtered });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

// connectDB();

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
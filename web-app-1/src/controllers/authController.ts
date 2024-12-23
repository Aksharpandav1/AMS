import { Request, Response } from 'express';
import User from '../models/User';

class AuthController {
    async register(req: Request, res: Response) {
        const { username, password } = req.body;
        // Logic for registering a new user
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body;
        // Logic for user authentication
        const user = await User.findOne({ username });
        if (user && user.password === password) {
            req.session.userId = user._id;
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }

    async logout(req: Request, res: Response) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    }
}

export default new AuthController();
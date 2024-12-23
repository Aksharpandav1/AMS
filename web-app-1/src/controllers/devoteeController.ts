import { Request, Response } from 'express';
import Devotee from '../models/Devotee';

class DevoteeController {
    async addDevotee(req: Request, res: Response) {
        const { serialNumber, name, address, position, contactNumber } = req.body;
        const devotee = new Devotee({ serialNumber, name, address, position, contactNumber });
        await devotee.save();
        res.status(201).json({ message: 'Devotee added successfully', devotee });
    }

    async getDevotees(req: Request, res: Response) {
        const devotees = await Devotee.find();
        res.status(200).json(devotees);
    }

    async searchDevotee(req: Request, res: Response) {
        const { query } = req.params;
        const devotee = await Devotee.findOne({ $or: [{ name: query }, { serialNumber: query }] });
        if (devotee) {
            res.status(200).json(devotee);
        } else {
            res.status(404).json({ message: 'Devotee not found' });
        }
    }

    async updateDevotee(req: Request, res: Response) {
        const { id } = req.params;
        const updatedDevotee = await Devotee.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedDevotee) {
            res.status(200).json({ message: 'Devotee updated successfully', updatedDevotee });
        } else {
            res.status(404).json({ message: 'Devotee not found' });
        }
    }

    async deleteDevotee(req: Request, res: Response) {
        const { id } = req.params;
        const deletedDevotee = await Devotee.findByIdAndDelete(id);
        if (deletedDevotee) {
            res.status(200).json({ message: 'Devotee deleted successfully' });
        } else {
            res.status(404).json({ message: 'Devotee not found' });
        }
    }
}

export default new DevoteeController();
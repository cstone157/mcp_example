import * as adoptionService from '../services/adoption.service.js';

export const createAdoption = (req, res) => {
    const { catId, personId } = req.body;

    if (!catId || !personId) {
        return res.status(400).json({ message: 'catId and personId are required' });
    }

    try {
        const result = adoptionService.adoptCat(catId, personId);
        res.status(200).json(result);
    } catch (error) {
        // Determine status code based on error message (simplified)
        const status = error.message.includes('not found') ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};

export const deleteAdoption = (req, res) => {
    const { catId } = req.params;

    try {
        const result = adoptionService.surrenderCat(catId);
        res.status(200).json({ message: 'Cat surrendered successfully', cat: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
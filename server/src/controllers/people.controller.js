import * as peopleService from '../services/people.service.js';

export const getPeople = (req, res) => {
    const people = peopleService.getAllPeople();
    res.status(200).json(people);
};

export const createPerson = (req, res) => {
    const { firstName, lastName, email } = req.body;

    // Basic Validation
    if (!firstName || !email) {
        return res.status(400).json({ message: 'First name and email are required' });
    }

    const newPerson = peopleService.createPerson({ firstName, lastName, email });
    res.status(201).json(newPerson);
};

export const updatePerson = (req, res) => {
    const { id } = req.params;
    const updatedPerson = peopleService.updatePerson(id, req.body);

    if (!updatedPerson) {
        return res.status(404).json({ message: 'Person not found' });
    }

    res.status(200).json(updatedPerson);
};

export const deletePerson = (req, res) => {
    const { id } = req.params;
    const success = peopleService.deletePerson(id);

    if (!success) {
        return res.status(404).json({ message: 'Person not found' });
    }

    res.status(204).send();
};
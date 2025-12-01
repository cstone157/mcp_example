import * as catService from './cat.service.js';
import * as peopleService from './people.service.js';

export const adoptCat = (catId, personId) => {
    // 1. Validate Cat exists
    const cat = catService.getCatById(catId);
    if (!cat) {
        throw new Error('Cat not found');
    }

    // 2. Validate Person exists
    const person = peopleService.getPersonById(personId);
    if (!person) {
        throw new Error('Person not found');
    }

    // 3. Business Rule: Check if cat is already adopted
    if (cat.ownerId) {
        throw new Error(`Cat is already adopted by Person ID: ${cat.ownerId}`);
    }

    // 4. Perform the adoption (Update the cat with the new owner)
    const updatedCat = catService.updateCat(catId, { 
        ownerId: personId,
        adoptionDate: new Date().toISOString()
    });

    // Return a composite object showing the result
    return {
        success: true,
        message: 'Adoption successful',
        cat: updatedCat,
        owner: person
    };
};

// Optional: Logic to 'return' a cat (un-adopt)
export const surrenderCat = (catId) => {
    const cat = catService.getCatById(catId);
    if (!cat) throw new Error('Cat not found');

    if (!cat.ownerId) throw new Error('This cat is not currently adopted');

    // Remove ownerId
    const updatedCat = catService.updateCat(catId, { 
        ownerId: undefined, 
        adoptionDate: undefined 
    });

    return updatedCat;
};
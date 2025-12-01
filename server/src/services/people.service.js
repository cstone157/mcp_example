// In-memory store
let people = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' }
];

export const getAllPeople = () => {
    return people;
};

export const createPerson = (personData) => {
const newPerson = {
    id: Date.now().toString(),
    ...personData
};
people.push(newPerson);
return newPerson;
};

export const updatePerson = (id, updateData) => {
    const index = people.findIndex((p) => p.id === id);

    if (index === -1) return null;

    // Merge existing data with updates
    people[index] = { ...people[index], ...updateData };
    return people[index];
};

export const deletePerson = (id) => {
    const index = people.findIndex((p) => p.id === id);

    if (index === -1) return false;

    people.splice(index, 1);
    return true;
};

export const getPersonById = (id) => {
    return people.find((p) => p.id === id);
};
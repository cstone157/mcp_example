// src/services/cat.service.js

// Simulating a database in memory
let cats = [
    { id: '1', name: 'Whiskers', breed: 'Siamese', age: 3 },
    { id: '2', name: 'Felix', breed: 'Tabby', age: 5 }
  ];
  
  export const getAllCats = () => {
    return cats;
  };
  
  export const createCat = (catData) => {
    const newCat = {
      id: Date.now().toString(), // Simple ID generation
      ...catData
    };
    cats.push(newCat);
    return newCat;
  };
  
  export const updateCat = (id, updateData) => {
    const index = cats.findIndex((cat) => cat.id === id);
    
    if (index === -1) return null;
  
    // Merge existing cat with new data
    cats[index] = { ...cats[index], ...updateData };
    return cats[index];
  };
  
  export const deleteCat = (id) => {
    const index = cats.findIndex((cat) => cat.id === id);
    
    if (index === -1) return false;
  
    cats.splice(index, 1);
    return true;
  };
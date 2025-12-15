// Simulating a database in memory
let parts = [
    { id: '1', name: 'Screw 1/8 by 1', description: 'You know what a screw is' }
  ];
  
  export const getAllParts = () => {
    return parts;
  };
  
  export const createPart = (partData) => {
    const newPart = {
      id: Date.now().toString(), // Simple ID generation
      ...partData
    };
    parts.push(newPart);
    return newPart;
  };
  
  export const updatePart = (id, updateData) => {
    const index = parts.findIndex((part) => part.id === id);
    
    if (index === -1) return null;
  
    // Merge existing Part with new data
    parts[index] = { ...parts[index], ...updateData };
    return parts[index];
  };
  
  export const deletePart = (id) => {
    const index = parts.findIndex((part) => part.id === id);
    
    if (index === -1) return false;
  
    parts.splice(index, 1);
    return true;
  };
  
  export const getPartById = (id) => {
    return parts.find((part) => part.id === id);
  };
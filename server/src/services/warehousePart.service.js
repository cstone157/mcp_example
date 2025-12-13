// Simulating a database in memory
let warehouseParts = [
    { partId: '1', warehouseId: '1', number: 10000, row: '1', shelf: '1' }
  ];
  
  export const getAllWarehousePartss = () => {
    return warehousePartss;
  };
  
  export const createWarehouseParts = (warehousePartsData) => {
    const newWarehousePart = {
      id: Date.now().toString(), // Simple ID generation
      ...warehousePartData
    };
    warehouseParts.push(newWarehousePart);
    return newWarehousePart;
  };
  
  export const updateWarehousePart = (id, updateData) => {
    const index = warehouseParts.findIndex((warehousePart) => warehousePart.id === id);
    
    if (index === -1) return null;
  
    // Merge existing WarehousePart with new data
    warehouseParts[index] = { ...warehouseParts[index], ...updateData };
    return warehouseParts[index];
  };
  
  export const deleteWarehousePart = (id) => {
    const index = warehouseParts.findIndex((warehousePart) => warehousePart.id === id);
    
    if (index === -1) return false;
  
    warehouseParts.splice(index, 1);
    return true;
  };
  
  export const getWarehousePartById = (id) => {
    return warehouseParts.find((warehousePart) => warehousePart.id === id);
  };
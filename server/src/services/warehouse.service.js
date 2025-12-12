// Simulating a database in memory
let warehouses = [
  { id: '1', name: 'Las Vegas Site A', street: '555 Fake St', city: 'Las Vegas', state: 'NV', zip: '55555' }
];

export const getAllWarehouses = () => {
  return warehouses;
};

export const createWarehouse = (warehouseData) => {
  const newWarehouse = {
    id: Date.now().toString(), // Simple ID generation
    ...warehouseData
  };
  warehouses.push(newWarehouse);
  return newWarehouse;
};

export const updateWarehouse = (id, updateData) => {
  const index = warehouses.findIndex((warehouse) => warehouse.id === id);
  
  if (index === -1) return null;

  // Merge existing Warehouse with new data
  warehouses[index] = { ...warehouse[index], ...updateData };
  return warehouses[index];
};

export const deleteWarehouse = (id) => {
  const index = warehouses.findIndex((warehouse) => warehouse.id === id);
  
  if (index === -1) return false;

  warehouses.splice(index, 1);
  return true;
};

export const getWarehouseById = (id) => {
  return warehouses.find((warehouse) => warehouse.id === id);
};
// Save and retreive nodes and edges locally
const getSavedItems = (type: string) => {
  if (!type) {
    return;
  }

  const nodes = localStorage.getItem(type);
  if (nodes) {
    return JSON.parse(nodes);
  }
  return null;
};

export const getSavedNodes = () => getSavedItems('nodes');

export const getSavedEdges = () => getSavedItems('edges');

export const saveNodes = (nodes: any) => localStorage.setItem('nodes', JSON.stringify(nodes));
export const saveEdges = (edges: any) => localStorage.setItem('edges', JSON.stringify(edges));

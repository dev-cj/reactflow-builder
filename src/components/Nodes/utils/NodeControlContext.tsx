import React, { useContext } from 'react';
import type { Node } from 'reactflow';

export interface UpdateNodeProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export interface ContextProps extends UpdateNodeProps {
  selectedNode: string;
  nodes: Node[];
  clearNodeSelection: VoidFunction;
}
export const NodeContext = React.createContext<ContextProps | undefined>(undefined);

/**
 * NodeControlContext provides methods and state to update nodes, edges and other settings
 */
export const useNodeControlContext = () => {
  const controls = useContext(NodeContext);
  if (controls === undefined) {
    throw new Error('useNodeControlContext must be used within a NodeContext');
  }
  return controls;
};

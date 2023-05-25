import React from 'react';
import { NodeType } from 'components/Nodes/utils/nodeTypes';

interface WithDraggableProps {
  type: NodeType;
  children: React.ReactNode;
}

/**
 * Use this Wrapper to add draggable functionality to a Element
 */
const WithDraggable = ({ type, children }: WithDraggableProps) => {
  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <div draggable onDragStart={onDragStart}>
      {children}
    </div>
  );
};

export default WithDraggable;

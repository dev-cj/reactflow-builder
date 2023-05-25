import React from 'react';
import { Node } from 'reactflow';
import { UpdateNodeProps } from 'components/Nodes/utils/NodeControlContext';

interface Props extends UpdateNodeProps {
  node: Node;
}

const UpdateMessageNode = ({ setNodes, node }: Props) => {
  const updateNodeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nodeId = node.id;
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, label: e.target.value || '' },
          };
        }
        return node;
      });
    });
  };

  return (
    <div className="gap-4 border-b p-2">
      <div className="text-lg font-semibold">Text</div>
      <textarea
        value={node.data.label}
        placeholder="Write your message here..."
        onChange={updateNodeText}
        className="h-auto w-full border p-2 outline-none ring-blue-300 focus:ring"
        rows={10}
      />
    </div>
  );
};

export default UpdateMessageNode;

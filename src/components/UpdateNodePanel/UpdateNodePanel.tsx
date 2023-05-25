import UpdateMessageNode from './UpdateMessageNode';
import { BiArrowBack as BackButton } from 'react-icons/bi';
import { useNodeControlContext } from 'components/Nodes/utils/NodeControlContext';

const UpdateNodePanel = () => {
  const { selectedNode, nodes, setNodes, clearNodeSelection } = useNodeControlContext();

  const node = nodes.find((node) => node.id === selectedNode);
  // Add more node changing components, and pass node and setNodes to update
  return (
    <div className="flex w-full flex-col">
      <div className="mb-2 flex border border-b p-2">
        <BackButton onClick={clearNodeSelection} size={28} className="cursor-pointer" />

        <div className="w-full text-center font-semibold">
          {node?.type === 'message' ? 'Message' : ''}
        </div>
      </div>

      {node?.type === 'message' ? <UpdateMessageNode setNodes={setNodes} node={node} /> : null}
    </div>
  );
};

export default UpdateNodePanel;

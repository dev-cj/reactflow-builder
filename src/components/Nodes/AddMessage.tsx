import { BsChatText } from 'react-icons/bs';
import WithDraggable from 'shared/wrappers/withDraggable';
import { NodeTypes } from './utils/nodeTypes';

const AddMessage = ({}) => {
  return (
    <WithDraggable type={NodeTypes.message}>
      <div className="flex cursor-move flex-col items-center justify-center space-y-2 rounded-lg bg-primary p-6 font-semibold text-primary-content">
        <BsChatText size={40} />
        <p>Message</p>
      </div>
    </WithDraggable>
  );
};

export default AddMessage;

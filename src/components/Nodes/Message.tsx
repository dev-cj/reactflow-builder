import { Handle, Position, useEdges } from 'reactflow';
import type { NodeProps } from 'reactflow';
import cn from 'classnames';
import { useMemo } from 'react';

const Message = ({ data, selected, id }: NodeProps) => {
  const edges = useEdges();

  const isSourceConnected = useMemo(() => {
    // Source cannot have more than one edge originating from it.
    // Once source has an edge originating from it. Disable source connectable.
    // Prevent edge origination from source.
    const sourceConnected = edges.some((edge) => edge.source === id);
    return !sourceConnected;
  }, [edges]);

  return (
    <div
      className={cn(
        'min-h-16 flex h-auto w-auto max-w-xs flex-col items-center rounded-lg border bg-gray-100 drop-shadow-lg',
        selected && 'ring ring-blue-400'
      )}
    >
      <Handle position={Position.Left} type={'target'} />
      <Handle position={Position.Right} type={'source'} isConnectableStart={isSourceConnected} />
      <span className="flex h-8 w-full items-center rounded-t-md bg-green-300 px-4 font-semibold text-gray-800">
        Send Message
      </span>
      <div className="h-auto w-full overflow-y-auto break-normal p-2">{data.label} </div>
    </div>
  );
};

export default Message;

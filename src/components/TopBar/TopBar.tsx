import { useNodes, useEdges } from 'reactflow';
import toast from 'react-hot-toast';
import { memo } from 'react';
import cn from 'classnames';
import { saveEdges, saveNodes } from 'shared/utils';

const TopBar = () => {
  const edges = useEdges();
  const nodes = useNodes();
  const onSaveClick = () => {
    const targetHandles: { [x: string]: any } = {};
    if (!nodes.length) {
      return;
    }
    edges.forEach((edge) => (targetHandles[edge.target] = true));

    let nodeWithoutTarget = 0;
    for (const node of nodes) {
      if (nodeWithoutTarget > 1) {
        break;
      }
      if (!targetHandles[node.id]) {
        nodeWithoutTarget++;
      }
    }
    if (nodes.length > 1 && nodeWithoutTarget > 1) {
      // Not saving if there are more than one Nodes and more than one Nodes have empty target handles
      toast.error('Cannot save flow');
    } else {
      saveNodes(nodes);
      saveEdges(edges);
      toast.success('Flow saved successfully');
    }
  };

  return (
    <div className="navbar flex h-full flex-row justify-between bg-base-200 px-0">
      <div></div>
      <div className="flex h-full w-[20vw] items-center justify-center">
        <div
          className={cn(
            'btn-outline  btn-wide btn-sm btn normal-case',
            nodes.length == 0 ? 'btn-disabled' : 'btn-primary'
          )}
          onClick={onSaveClick}
        >
          Save Changes
        </div>
      </div>
    </div>
  );
};

export default memo(TopBar, () => false);

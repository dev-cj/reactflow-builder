import { memo } from 'react';
import AddNodesPanel from '../AddNodesPanel/AddNodesPanel';
import UpdateNodePanel from '../UpdateNodePanel/UpdateNodePanel';

const Sidebar = ({ nodeSelected = false }) => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start border">
      {nodeSelected ? <UpdateNodePanel /> : <AddNodesPanel />}
    </div>
  );
};

export default memo(Sidebar);

import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  MarkerType,
} from 'reactflow';
import type { Node, Edge, Connection } from 'reactflow';
import 'reactflow/dist/style.css';

import { NodeMap } from 'components/Nodes/utils/nodeTypes';
import { NodeContext } from 'components/Nodes/utils/NodeControlContext';
import { v4 as uuidv4 } from 'uuid';
import { getSavedEdges, getSavedNodes } from 'shared/utils';
import Sidebar from 'components/SideBar';
import TopBar from 'components/TopBar';

const Builder = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(getSavedNodes() || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(getSavedEdges() || []);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const [selectedNode, setSelectedNode] = useState('');

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const sourceAlreadyConnected = edges.some((edge) => edge.source === params.source);
      if (sourceAlreadyConnected) {
        // A source cannot have two originating edge
        // This prevents a target to connect to such source.
        // If a target tries to connect to a source which has another edge originating from it return and don't allow connecting
        return;
      }

      setEdges((edges) => {
        return addEdge(
          {
            ...params,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            style: {
              strokeWidth: 2,
            },
          },
          edges
        );
      });
    },
    [edges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!wrapperRef.current || !reactFlowInstance) {
        return;
      }

      const reactFlowBounds = wrapperRef.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      setNodes((nodes) => {
        const newNode = {
          id: uuidv4(),
          type,
          position,
          data: { label: `Text ${type} ${nodes.length + 1}` },
        };
        return [...nodes, newNode];
      });
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    [setNodes]
  );

  const clearNodeSelection = useCallback(() => {
    setSelectedNode('');
    // Clear node selection from nodes
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.selected) {
          return {
            ...node,
            selected: false,
          };
        }
        return node;
      });
    });
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col">
      <ReactFlowProvider>
        <div>
          <TopBar />
        </div>

        <div className="flex h-full">
          <div className="flex w-[80vw]" ref={wrapperRef}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onInit={setReactFlowInstance}
              nodeTypes={NodeMap}
              onNodeClick={onNodeClick}
              onPaneClick={clearNodeSelection}
              deleteKeyCode={null}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
          <NodeContext.Provider
            value={{
              selectedNode: selectedNode,
              nodes: nodes,
              setNodes: setNodes,
              clearNodeSelection: clearNodeSelection,
            }}
          >
            <div className="w-[20vw]">
              <Sidebar nodeSelected={!!selectedNode} />
            </div>
          </NodeContext.Provider>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Builder;

import { ComponentType } from 'react';
import Message from '../Message';
import { NodeProps } from 'reactflow';

export const NodeTypes = {
  message: 'message' as const,
  email: 'email' as const,
};

export type NodeType = keyof typeof NodeTypes;

type NodeComponentMap = {
  [key in NodeType]?: ComponentType<NodeProps>;
};

export const NodeMap: NodeComponentMap = {
  [NodeTypes.message]: Message,
};

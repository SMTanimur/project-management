import React from 'react';
import { useConnection } from '@xyflow/react';

export const ConnectionLine = ({ fromX, fromY, toX, toY }:any) => {
  const { fromHandle } = useConnection();

  return (
    <g>
      <path
        fill="none"
        stroke={fromHandle?.id as string}
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={fromHandle?.id as string}
        strokeWidth={1.5}
      />
    </g>
  );
};

import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  label,
  markerEnd,
}: any) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ stroke: `${data?.color}`, strokeWidth: 4 }}
      />

      <EdgeLabelRenderer>
        {label && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              backgroundColor: '#EEF0F6',
              fill: '#EEF0F6',
              pointerEvents: 'all',
              padding: '4px',
            }}
            className='nodrag nopan'
          >
            {label}
          </div>
        )}
      </EdgeLabelRenderer>

      <circle
        style={{ filter: `drop-shadow(3px 3px 5px ${data?.color}` }}
        r="10"
        fill={`${data?.color}`}
        className='size-5 rounded-full'
      >
        <animateMotion dur='6s' repeatCount='indefinite' path={edgePath} />
      </circle>
    </>
  );
}

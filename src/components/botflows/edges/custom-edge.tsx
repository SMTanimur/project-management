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
      {/* Base edge with customized stroke */}
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ stroke: `${data?.color}`, strokeWidth: 6, strokeOpacity: 0.5 }}
      />

      {/* Label renderer */}
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

      {/* SVG container for animation */}
      <svg>
        {/* Animated circle (bubble) */}
        <circle
          r="10"
          fill={`${data?.color}`}
          style={{ filter: `drop-shadow(3px 3px 5px ${data?.color})` }}
        >
          {/* Animation along the path */}
          <animateMotion dur='4s' repeatCount='indefinite'>
            <mpath href={`#${id}-path`} />
          </animateMotion>
        </circle>

        {/* Path definition for animation reference */}
        <path id={`${id}-path`} d={edgePath} fill="transparent" stroke="transparent"/>
      </svg>
    </>
  );
}
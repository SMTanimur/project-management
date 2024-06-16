
import { getBezierPath, BaseEdge, EdgeLabelRenderer } from 'reactflow';

export default function CustomEdge({
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
}:any) {
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
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ stroke: `${data.color1}`, strokeWidth: 4 }} />

            <EdgeLabelRenderer>
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
                    className="nodrag nopan"
                >
                    {label}
                </div>
            </EdgeLabelRenderer>

            <circle
                style={{ filter: `drop-shadow(3px 3px 5px ${data.color1}` }}
                r="4"
                fill={`${data.color1}`}
                className="circle"
            >
                <animateMotion dur="6s" repeatCount="indefinite" path={edgePath} />
            </circle>
        </>
    );
}
import { useEffect, useRef, useState } from "react";

export default function BarChart({ data, height = 120, barRadius = 6, color = "#0ea5e9", labels = [], showValues = true }) {
  const max = Math.max(1, ...data);
  const svgRef = useRef(null);
  const [hover, setHover] = useState(null);
  const chartWidth = data.length * 18;
  const barWidth = chartWidth / data.length;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.querySelectorAll("rect").forEach((rect, idx) => {
      rect.animate(
        [
          { transform: "scaleY(0)", transformOrigin: "bottom" },
          { transform: "scaleY(1)", transformOrigin: "bottom" },
        ],
        { duration: 500 + idx * 40, easing: "cubic-bezier(.2,.8,.2,1)" }
      );
    });
  }, [data.join(",")]);

  return (
    <div className="w-full relative overflow-x-auto">
      {hover && (
        <div
          className="absolute -top-2 right-2 z-10 rounded-lg text-xs px-3 py-2 shadow-lg border"
          style={{
            backgroundColor: "var(--surface-secondary)",
            borderColor: "var(--ring)",
            color: "var(--text-primary)",
          }}
        >
          <div className="font-medium">
            {labels[hover.index] ? `${labels[hover.index]}: ` : ""}
            {hover.value}
          </div>
        </div>
      )}
      <svg ref={svgRef} viewBox={`0 0 ${chartWidth} ${height}`} className="w-full h-32 overflow-visible">
        {data.map((v, i) => {
          const h = (v / max) * (height - 20);
          const x = i * barWidth + 2;
          const y = height - h - 18;
          const w = barWidth - 4;
          const isHovered = hover?.index === i;
          return (
            <g key={i} onMouseEnter={() => setHover({ index: i, value: v })} onMouseLeave={() => setHover(null)}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={barRadius}
                fill={color}
                opacity={isHovered ? 1 : 0.8}
                style={{
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                  transformOrigin: "bottom",
                }}
              />
              {showValues && v > 0 ? (
                <text
                  x={x + w / 2}
                  y={y - 2}
                  fontSize={5}
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  style={{ fontWeight: "bold" }}
                >
                  {v}
                </text>
              ) : null}
              <text
                x={x + w / 2}
                y={height - 4}
                fontSize={4}
                textAnchor="middle"
                fill="var(--text-muted)"
                style={{ fontWeight: "500" }}
              >
                {labels[i] ?? ""}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

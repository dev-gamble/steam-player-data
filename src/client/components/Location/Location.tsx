import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { geoPath, geoOrthographic } from 'd3-geo';
import { feature } from 'topojson-client';
import { FeatureCollection, Geometry } from 'geojson';
import { Topology } from 'topojson-specification';
import './Location.css'

type Props = {
  width?: number;
  height?: number;
};

const Location: React.FC<Props> = ({ width = 550, height = 350 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear on re-render

    const projection = geoOrthographic()
      .scale(width / 3) // Adjust as needed
      .translate([width / 3, height / 3]) // Center the globe
      .rotate([0, -30]); // Optional: rotate for a better view;
    let path = geoPath(projection);

    const g = svg
      .attr('viewBox', `-100 -120 ${width} ${height + 100}`)
      .attr(
        'style',
        `max-width: ${width}px; height: ${height}px; display: block; align-items: center; justify-content: center;`
      )
      .append('g');

    g.append('circle')
      .attr('cx', projection.translate()[0])
      .attr('cy', projection.translate()[1])
      .attr('r', projection.scale())
      .attr('fill', '#ffffff');

    // Drag behavior
    let initialRotation: [number, number, number] = [0, 0, 0];
    let initialPos: [number, number] = [0, 0];
    let velocityX: number;
    let velocityY: number;
    let lastTime: DOMHighResTimeStamp;
    let lastX: number;
    let lastY: number;

    let momentumId: number;

    const dragBehavior = d3
      .drag<SVGSVGElement, unknown>()
      .on('start', (event) => {
        // Record the mouse's starting position
        initialPos = [event.x, event.y];
        // Current projection rotation [lambda, phi, gamma]
        initialRotation = projection.rotate() as [number, number, number];

        // Reset velocity
        velocityX = 0;
        velocityY = 0;
        lastTime = performance.now();
        lastX = event.x;
        lastY = event.y;
      })
      .on('drag', (event) => {
        const currentTime = performance.now();
        const dt = currentTime - lastTime;

        // Calculate the difference in x/y from the start
        const dx = event.x - lastX;
        const dy = event.y - lastY;

        // Approx velocity in x/y direction (degrees per ms, or however you want to scale)
        velocityX = dx / dt;
        velocityY = dy / dt;

        // Adjust the rotation’s lambda (around y-axis) and phi (around x-axis)
        // “Magic number” 200 is just a typical sensitivity factor — adjust to your liking
        //const lambda = initialRotation[0] + dx / 2;
        //const phi = initialRotation[1] - dy / 2;
        const lambda = initialRotation[0] + (event.x - initialPos[0]) / 2;
        const phi = initialRotation[1] - (event.y - initialPos[1]) / 2;

        projection.rotate([lambda, phi, initialRotation[2]]);
        path = geoPath(projection);

        // Update all paths + circle
        g.selectAll<SVGPathElement, Geometry>('path').attr('d', path);
        g.select('circle')
          .attr('cx', projection.translate()[0])
          .attr('cy', projection.translate()[1])
          .attr('r', projection.scale());

        // Save position/time for next iteration
        lastTime = currentTime;
        lastX = event.x;
        lastY = event.y;
      })
      // .on('end', () => {
      //   // We have velocityX, velocityY from the last drag event
      //   const inertiaRotate = () => {
      //     // 1) compute time delta
      //     const now = performance.now();
      //     const dt = now - lastTime; 
      //     lastTime = now;
      
      //     // 2) update rotation based on velocity * dt
      //     const [lambda0, phi0, gamma0] = projection.rotate();
      //     const lambda = lambda0 + velocityX * dt;
      //     const phi = phi0 - velocityY * dt;
      //     projection.rotate([lambda, phi, gamma0]);
      //     path = geoPath(projection);
      
      //     // 3) re-render
      //     g.selectAll<SVGPathElement, Geometry>("path").attr("d", path);
      //     g.select("circle")
      //       .attr("cx", projection.translate()[0])
      //       .attr("cy", projection.translate()[1])
      //       .attr("r", projection.scale());
      
      //     // 4) apply friction
      //     velocityX *= 0.90; 
      //     velocityY *= 0.90;
      
      //     // 5) if velocity is still significant, keep going
      //     if (Math.abs(velocityX) > 0.001 || Math.abs(velocityY) > 0.001) {
      //       momentumId = requestAnimationFrame(inertiaRotate);
      //     }
      //   };
      
      //   // Start the inertia animation
      //   lastTime = performance.now();
      //   momentumId = requestAnimationFrame(inertiaRotate);
      // });

    // Attach the drag behavior to the whole <svg> or just the <g> holding the globe
    svg.call(dragBehavior as any);

    const renderMap = async () => {
      const worldData = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json') as Topology;
      const countries = feature(worldData, worldData.objects.countries) as FeatureCollection<Geometry>;

      g.selectAll('path')
        .data(countries.features)
        .join('path')
        .attr('d', path)
        .attr('fill', '#000000')
        .attr('stroke', '#333');
    };

    renderMap();
  }, [width, height]);

  return (
    <div className='geo-svg'>
      <svg preserveAspectRatio="xMidYMid meet" ref={svgRef}></svg>
    </div>
  );
};

export default Location;
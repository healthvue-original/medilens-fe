"use client";
import { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

type ChartProps = {
  chartData: ChartConfiguration;
};

export default function ChartWrapper({ chartData }: ChartProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      const parentEl = canvasRef.current.parentElement;
      canvasRef.current.width = parentEl?.clientWidth;
      canvasRef.current.height = parentEl?.clientHeight;
      const ch = new Chart(canvasRef.current, { ...chartData });
    }
  }, []);
  return <canvas ref={canvasRef}></canvas>;
}

import React from 'react';

const StockChart: React.FC = () => {
  // Mock chart data points
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: 21000 + Math.random() * 1000 + Math.sin(i * 0.3) * 500
  }));

  const maxValue = Math.max(...chartData.map(d => d.value));
  const minValue = Math.min(...chartData.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <div className="h-64 relative">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-600" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="400" height="200" fill="url(#grid)"/>
        
        {/* Chart line */}
        <polyline
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          points={chartData.map((d, i) => 
            `${(i / (chartData.length - 1)) * 380 + 10},${190 - ((d.value - minValue) / range) * 170}`
          ).join(' ')}
        />
        
        {/* Chart area fill */}
        <polygon
          fill="url(#gradient)"
          points={[
            `10,190`,
            ...chartData.map((d, i) => 
              `${(i / (chartData.length - 1)) * 380 + 10},${190 - ((d.value - minValue) / range) * 170}`
            ),
            `390,190`
          ].join(' ')}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        {/* Data points */}
        {chartData.map((d, i) => (
          <circle
            key={i}
            cx={(i / (chartData.length - 1)) * 380 + 10}
            cy={190 - ((d.value - minValue) / range) * 170}
            r="2"
            fill="#3B82F6"
            className="hover:r-3 transition-all cursor-pointer"
          />
        ))}
      </svg>
      
      {/* Chart info overlay */}
      <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">Current: ₹21,456.78</p>
        <p className="text-sm text-green-600">+0.58% (+123.45)</p>
      </div>
    </div>
  );
};

export default StockChart;
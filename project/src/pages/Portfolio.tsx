import React from 'react';
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react';

const Portfolio: React.FC = () => {
  const portfolioData = [
    { symbol: 'RELIANCE', shares: 50, avgPrice: 2650.00, currentPrice: 2745.80, value: 137290 },
    { symbol: 'TCS', shares: 30, avgPrice: 3400.00, currentPrice: 3456.75, value: 103702.5 },
    { symbol: 'INFY', shares: 75, avgPrice: 1500.00, currentPrice: 1534.60, value: 115095 },
  ];

  const totalInvestment = portfolioData.reduce((sum, stock) => sum + (stock.shares * stock.avgPrice), 0);
  const currentValue = portfolioData.reduce((sum, stock) => sum + stock.value, 0);
  const totalGain = currentValue - totalInvestment;
  const totalGainPercent = (totalGain / totalInvestment) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Portfolio
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <PieChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Investment</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{totalInvestment.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Value</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{currentValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${totalGain >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
              {totalGain >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total P&L</h3>
              <p className={`text-2xl font-bold ${totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{totalGain.toLocaleString()}
              </p>
              <p className={`text-sm ${totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalGainPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Holdings
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Stock</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Shares</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Avg Price</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Current Price</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Current Value</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">P&L</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.map((stock) => {
                const gainLoss = stock.value - (stock.shares * stock.avgPrice);
                const gainLossPercent = (gainLoss / (stock.shares * stock.avgPrice)) * 100;
                
                return (
                  <tr key={stock.symbol} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900 dark:text-white">{stock.symbol}</p>
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {stock.shares}
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      ₹{stock.avgPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      ₹{stock.currentPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                      ₹{stock.value.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className={gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                        <p className="font-medium">₹{gainLoss.toFixed(2)}</p>
                        <p className="text-sm">{gainLossPercent.toFixed(2)}%</p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp, DollarSign, PieChart, Activity } from 'lucide-react';
import { mockStocks, marketIndices, newsItems } from '../data/mockData';
import StockChart from '../components/StockChart';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Market Dashboard
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketIndices.map((index) => (
          <div key={index.name} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{index.name}</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {index.value.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <div className={`flex items-center ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {index.change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span className="ml-1 font-medium">
                    {Math.abs(index.change).toFixed(2)}
                  </span>
                </div>
                <p className={`text-sm ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {index.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Gainer</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">RELIANCE</p>
              <p className="text-sm text-green-600">+1.67%</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Portfolio Value</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">₹2,45,670</p>
              <p className="text-sm text-green-600">+2.3%</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <PieChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Watchlist</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">15 Stocks</p>
              <p className="text-sm text-blue-600">3 Alerts</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Predictions</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">82% Accuracy</p>
              <p className="text-sm text-green-600">+5% This Week</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Nifty 50 Performance
            </h3>
            <StockChart />
          </div>
        </div>

        {/* Market News */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Market News
          </h3>
          <div className="space-y-4">
            {newsItems.map((news) => (
              <div key={news.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {news.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {news.summary}
                </p>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>{news.source}</span>
                  <span>{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Stocks */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Stocks
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Symbol</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Price</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Change</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Volume</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Prediction</th>
              </tr>
            </thead>
            <tbody>
              {mockStocks.slice(0, 5).map((stock) => (
                <tr key={stock.symbol} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="py-3">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{stock.symbol}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</p>
                    </div>
                  </td>
                  <td className="py-3 font-medium text-gray-900 dark:text-white">
                    ₹{stock.price.toFixed(2)}
                  </td>
                  <td className="py-3">
                    <div className={`flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                      <span className="text-sm font-medium">
                        {stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                    {stock.volume.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded">
                      {stock.prediction.confidence}% Bullish
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
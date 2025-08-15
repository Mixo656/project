import React from 'react';
import { Star, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { mockStocks } from '../data/mockData';

const Watchlist: React.FC = () => {
  const { watchlist, removeFromWatchlist, addToPortfolio } = useUser();
  
  // Show mock data if watchlist is empty
  const displayStocks = watchlist.length > 0 ? watchlist : mockStocks.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Watchlist
        </h1>
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {displayStocks.length} stocks watched
          </span>
        </div>
      </div>

      {displayStocks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No stocks in watchlist
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start adding stocks to your watchlist to track their performance.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Stock</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Price</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Change</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Volume</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Prediction</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayStocks.map((stock) => (
                  <tr key={stock.symbol} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{stock.symbol}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                          {stock.name}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                      ₹{stock.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <div className={`flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                        <div>
                          <p className="font-medium">{stock.changePercent.toFixed(2)}%</p>
                          <p className="text-sm">₹{Math.abs(stock.change).toFixed(2)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {stock.volume.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded">
                          {stock.prediction.confidence}% Confidence
                        </span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Next week: ₹{stock.prediction.nextWeek.toFixed(2)}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => addToPortfolio(stock)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Buy
                        </button>
                        <button
                          onClick={() => removeFromWatchlist(stock.symbol)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Remove from watchlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Price Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Price Alerts
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">RELIANCE</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Alert when price reaches ₹2,800</p>
            </div>
            <span className="px-2 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs rounded">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">TCS</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Alert when price drops to ₹3,400</p>
            </div>
            <span className="px-2 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs rounded">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
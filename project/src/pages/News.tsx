import React from 'react';
import { Clock, ExternalLink, TrendingUp } from 'lucide-react';
import { newsItems } from '../data/mockData';

const News: React.FC = () => {
  const extendedNews = [
    ...newsItems,
    {
      id: 4,
      title: 'Nifty 50 Hits New All-Time High',
      summary: 'Indian benchmark index Nifty 50 crossed 21,500 mark for the first time amid strong buying in banking and IT stocks.',
      time: '1 hour ago',
      source: 'Reuters',
      category: 'Markets'
    },
    {
      id: 5,
      title: 'SEBI Introduces New Guidelines for Mutual Funds',
      summary: 'Market regulator SEBI has announced new guidelines for mutual fund investments to enhance investor protection.',
      time: '3 hours ago',
      source: 'Business Today',
      category: 'Regulation'
    },
    {
      id: 6,
      title: 'Cryptocurrency Market Shows Recovery Signs',
      summary: 'Digital currencies gain momentum as institutional investors show renewed interest in crypto assets.',
      time: '5 hours ago',
      source: 'CoinDesk India',
      category: 'Crypto'
    },
    {
      id: 7,
      title: 'Auto Sector Rallies on Festive Season Demand',
      summary: 'Automobile stocks surge as companies report strong sales figures during the ongoing festive season.',
      time: '6 hours ago',
      source: 'Economic Times',
      category: 'Sector'
    },
    {
      id: 8,
      title: 'Foreign Investment Flows Remain Strong',
      summary: 'India continues to attract significant foreign investment with FDI reaching new highs in Q3.',
      time: '8 hours ago',
      source: 'Financial Express',
      category: 'Investment'
    }
  ];

  const categories = ['All', 'Markets', 'Policy', 'Earnings', 'Regulation', 'Sector', 'Investment', 'Crypto'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredNews = selectedCategory === 'All' 
    ? extendedNews 
    : extendedNews.filter(news => news.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Market News
        </h1>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Live Updates
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNews.map((news) => (
          <article
            key={news.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                news.category === 'Markets' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' :
                news.category === 'Policy' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' :
                news.category === 'Earnings' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' :
                news.category === 'Regulation' ? 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400' :
                news.category === 'Sector' ? 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400' :
                news.category === 'Investment' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' :
                'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
              }`}>
                {news.category}
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {news.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              {news.summary}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
              <span className="font-medium">{news.source}</span>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>{news.time}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Market Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Today's Market Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">Advancing Stocks</h4>
            <p className="text-2xl font-bold text-green-600">1,247</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">Declining Stocks</h4>
            <p className="text-2xl font-bold text-red-600">892</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">Unchanged</h4>
            <p className="text-2xl font-bold text-blue-600">234</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">New Highs</h4>
            <p className="text-2xl font-bold text-purple-600">45</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
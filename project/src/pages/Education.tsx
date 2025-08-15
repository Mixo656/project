import React from 'react';
import { BookOpen, Play, Users, Award } from 'lucide-react';

const Education: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: 'Stock Market Basics for Beginners',
      description: 'Learn the fundamentals of stock market investing, from basic terminology to market mechanics.',
      duration: '2 hours',
      level: 'Beginner',
      lessons: 8,
      students: 1250
    },
    {
      id: 2,
      title: 'Technical Analysis Masterclass',
      description: 'Master chart patterns, indicators, and technical analysis techniques used by professional traders.',
      duration: '4 hours',
      level: 'Intermediate',
      lessons: 15,
      students: 890
    },
    {
      id: 3,
      title: 'Fundamental Analysis Deep Dive',
      description: 'Understand how to evaluate companies using financial statements, ratios, and valuation methods.',
      duration: '3.5 hours',
      level: 'Intermediate',
      lessons: 12,
      students: 670
    },
    {
      id: 4,
      title: 'Options Trading Strategies',
      description: 'Learn advanced options strategies for hedging, income generation, and speculation.',
      duration: '3 hours',
      level: 'Advanced',
      lessons: 10,
      students: 445
    }
  ];

  const articles = [
    {
      title: 'Understanding Market Volatility',
      readTime: '5 min read',
      category: 'Market Basics'
    },
    {
      title: 'How to Read Annual Reports',
      readTime: '8 min read',
      category: 'Fundamental Analysis'
    },
    {
      title: 'Risk Management Strategies',
      readTime: '6 min read',
      category: 'Risk Management'
    },
    {
      title: 'Tax Implications of Stock Trading',
      readTime: '7 min read',
      category: 'Tax Planning'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Education Center
        </h1>
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Learn & Grow
          </span>
        </div>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Courses</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Play className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Videos</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Students</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3,255</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Certificates</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,890</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Courses */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Popular Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  course.level === 'Beginner' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' :
                  course.level === 'Intermediate' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' :
                  'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                }`}>
                  {course.level}
                </span>
                <Play className="w-5 h-5 text-gray-400" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {course.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {course.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>{course.duration}</span>
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{course.students}</span>
                </div>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Start Learning
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Latest Articles
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {articles.map((article, index) => (
              <div
                key={index}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {article.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded text-xs mr-2">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <BookOpen className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
@@ .. @@
 const Stocks: React.FC = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [sortBy, setSortBy] = useState('symbol');
   const { addToWatchlist, addToPortfolio } = useUser();
 }
 
   const filteredStocks = mockStocks.filter(stock =>
     stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
     stock.name.toLowerCase().includes(searchTerm.toLowerCase())
   );
 
   return (
     <div className="space-y-6">
       <div className="flex justify-between items-center">
-        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
+        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
           Stocks
         </h1>
-        <div className="flex space-x-4">
+        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
           <div className="relative">
             <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
             <input
               type="text"
               placeholder="Search stocks..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
   )
-              className="pl-10 pr-4 py-2 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
+              className="pl-10 pr-4 py-2 w-full sm:w-48 md:w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
             />
           </div>
           <select
             value={sortBy}
             onChange={(e) => setSortBy(e.target.value)}
-            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
+            className="px-4 py-2 w-full sm:w-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
           >
             <option value="symbol">Symbol</option>
             <option value="price">Price</option>
             <option value="change">Change</option>
             <option value="volume">Volume</option>
           </select>
         </div>
       </div>
 
       {/* Stock Cards Grid */}
-      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
+      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
         {filteredStocks.map((stock) => (
           )
           )
           }
-          <div key={stock.symbol} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
+          <div key={stock.symbol} className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start mb-4">
               <div>
-                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
+                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                   {stock.symbol}
                 </h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                   {stock.name}
                 </p>
               </div>
               <div className="flex space-x-2">
                 <button
                   onClick={() => addToWatchlist(stock)}
                   className="p-2 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
                   title="Add to Watchlist"
                 >
                   <Star className="w-4 h-4" />
                 </button>
                 <button
                   onClick={() => addToPortfolio(stock)}
                   className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                   title="Add to Portfolio"
                 >
                   <Plus className="w-4 h-4" />
                 </button>
               </div>
             </div>
 
             <div className="space-y-3">
               <div className="flex justify-between items-center">
-                <span className="text-2xl font-bold text-gray-900 dark:text-white">
+                <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                   ₹{stock.price.toFixed(2)}
                 </span>
                 <div className={`flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                   {stock.change >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                   <span className="font-medium">
                     {stock.changePercent.toFixed(2)}%
                   </span>
                 </div>
               </div>
 
               <div className="grid grid-cols-2 gap-4 text-sm">
                 <div>
                   <span className="text-gray-600 dark:text-gray-400">Market Cap</span>
                   <p className="font-medium text-gray-900 dark:text-white">{stock.marketCap}</p>
                 </div>
                 <div>
                   <span className="text-gray-600 dark:text-gray-400">P/E Ratio</span>
                   <p className="font-medium text-gray-900 dark:text-white">{stock.pe}</p>
                 </div>
                 <div>
                   <span className="text-gray-600 dark:text-gray-400">Day High</span>
                   <p className="font-medium text-gray-900 dark:text-white">₹{stock.dayHigh.toFixed(2)}</p>
                 </div>
                 <div>
                   <span className="text-gray-600 dark:text-gray-400">Day Low</span>
                   <p className="font-medium text-gray-900 dark:text-white">₹{stock.dayLow.toFixed(2)}</p>
                 </div>
               </div>
 
               <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-sm text-gray-600 dark:text-gray-400">AI Prediction</span>
                   <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                     {stock.prediction.confidence}% Confidence
                   </span>
                 </div>
                 <div className="grid grid-cols-2 gap-2 text-xs">
                   <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                     <span className="text-gray-600 dark:text-gray-400">Next Week</span>
                     <p className="font-medium text-gray-900 dark:text-white">
                       ₹{stock.prediction.nextWeek.toFixed(2)}
                     </p>
                   </div>
                   <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                     <span className="text-gray-600 dark:text-gray-400">Next Month</span>
                     <p className="font-medium text-gray-900 dark:text-white">
                       ₹{stock.prediction.nextMonth.toFixed(2)}
                     </p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   );
 };
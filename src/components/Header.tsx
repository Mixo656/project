@@ .. @@
 import React from 'react';
-import { Search, Bell, User, Moon, Sun, TrendingUp } from 'lucide-react';
+import { Search, Bell, User, Moon, Sun, TrendingUp, Menu } from 'lucide-react';
 import { useTheme } from '../contexts/ThemeContext';
 
 const Header: React.FC = () => {
   const { isDark, toggleTheme } = useTheme();
+  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
 
   return (
     <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
-      <div className="px-6 py-4">
+      <div className="px-4 md:px-6 py-4">
         <div className="flex items-center justify-between">
           <div className="flex items-center space-x-4">
+            <button 
+              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
+              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
+            >
+              <Menu className="w-5 h-5" />
+            </button>
             <div className="flex items-center space-x-2">
               <TrendingUp className="w-8 h-8 text-blue-600" />
-              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
+              <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                 StockPredict India
               </h1>
             </div>
-            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
+            <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
               <span className="flex items-center">
                 <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                 NSE: Open
@@ -32,7 +40,7 @@ const Header: React.FC = () => {
           <div className="flex items-center space-x-4">
-            <div className="relative">
+            <div className="relative hidden sm:block">
               <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
               <input
                 type="text"
                 placeholder="Search stocks..."
-                className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
+                className="pl-10 pr-4 py-2 w-48 lg:w-64 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
               />
             </div>
             
             <button 
               onClick={toggleTheme}
               className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
             >
               {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
             
-            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative">
+            <button className="hidden sm:block p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative">
               <Bell className="w-5 h-5" />
               <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
             </button>
             
-            <button className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
+            <button className="hidden md:flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
               <User className="w-5 h-5" />
-              <span className="hidden md:block">Profile</span>
+              <span>Profile</span>
             </button>
           </div>
         </div>
+        
+        {/* Mobile Search */}
+        <div className="sm:hidden mt-4">
+          <div className="relative">
+            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
+            <input
+              type="text"
+              placeholder="Search stocks..."
+              className="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
+            />
+          </div>
+        </div>
       </div>
     </header>
   );
 };
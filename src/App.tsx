@@ .. @@
 function App() {
   return (
     <ThemeProvider>
       <UserProvider>
         <Router>
           <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
             <Header />
             <div className="flex">
               <Sidebar />
-              <main className="flex-1 ml-64 p-6">
+              <main className="flex-1 lg:ml-64 p-4 md:p-6">
                 <Routes>
                   <Route path="/" element={<Dashboard />} />
                   <Route path="/stocks" element={<Stocks />} />
                   <Route path="/portfolio" element={<Portfolio />} />
                   <Route path="/watchlist" element={<Watchlist />} />
                   <Route path="/news" element={<News />} />
                   <Route path="/education" element={<Education />} />
                   <Route path="/settings" element={<Settings />} />
                 </Routes>
               </main>
             </div>
           </div>
         </Router>
       </UserProvider>
     </ThemeProvider>
   );
 }
   )
 }
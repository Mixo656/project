import React, { createContext, useContext, useState } from 'react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

interface UserContextType {
  watchlist: Stock[];
  portfolio: Stock[];
  addToWatchlist: (stock: Stock) => void;
  removeFromWatchlist: (symbol: string) => void;
  addToPortfolio: (stock: Stock) => void;
  removeFromPortfolio: (symbol: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [portfolio, setPortfolio] = useState<Stock[]>([]);

  const addToWatchlist = (stock: Stock) => {
    setWatchlist(prev => [...prev.filter(s => s.symbol !== stock.symbol), stock]);
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(s => s.symbol !== symbol));
  };

  const addToPortfolio = (stock: Stock) => {
    setPortfolio(prev => [...prev.filter(s => s.symbol !== stock.symbol), stock]);
  };

  const removeFromPortfolio = (symbol: string) => {
    setPortfolio(prev => prev.filter(s => s.symbol !== symbol));
  };

  return (
    <UserContext.Provider value={{
      watchlist,
      portfolio,
      addToWatchlist,
      removeFromWatchlist,
      addToPortfolio,
      removeFromPortfolio
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
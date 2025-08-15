export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  pe: number;
  dayHigh: number;
  dayLow: number;
  prediction: {
    nextWeek: number;
    nextMonth: number;
    confidence: number;
  };
}

export const mockStocks: Stock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    price: 2745.80,
    change: 45.20,
    changePercent: 1.67,
    volume: 1245670,
    marketCap: '18.5L Cr',
    pe: 24.5,
    dayHigh: 2756.90,
    dayLow: 2720.50,
    prediction: { nextWeek: 2820.00, nextMonth: 2950.00, confidence: 78 }
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    price: 3456.75,
    change: -23.45,
    changePercent: -0.67,
    volume: 987654,
    marketCap: '12.8L Cr',
    pe: 28.3,
    dayHigh: 3478.90,
    dayLow: 3445.20,
    prediction: { nextWeek: 3520.00, nextMonth: 3650.00, confidence: 82 }
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    price: 1534.60,
    change: 12.80,
    changePercent: 0.84,
    volume: 2134567,
    marketCap: '6.4L Cr',
    pe: 26.7,
    dayHigh: 1545.30,
    dayLow: 1520.40,
    prediction: { nextWeek: 1580.00, nextMonth: 1620.00, confidence: 75 }
  },
  {
    symbol: 'HDFC',
    name: 'HDFC Bank Limited',
    price: 1623.45,
    change: 8.90,
    changePercent: 0.55,
    volume: 1876543,
    marketCap: '8.9L Cr',
    pe: 19.2,
    dayHigh: 1634.70,
    dayLow: 1615.20,
    prediction: { nextWeek: 1670.00, nextMonth: 1720.00, confidence: 85 }
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Limited',
    price: 967.80,
    change: -5.30,
    changePercent: -0.54,
    volume: 3456789,
    marketCap: '6.8L Cr',
    pe: 17.8,
    dayHigh: 975.90,
    dayLow: 962.10,
    prediction: { nextWeek: 990.00, nextMonth: 1020.00, confidence: 79 }
  }
];

export const newsItems = [
  {
    id: 1,
    title: 'RBI Monetary Policy: Repo Rate Unchanged at 6.5%',
    summary: 'Reserve Bank of India maintains status quo on key policy rates amid inflation concerns.',
    time: '2 hours ago',
    source: 'Economic Times',
    category: 'Policy'
  },
  {
    id: 2,
    title: 'IT Sector Shows Strong Q3 Results',
    summary: 'Major IT companies report better-than-expected earnings for the quarter.',
    time: '4 hours ago',
    source: 'Business Standard',
    category: 'Earnings'
  },
  {
    id: 3,
    title: 'Foreign Institutional Investors Turn Positive',
    summary: 'FIIs show renewed interest in Indian equities with net buying of ₹2,400 crores.',
    time: '6 hours ago',
    source: 'Mint',
    category: 'Markets'
  }
];

export const marketIndices = [
  { name: 'Nifty 50', value: 21456.78, change: 123.45, changePercent: 0.58 },
  { name: 'Sensex', value: 70892.34, change: 245.67, changePercent: 0.35 },
  { name: 'Bank Nifty', value: 47234.56, change: -89.23, changePercent: -0.19 },
  { name: 'Nifty IT', value: 34567.89, change: 456.78, changePercent: 1.34 }
];
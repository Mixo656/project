"""Helper functions to fetch and manage Indian stock data."""
import yfinance as yf
import pandas as pd
import requests
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def validate_nse_symbol(symbol):
    """Validate and format NSE stock symbol."""
    if not isinstance(symbol, str):
        return None
        
    # Remove any .NS suffix if present
    symbol = symbol.upper().replace('.NS', '')
    
    # Check if symbol is just numbers
    if symbol.isdigit():
        return None
        
    # Add .NS suffix
    return f"{symbol}.NS"

def get_nse_stocks():
    """Get list of NSE stocks using IndianAPI."""
    # Initialize API headers
    headers = {
        # Use INDIAN_API_KEY (set in .env) as the API key for IndianAPI
        'Authorization': f'Bearer {os.getenv("INDIAN_API_KEY")}',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    try:
        # Try to fetch all Indian stocks from API
        response = requests.get(
            'https://api.indianapi.in/v1/stocks/list',
            headers=headers,
            timeout=10
        )

        if response.status_code == 200:
            stocks_data = response.json()
            # Create DataFrame with all Indian stocks
            df = pd.DataFrame(stocks_data['data'])
            df['symbol'] = df['symbol'].apply(lambda x: f"{x}.NS")  # Add .NS suffix
            return pd.DataFrame({
                'symbol': df['symbol'],
                'full_name': df['name'],
                'sector': df.get('sector', 'N/A'),
                'market_cap': df.get('market_cap', 0),
                'category': df.get('category', 'N/A')
            })
    except Exception as e:
        print(f"API Error: {str(e)}, falling back to default list")
    
    # Fallback to common stocks if API fails
    common_stocks = {
        'Reliance Industries': 'RELIANCE.NS',
        'TCS': 'TCS.NS',
        'HDFC Bank': 'HDFCBANK.NS',
        'Infosys': 'INFY.NS',
        'ICICI Bank': 'ICICIBANK.NS',
        'HUL': 'HINDUNILVR.NS',
        'ITC': 'ITC.NS',
        'SBI': 'SBIN.NS',
        'Bharti Airtel': 'BHARTIARTL.NS',
        'Axis Bank': 'AXISBANK.NS',
        'Tata Motors': 'TATAMOTORS.NS',
        'Wipro': 'WIPRO.NS',
        'Sun Pharma': 'SUNPHARMA.NS',
        'ONGC': 'ONGC.NS',
        'Coal India': 'COALINDIA.NS'
    }
    
    try:
        # Try to get extended list from NSE (with retry)
        urls = [
            "https://www1.nseindia.com/content/equities/EQUITY_L.csv",
            "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20100",
            "https://www.nseindia.com/market-data/live-equity-market"
        ]
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
        }
        
        for url in urls:
            try:
                response = requests.get(url, headers=headers, timeout=5)
                if response.status_code == 200:
                    if url.endswith('.csv'):
                        df = pd.read_csv(pd.StringIO(response.text))
                        df['SYMBOL'] = df['SYMBOL'].apply(validate_nse_symbol)
                        df = df[df['SYMBOL'].notna()]
                        return pd.DataFrame({
                            'symbol': df['SYMBOL'],
                            'full_name': df['NAME OF COMPANY']
                        })
                    # Add handling for JSON endpoints if needed
            except Exception:
                continue
                
    except Exception as e:
        print(f"Note: Using curated list of popular NSE stocks (Error: {str(e)})")
    
    # Return curated list as fallback
    return pd.DataFrame({
        'symbol': common_stocks.values(),
        'full_name': common_stocks.keys()
    })

def get_stock_info(symbol):
    """Get detailed information about a stock."""
    symbol = validate_nse_symbol(symbol)
    if not symbol:
        return None
        
    try:
        stock = yf.Ticker(symbol)
        info = stock.info
        
        return {
            'sector': info.get('sector', 'N/A'),
            'industry': info.get('industry', 'N/A'),
            'current_price': info.get('currentPrice', 0),
            'market_cap': info.get('marketCap', 0),
            'website': info.get('website', ''),
            'business_summary': info.get('longBusinessSummary', 'No description available.')
        }
    except:
        return None

# When downloading data:
# ticker = validate_nse_symbol(ticker)
# if ticker is None:
#     st.error("Invalid stock symbol")
#     st.stop()

def get_top_gainers_losers(top_n: int = 10):
    """Return top gainers and losers from a fallback list using yfinance.

    This is a lightweight, reliable fallback that uses a curated list of
    popular NSE tickers. It avoids fragile scraping of NSE pages which
    can change frequently.
    """
    # Fallback ticker list (popular NSE tickers)
    fallback = [
        'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS',
        'HINDUNILVR.NS', 'ITC.NS', 'SBIN.NS', 'BHARTIARTL.NS', 'AXISBANK.NS'
    ]

    results = []
    for sym in fallback:
        try:
            t = yf.Ticker(sym)
            info = t.info
            price = info.get('regularMarketPrice') or info.get('currentPrice') or 0
            prev = info.get('regularMarketPreviousClose') or info.get('previousClose') or 0
            change = price - prev if price and prev else 0
            change_pct = (change / prev * 100) if prev else 0
            results.append({
                'symbol': sym,
                'price': price,
                'previous': prev,
                'change': change,
                'change_pct': change_pct
            })
        except Exception:
            # Skip tickers that error out
            continue

    # Sort and split into gainers and losers
    gainers = sorted(results, key=lambda x: x['change_pct'], reverse=True)[:top_n]
    losers = sorted(results, key=lambda x: x['change_pct'])[:top_n]

    return {'gainers': gainers, 'losers': losers}
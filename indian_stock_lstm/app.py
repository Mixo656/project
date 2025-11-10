# Import required libraries
import tensorflow as tf
import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
from datetime import datetime, timedelta
import os
import pickle
from dotenv import load_dotenv

from src.data import download_data, compute_technical_indicators, prepare_data
from src.model import build_lstm, train_model

# Load environment variables from .env (if present)
load_dotenv()
# Read OPENAI_API_KEY (or set to None if not present). We do NOT print the key.
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
# Read INDIANAPI_KEY for indianapi.in usage (kept secret; do not print)
INDIANAPI_KEY = os.getenv('INDIANAPI_KEY')

# Page config
st.set_page_config(
    page_title="Indian Stock Predictor",
    page_icon="📈",
    layout="wide"
)

# Title and description
st.title("📊 Indian Stock Market Predictor")
st.markdown("""
This app uses LSTM (Long Short-Term Memory) neural networks to predict Indian stock prices.
Select a stock, date range, and prediction horizon to see forecasts.
""")

# Sidebar controls
st.sidebar.header("Parameters")

# Stock selection section
st.sidebar.subheader("Stock Selection")

# Get all NSE stocks
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))
from src.market_data import get_nse_stocks, get_stock_info, get_top_gainers_losers

# Validate NSE stock symbols
def validate_nse_symbol(ticker):
    # Check if ticker ends with .NS
    if not ticker.endswith('.NS'):
        ticker = f"{ticker}.NS"
    
    # Basic validation for NSE symbols:
    # - Must end with .NS
    # - Base symbol should be 2-10 characters
    # - Should only contain uppercase letters, numbers, or certain special chars
    base_symbol = ticker.replace('.NS', '')
    if not (2 <= len(base_symbol) <= 10 and base_symbol.replace('&', '').replace('-', '').isalnum()):
        return None
    
    # If available in stocks_df, it's definitely valid
    if 'stocks_df' in globals():
        if ticker in stocks_df['symbol'].values:
            return ticker
    
    return ticker  # Return the validated/formatted ticker

# Cache the stock list to avoid repeated fetching
@st.cache_data(ttl=3600)  # Cache for 1 hour
def load_stock_data():
    try:
        return get_nse_stocks()
    except Exception as e:
        st.error(f"Error loading stock data: {str(e)}")
        return pd.DataFrame({
            'symbol': ['RELIANCE.NS'],
            'full_name': ['Reliance Industries'],
            'sector': ['Energy'],
            'market_cap': [1000000000000],
            'category': ['NIFTY 50']
        })

with st.spinner("Loading Indian stocks..."):
    stocks_df = load_stock_data()

# Add search and filter options
col1, col2 = st.sidebar.columns(2)

# Add sector filter if available
sectors = ['All Sectors'] + sorted(stocks_df['sector'].unique().tolist()) if 'sector' in stocks_df.columns else ['All Sectors']
selected_sector = st.sidebar.selectbox("Filter by Sector", sectors)

# Enhanced search with multiple fields
search_term = st.sidebar.text_input("Search Stocks (name or symbol)", "").lower()

# Filter stocks based on search term and sector
filtered_stocks = stocks_df.copy()

if selected_sector != 'All Sectors' and 'sector' in stocks_df.columns:
    filtered_stocks = filtered_stocks[filtered_stocks['sector'] == selected_sector]

if search_term:
    filtered_stocks = filtered_stocks[
        filtered_stocks['full_name'].str.lower().str.contains(search_term) |
        filtered_stocks['symbol'].str.lower().str.contains(search_term)
    ]

if filtered_stocks.empty:
    st.sidebar.warning("No stocks match your criteria. Try different search terms or filters.")
    st.stop()

# Sort by market cap if available
if 'market_cap' in filtered_stocks.columns:
    filtered_stocks = filtered_stocks.sort_values('market_cap', ascending=False)

# Display stock selection with company details
selected_stock = st.sidebar.selectbox(
    "Select Stock",
    options=filtered_stocks['full_name'].tolist(),
    index=0
)

# Show stock category if available
if 'category' in filtered_stocks.columns:
    stock_category = filtered_stocks[filtered_stocks['full_name'] == selected_stock]['category'].iloc[0]
    st.sidebar.info(f"Category: {stock_category}")

# Get the ticker symbol for the selected stock
ticker = filtered_stocks[filtered_stocks['full_name'] == selected_stock]['symbol'].iloc[0]

# Display stock information
if ticker:
    stock_info = get_stock_info(ticker)
    if stock_info:
        with st.sidebar.expander("Stock Information", expanded=True):
            st.write(f"**Sector:** {stock_info['sector']}")
            st.write(f"**Industry:** {stock_info['industry']}")
            st.write(f"**Current Price:** ₹{stock_info['current_price']:,.2f}")
            st.write(f"**Market Cap:** ₹{stock_info['market_cap']/10000000:,.2f} Cr")
            if stock_info['website']:
                st.write(f"**Website:** [{stock_info['website']}]({stock_info['website']})")
            st.write("**Business Summary:**")
            st.write(stock_info['business_summary'])

# Market Trends Section
st.sidebar.markdown("---")
st.sidebar.subheader("Market Trends")

# Cache top gainers/losers data
@st.cache_data(ttl=300)  # Cache for 5 minutes
def load_market_trends():
    return get_top_gainers_losers()

market_trends = load_market_trends()

# Display top gainers and losers in tabs
tab1, tab2 = st.sidebar.tabs(["Top Gainers", "Top Losers"])

with tab1:
    if market_trends['gainers'] is not None:
        for gainer in market_trends['gainers'][:5]:  # Show top 5
            st.write(f"**{gainer['symbol']}**: +{gainer['change_pct']:.2f}%")
            st.write(f"₹{gainer['price']:,.2f} ({gainer['change']:+,.2f})")
    else:
        st.write("Unable to fetch top gainers")

with tab2:
    if market_trends['losers'] is not None:
        for loser in market_trends['losers'][:5]:  # Show top 5
            st.write(f"**{loser['symbol']}**: {loser['change_pct']:.2f}%")
            st.write(f"₹{loser['price']:,.2f} ({loser['change']:+,.2f})")
    else:
        st.write("Unable to fetch top losers")

# Date range selector
end_date = datetime.now()
start_date = end_date - timedelta(days=365*2)  # 2 years default
start_date = st.sidebar.date_input("Start Date", start_date)
end_date = st.sidebar.date_input("End Date", end_date)

# Training parameters
n_epochs = st.sidebar.slider("Training Epochs", 5, 50, 10)
lookback = st.sidebar.slider("Lookback Days", 30, 90, 60)
n_days = st.sidebar.slider("Prediction Horizon (Days)", 5, 30, 5)

# Main content
col1, col2 = st.columns([2, 1])

with col1:
    st.subheader("Historical Data & Predictions")
    
    if st.button("Train Model & Predict"):
        # Validate ticker before any network calls to avoid yfinance 404s
        validated = validate_nse_symbol(ticker)
        if not validated:
            st.error(f"Selected stock '{selected_stock}' does not map to a valid NSE ticker.")
            st.stop()
        # Use validated ticker (e.g., 'RELIANCE.NS') for downstream calls
        ticker = validated
        # Download and prepare data
        with st.spinner(f"Downloading historical data for {selected_stock}..."):
            try:
                df = download_data(ticker, start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d'))
                if df is None or df.empty:
                    st.error(f"No data available for {selected_stock} in the specified date range.")
                    st.stop()
                df = compute_technical_indicators(df)
            except Exception as e:
                st.error(f"Error fetching data for {selected_stock}: {str(e)}")
                st.stop()
            
        # Train model
        with st.spinner("Training LSTM model..."):
            X_train, X_test, y_train, y_test, scaler = prepare_data(df, lookback=lookback)
            model = build_lstm((X_train.shape[1], X_train.shape[2]))
            
            # Create directories if they don't exist
            os.makedirs('models', exist_ok=True)
            os.makedirs('artifacts', exist_ok=True)
            
            history, model_path = train_model(
                model, X_train, y_train, X_test, y_test,
                out_dir='models',
                epochs=n_epochs,
                batch_size=32
            )
            
            # Save scaler for predictions
            scaler_path = os.path.join('artifacts', f'{ticker}_scaler.pkl')
            with open(scaler_path, 'wb') as f:
                pickle.dump(scaler, f)
        
        # Make predictions
        with st.spinner("Generating predictions..."):
            features = ['Close', 'SMA_10', 'SMA_50', 'RSI_14', 'Volume', 'Return']
            scaled = scaler.transform(df[features])
            
            # Get last sequence for prediction
            last_sequence = scaled[-lookback:]
            
            # Iterative prediction
            pred_sequences = []
            sequence = last_sequence.copy()
            
            for _ in range(n_days):
                x = sequence[np.newaxis, ...]
                pred = model.predict(x, verbose=0)[0,0]
                pred_sequences.append(sequence[-1].copy())
                
                next_row = sequence[-1].copy()
                next_row[0] = pred
                sequence = np.vstack([sequence[1:], next_row])
            
            pred_sequences = np.array(pred_sequences)
            predictions_scaled = np.array([seq[0] for seq in pred_sequences]).reshape(-1, 1)
            
            # Inverse transform predictions
            dummy = np.zeros((len(predictions_scaled), len(features)))
            dummy[:, 0] = predictions_scaled.flatten()
            predictions = scaler.inverse_transform(dummy)[:, 0]
            
            # Create future dates for predictions
            last_date = df.index[-1]
            future_dates = pd.date_range(start=last_date + timedelta(days=1), periods=n_days, freq='B')
            
            # Plot with Plotly
            fig = go.Figure()
            
            # Historical data
            fig.add_trace(go.Scatter(
                x=df.index,
                y=df['Close'],
                name='Historical',
                line=dict(color='blue')
            ))
            
            # Predictions
            fig.add_trace(go.Scatter(
                x=future_dates,
                y=predictions,
                name='Predicted',
                line=dict(color='red', dash='dash')
            ))
            
            fig.update_layout(
                title=f"{selected_stock} - Historical Prices & {n_days}-Day Forecast",
                xaxis_title="Date",
                yaxis_title="Price",
                hovermode='x unified'
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            # Show predicted values
            st.subheader("Predicted Prices")
            pred_df = pd.DataFrame({
                'Date': future_dates,
                'Predicted Price': predictions.round(2)
            })
            st.dataframe(pred_df)

            # Save data to session state so charts and indicators are available
            # across reruns and other layout columns
            try:
                st.session_state['df'] = df
                st.session_state['pred_df'] = pred_df
                st.session_state['predictions'] = predictions
                st.session_state['future_dates'] = future_dates
            except Exception:
                # If session_state is not available or not writable, continue silently
                pass

with col2:
    st.subheader("Technical Indicators")
    # Prefer session_state-stored dataframe so charts persist across reruns
    if 'df' in st.session_state:
        df = st.session_state['df']

        # RSI Plot
        fig_rsi = go.Figure()
        fig_rsi.add_trace(go.Scatter(
            x=df.index,
            y=df['RSI_14'],
            name='RSI'
        ))
        fig_rsi.add_hline(y=70, line_dash="dash", line_color="red", opacity=0.5)
        fig_rsi.add_hline(y=30, line_dash="dash", line_color="green", opacity=0.5)
        fig_rsi.update_layout(title="RSI (14)", height=300)
        st.plotly_chart(fig_rsi, use_container_width=True)

        # Moving Averages
        fig_ma = go.Figure()
        fig_ma.add_trace(go.Scatter(x=df.index, y=df['Close'], name='Close'))
        fig_ma.add_trace(go.Scatter(x=df.index, y=df['SMA_10'], name='SMA 10'))
        fig_ma.add_trace(go.Scatter(x=df.index, y=df['SMA_50'], name='SMA 50'))
        fig_ma.update_layout(title="Moving Averages", height=300)
        st.plotly_chart(fig_ma, use_container_width=True)

        # Volume
        fig_vol = go.Figure()
        fig_vol.add_trace(go.Bar(x=df.index, y=df['Volume'], name='Volume'))
        fig_vol.update_layout(title="Trading Volume", height=300)
        st.plotly_chart(fig_vol, use_container_width=True)
    else:
        st.info("No data available yet. Click 'Train Model & Predict' to load data and see charts here.")
        
# Footer
st.markdown("---")
st.markdown("""
**Note:** This is a demonstration model. Predictions should not be used as financial advice.
The model uses historical data and technical indicators to make predictions, but market behavior
is influenced by many factors not captured here.
""")
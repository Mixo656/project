import numpy as np
import pandas as pd
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler


def download_data(ticker: str, start: str, end: str) -> pd.DataFrame:
    """Download OHLCV data from yfinance for a given ticker."""
    df = yf.download(ticker, start=start, end=end, progress=False, auto_adjust=True)
    if df.empty:
        raise ValueError(f"No data for {ticker} between {start} and {end}")
    df = df[['Open','High','Low','Close','Volume']]  # Close is already adjusted
    df.dropna(inplace=True)
    return df


def compute_technical_indicators(df: pd.DataFrame) -> pd.DataFrame:
    """Compute simple indicators: SMA, returns, RSI."""
    out = df.copy()
    out['SMA_10'] = out['Close'].rolling(10).mean()
    out['SMA_50'] = out['Close'].rolling(50).mean()
    out['Return'] = out['Close'].pct_change()
    # RSI
    delta = out['Close'].diff()
    up = delta.clip(lower=0)
    down = -1 * delta.clip(upper=0)
    ma_up = up.rolling(14).mean()
    ma_down = down.rolling(14).mean()
    rs = ma_up / (ma_down + 1e-9)
    out['RSI_14'] = 100 - (100/(1+rs))
    out.dropna(inplace=True)
    return out


def create_sequences(values: np.ndarray, lookback: int) -> tuple:
    """Create sequences X, y from time series values.
    values: 2D array (timesteps, features). We'll predict next-step Close by default (last column assumed Close).
    Returns: X (num_samples, lookback, features), y (num_samples,)
    """
    X, y = [], []
    for i in range(len(values) - lookback):
        X.append(values[i:i+lookback])
        y.append(values[i+lookback, 0])  # assume Close is first column in features
    return np.array(X), np.array(y)


def prepare_data(df: pd.DataFrame, lookback: int = 60, test_size: float = 0.2):
    """Return scaled train/test datasets and the scaler objects.

    Steps:
    - select feature columns
    - scale using MinMaxScaler
    - create sequences for LSTM
    """
    df2 = df.copy()
    # choose features: Close, SMA_10, SMA_50, RSI_14, Volume, Return
    # Note: Close is already adjusted from yfinance
    features = ['Close', 'SMA_10', 'SMA_50', 'RSI_14', 'Volume', 'Return']
    data = df2[features]
    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(data)

    X, y = create_sequences(scaled, lookback)
    split = int(len(X) * (1 - test_size))
    X_train, X_test = X[:split], X[split:]
    y_train, y_test = y[:split], y[split:]

    return X_train, X_test, y_train, y_test, scaler
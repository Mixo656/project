import os
import sys
import traceback
from datetime import datetime, timedelta

# Ensure project root is on sys.path so `src` can be imported when running the test from repo root
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.data import compute_technical_indicators, prepare_data
from src.model import build_lstm

import numpy as np
import pandas as pd


def generate_synthetic_df(days: int = 500, start_price: float = 100.0) -> pd.DataFrame:
    """Generate a synthetic OHLCV DataFrame suitable for the pipeline."""
    rng = pd.date_range(end=datetime.now().date(), periods=days, freq='B')
    np.random.seed(42)
    # Random walk for close
    returns = np.random.normal(loc=0.0005, scale=0.02, size=len(rng))
    price = start_price * np.exp(np.cumsum(returns))
    close = price
    openp = close * (1 + np.random.normal(0, 0.002, size=len(rng)))
    high = np.maximum(openp, close) * (1 + np.abs(np.random.normal(0, 0.002, size=len(rng))))
    low = np.minimum(openp, close) * (1 - np.abs(np.random.normal(0, 0.002, size=len(rng))))
    adj_close = close.copy()
    volume = np.random.randint(100_000, 1_000_000, size=len(rng))

    df = pd.DataFrame({
        'Open': openp,
        'High': high,
        'Low': low,
        'Close': close,
        'Adj Close': adj_close,
        'Volume': volume,
    }, index=rng)
    return df


def run_offline_smoke():
    try:
        lookback = 30
        epochs = 1
        batch_size = 16

        print('Generating synthetic data...')
        df = generate_synthetic_df(days=400, start_price=150.0)
        if df is None or df.empty:
            raise RuntimeError('Synthetic dataframe empty')

        df = compute_technical_indicators(df)
        if df.empty:
            raise RuntimeError('Dataframe empty after computing indicators')

        print('Preparing sequences...')
        X_train, X_test, y_train, y_test, scaler = prepare_data(df, lookback=lookback, test_size=0.5)
        print('Shapes:', X_train.shape, X_test.shape, y_train.shape, y_test.shape)

        if X_train.size == 0:
            raise RuntimeError('No training samples created')

        print('Building model...')
        model = build_lstm((X_train.shape[1], X_train.shape[2]))

        print('Training for 1 epoch (offline smoke test)...')
        model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=epochs, batch_size=batch_size, verbose=2)

        # save model to a temporary folder
        out_dir = os.path.join('tests', 'smoke_models_offline')
        os.makedirs(out_dir, exist_ok=True)
        model_path = os.path.join(out_dir, 'smoke_model_offline.h5')
        model.save(model_path)
        print('Saved smoke model to', model_path)

        # do a quick prediction
        last_seq = X_test[-1:]
        pred = model.predict(last_seq)
        print('Prediction shape:', pred.shape)
        if pred.shape[0] != 1 or pred.shape[1] != 1:
            raise RuntimeError('Unexpected prediction shape')

        print('\nOFFLINE SMOKE TEST PASSED: training and prediction completed successfully')
        return 0

    except Exception as e:
        print('\nOFFLINE SMOKE TEST FAILED')
        traceback.print_exc()
        return 1


if __name__ == '__main__':
    code = run_offline_smoke()
    sys.exit(code)
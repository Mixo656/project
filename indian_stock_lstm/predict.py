import argparse
import pickle
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model

from src.data import download_data, compute_technical_indicators


def iterative_predict(model, last_sequence, n_steps, scaler):
    # last_sequence: scaled array shape (lookback, features)
    seq = last_sequence.copy()
    preds = []
    for _ in range(n_steps):
        x = seq[np.newaxis, ...]
        p = model.predict(x, verbose=0)[0,0]
        preds.append(p)
        # form next sequence by appending predicted step and dropping first
        next_row = seq[-1].copy()
        # we'll set Close (col 0) to predicted value; leave other features as previous (approx)
        next_row[0] = p
        seq = np.vstack([seq[1:], next_row])
    preds = np.array(preds).reshape(-1,1)
    # Inverse transform requires reconstructing full feature vector; we'll inverse transform by replacing Close column and leaving others as last known
    return preds


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--ticker', type=str, required=True)
    parser.add_argument('--model-path', type=str, required=True)
    parser.add_argument('--scaler-path', type=str, default=None)
    parser.add_argument('--start', type=str, default='2018-01-01')
    parser.add_argument('--end', type=str, default=None)
    parser.add_argument('--lookback', type=int, default=60)
    parser.add_argument('--n-days', type=int, default=5)
    args = parser.parse_args()

    model = load_model(args.model_path)
    if args.scaler_path:
        with open(args.scaler_path, 'rb') as f:
            scaler = pickle.load(f)
    else:
        scaler = None

    df = download_data(args.ticker, args.start, args.end if args.end else None)
    df = compute_technical_indicators(df)

    features = ['Close', 'SMA_10', 'SMA_50', 'RSI_14', 'Volume', 'Return']
    data = df[features].values

    if scaler is not None:
        scaled = scaler.transform(df[features])
    else:
        scaled = data

    last_seq = scaled[-args.lookback:]
    preds_scaled = iterative_predict(model, last_seq, args.n_days, scaler)

    if scaler is not None:
        # To inverse transform predictions, create placeholder arrays by repeating last row and replacing Close
        inv = []
        last_row = scaled[-1].copy()
        for p in preds_scaled:
            row = last_row.copy()
            row[0] = p[0]
            inv.append(row)
        inv = np.array(inv)
        inv_full = scaler.inverse_transform(inv)
        preds_close = inv_full[:,0]
    else:
        preds_close = preds_scaled.flatten()

    print('Predicted Close prices:')
    for i, v in enumerate(preds_close, 1):
        print(f"Day +{i}: {v:.2f}")

if __name__ == '__main__':
    main()
import argparse
import os
import pickle
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime

from src.data import download_data, compute_technical_indicators, prepare_data
from src.model import build_lstm, train_model


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--ticker', type=str, required=True)
    parser.add_argument('--start', type=str, default='2018-01-01')
    parser.add_argument('--end', type=str, default=datetime.now().strftime('%Y-%m-%d'))
    parser.add_argument('--lookback', type=int, default=60)
    parser.add_argument('--epochs', type=int, default=10)
    parser.add_argument('--batch-size', type=int, default=32)
    parser.add_argument('--out-dir', type=str, default='models')
    args = parser.parse_args()

    print(f"Downloading {args.ticker} from {args.start} to {args.end}...")
    df = download_data(args.ticker, args.start, args.end)
    df = compute_technical_indicators(df)
    X_train, X_test, y_train, y_test, scaler = prepare_data(df, lookback=args.lookback)

    print("Building model...")
    model = build_lstm((X_train.shape[1], X_train.shape[2]))
    print(model.summary())

    print("Training...")
    history, ckpt = train_model(model, X_train, y_train, X_test, y_test, out_dir=args.out_dir, epochs=args.epochs, batch_size=args.batch_size)

    # Save scaler and training history
    os.makedirs('artifacts', exist_ok=True)
    scaler_path = os.path.join('artifacts', f'{args.ticker}_scaler.pkl')
    with open(scaler_path, 'wb') as f:
        pickle.dump(scaler, f)

    hist_path = os.path.join('artifacts', f'{args.ticker}_history.pkl')
    with open(hist_path, 'wb') as f:
        pickle.dump(history.history, f)

    # Plot training history
    plt.figure()
    plt.plot(history.history['loss'], label='train_loss')
    plt.plot(history.history['val_loss'], label='val_loss')
    plt.legend()
    plt.title(f'Training loss for {args.ticker}')
    plt.savefig(os.path.join('artifacts', f'{args.ticker}_training.png'))
    plt.close()

    print(f"Training completed. Best model (by val_loss) saved to: {ckpt}")
    print(f"Scaler saved to: {scaler_path}")

if __name__ == '__main__':
    main()
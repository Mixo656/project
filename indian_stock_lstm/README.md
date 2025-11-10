# Indian Stock Market Analysis + LSTM Prediction

This project provides a minimal end-to-end pipeline to analyze and forecast Indian stock prices using an LSTM model (TensorFlow/Keras).

Contents
- `requirements.txt` - Python deps
- `src/data.py` - download & preprocessing utilities
- `src/model.py` - LSTM model builder, train & save helpers
- `train.py` - CLI to train a model for a given ticker
- `predict.py` - Script to load model and forecast next n days

Quick start (Windows PowerShell)

1) Create & activate venv

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
```

2) Install deps

```powershell
pip install -r requirements.txt
```

3) Train a small model (example)

```powershell
python train.py --ticker RELIANCE.NS --start 2018-01-01 --end 2024-12-31 --epochs 5
```

4) Predict next 5 days

```powershell
python predict.py --ticker RELIANCE.NS --model-path models/RELIANCE.NS_lstm.h5 --n-days 5
```

Notes & assumptions
- Uses `yfinance` to fetch price data; Indian tickers use the `.NS` suffix (NSE). Example: `RELIANCE.NS`, `TCS.NS`.
- This is a demonstration. For production use: more features, hyperparameter tuning, cross-validation, and careful backtesting are required.

Next steps (suggested)
- Add technical indicators and alternative features
- Use walk-forward cross-validation
- Add backtesting module and transaction costs
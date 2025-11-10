import os
from typing import Tuple
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping


def build_lstm(input_shape: Tuple[int,int]) -> tf.keras.Model:
    model = Sequential()
    model.add(LSTM(64, return_sequences=True, input_shape=input_shape))
    model.add(Dropout(0.2))
    model.add(LSTM(32))
    model.add(Dropout(0.2))
    model.add(Dense(16, activation='relu'))
    model.add(Dense(1, activation='linear'))
    model.compile(
        optimizer='adam',
        loss=tf.keras.losses.MeanSquaredError(),
        metrics=[tf.keras.metrics.MeanAbsoluteError()]
    )
    return model


def train_model(model: tf.keras.Model, X_train, y_train, X_val, y_val, out_dir: str, epochs: int = 20, batch_size: int = 32):
    os.makedirs(out_dir, exist_ok=True)
    ckpt_path = os.path.join(out_dir, 'best_model.h5')
    callbacks = [
        ModelCheckpoint(ckpt_path, save_best_only=True, monitor='val_loss'),
        EarlyStopping(monitor='val_loss', patience=8, restore_best_weights=True)
    ]
    history = model.fit(
        X_train, y_train,
        validation_data=(X_val, y_val),
        epochs=epochs,
        batch_size=batch_size,
        callbacks=callbacks,
        verbose=2
    )
    return history, ckpt_path
"use client";

import { useState } from "react";

interface QuantityStepperProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function QuantityStepper({
  initialValue = 1,
  min = 1,
  max = 99,
  onChange,
}: QuantityStepperProps) {
  const [value, setValue] = useState(initialValue);

  const handleDecrease = () => {
    if (value > min) {
      const newValue = value - 1;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      const newValue = value + 1;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min;
    const clampedValue = Math.min(Math.max(newValue, min), max);
    setValue(clampedValue);
    onChange?.(clampedValue);
  };

  return (
    <div className="quantity-stepper">
      <button
        onClick={handleDecrease}
        disabled={value <= min}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Giảm số lượng"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        aria-label="Số lượng"
      />
      <button
        onClick={handleIncrease}
        disabled={value >= max}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Tăng số lượng"
      >
        +
      </button>
    </div>
  );
}

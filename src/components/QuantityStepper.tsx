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
    <div className="inline-flex items-center border-2 border-[#f2c18d] rounded-xl overflow-hidden bg-white">
      <button
        onClick={handleDecrease}
        disabled={value <= min}
        className="w-12 h-12 flex items-center justify-center bg-[#fff8e7] hover:bg-[#ffd700]/30 text-[#c41e3a] font-bold text-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
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
        className="w-16 h-12 text-center font-bold text-lg border-none focus:outline-none"
        aria-label="Số lượng"
      />
      <button
        onClick={handleIncrease}
        disabled={value >= max}
        className="w-12 h-12 flex items-center justify-center bg-[#fff8e7] hover:bg-[#ffd700]/30 text-[#c41e3a] font-bold text-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Tăng số lượng"
      >
        +
      </button>
    </div>
  );
}

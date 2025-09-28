'use client';
import React, { FC, useState } from 'react';
import type { DateRange as RDDateRange } from 'react-day-picker';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export interface DateRange {
  from?: string;
  to?: string;
}

interface InputDateProps {
  onConfirm: (date: DateRange) => void;
}

const InputDate: FC<InputDateProps> = ({ onConfirm }) => {
  const [range, setRange] = useState<RDDateRange | undefined>();
  const [open, setOpen] = useState(false);

  const handleApply = () => {
    onConfirm?.({
      from: range?.from ? range.from.toISOString() : undefined,
      to: range?.to ? range.to.toISOString() : undefined,
    });
    setOpen(false);
  };

  const handleReset = () => {
    setRange(undefined);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          {range?.from && range?.to
            ? `${range.from.toLocaleDateString()} – ${range.to.toLocaleDateString()}`
            : 'Select date range'}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-full">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={range}
          required={true}
          onSelect={(r: RDDateRange | undefined) => setRange(r)}
        />
        <div className="flex justify-between p-2 border-t">
          <Button variant="ghost" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { InputDate };

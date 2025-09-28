'use client';
import { Filters, SortDir, SortKey } from '@/lib/types';
import React, { useState } from 'react';
import { SortBar } from './sort-bar';
import { FilterBar } from './filter-bar';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface ToolBarProps {
  sortKey: SortKey;
  sortDir: SortDir;
  onSortKey: (k: SortKey) => void;
  onSortDir: (d: SortDir) => void;
  filters: Filters;
  onFilters: (f: Filters) => void;
}

const ToolBar = ({
  sortKey,
  sortDir,
  onSortKey,
  onSortDir,
  filters,
  onFilters,
}: ToolBarProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4 justify-between">
        <SortBar
          onSortDir={onSortDir}
          onSortKey={onSortKey}
          sortDir={sortDir}
          sortKey={sortKey}
        />
        <Button
          variant={open ? 'default' : 'outline'}
          onClick={() => setOpen((prev) => !prev)}
          className="flex gap-2 items-center"
        >
          <Filter className="h-4 w-4" />
          <span className="hidden md:block">Filters</span>
        </Button>
      </div>
      <FilterBar filters={filters} onFilters={onFilters} open={open} />
    </div>
  );
};

export { ToolBar };

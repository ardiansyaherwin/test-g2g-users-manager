import React, { FC } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortDir, SortKey } from '@/lib/types';

interface SortBarProps {
  sortKey: SortKey;
  sortDir: SortDir;
  onSortKey: (k: SortKey) => void;
  onSortDir: (d: SortDir) => void;
}

const SortBar: FC<SortBarProps> = ({
  sortKey,
  sortDir,
  onSortKey,
  onSortDir,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="space-y-1">
        <Label htmlFor="sortKey">Sort by</Label>
        <Select value={sortKey} onValueChange={(v) => onSortKey(v as SortKey)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="dob">DOB</SelectItem>
            <SelectItem value="gender">Gender</SelectItem>
            <SelectItem value="createdAt">Created At</SelectItem>
            <SelectItem value="updatedAt">Updated At</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="sortDir">Direction</Label>
        <Select
          value={sortDir}
          onValueChange={(v) => onSortDir(v as 'asc' | 'desc')}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export { SortBar };

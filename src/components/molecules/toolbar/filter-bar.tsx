'use client';
import React, { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Filters } from '@/lib/types';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filters: Filters;
  onFilters: (f: Filters) => void;
  open: boolean;
}

const FilterBar: FC<FilterBarProps> = ({ filters, onFilters, open }) => {
  return (
    <div
      className={cn(
        'mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 border border-neutral-200 p-4',
        open ? 'grid' : 'hidden'
      )}
    >
      <div className="space-y-1">
        <Label>Name</Label>
        <Input
          placeholder="Search name"
          value={filters.name}
          onChange={(e) => onFilters({ ...filters, name: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label>Email</Label>
        <Input
          value={filters.email}
          onChange={(e) => onFilters({ ...filters, email: e.target.value })}
          placeholder="Search email"
        />
      </div>
      <div className="space-y-1">
        <Label>Gender</Label>
        <Select
          value={filters.gender}
          onValueChange={(v) =>
            onFilters({ ...filters, gender: v as Filters['gender'] })
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>DOB From</Label>
        <Input
          type="date"
          value={filters.dobFrom || ''}
          onChange={(e) => onFilters({ ...filters, dobFrom: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label>DOB To</Label>
        <Input
          type="date"
          value={filters.dobTo || ''}
          onChange={(e) => onFilters({ ...filters, dobTo: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label>Profile Pic</Label>
        <Select
          value={filters.hasProfile}
          onValueChange={(v) =>
            onFilters({
              ...filters,
              hasProfile: v as Filters['hasProfile'],
            })
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            <SelectItem value="with">With</SelectItem>
            <SelectItem value="without">Without</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Created From</Label>
        <Input
          type="date"
          value={filters.createdFrom || ''}
          onChange={(e) =>
            onFilters({ ...filters, createdFrom: e.target.value })
          }
        />
      </div>
      <div className="space-y-1">
        <Label>Created To</Label>
        <Input
          type="date"
          value={filters.createdTo || ''}
          onChange={(e) => onFilters({ ...filters, createdTo: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label>Updated From</Label>
        <Input
          type="date"
          value={filters.updatedFrom || ''}
          onChange={(e) =>
            onFilters({ ...filters, updatedFrom: e.target.value })
          }
        />
      </div>
      <div className="space-y-1">
        <Label>Updated To</Label>
        <Input
          type="date"
          value={filters.updatedTo || ''}
          onChange={(e) => onFilters({ ...filters, updatedTo: e.target.value })}
        />
      </div>
    </div>
  );
};

export { FilterBar };

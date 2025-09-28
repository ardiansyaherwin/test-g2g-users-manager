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
import { InputDate } from '../input-date';

interface FilterBarProps {
  filters: Filters;
  onFilters: (f: Filters) => void;
  open: boolean;
}

const FilterBar: FC<FilterBarProps> = ({ filters, onFilters, open }) => {
  return (
    <div
      className={cn(
        'mt-4 flex flex-col gap-4 border border-neutral-200 p-4',
        open ? 'flex' : 'hidden'
      )}
    >
      <div className="grid md:grid-cols-5 gap-4">
        <div className="col-span-3 grid grid-cols-2 gap-4">
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
              placeholder="Search email"
              value={filters.email}
              onChange={(e) => onFilters({ ...filters, email: e.target.value })}
            />
          </div>
        </div>

        <div className="col-span-3 md:col-span-2 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Gender</Label>
            <Select
              value={filters.gender}
              onValueChange={(v) =>
                onFilters({ ...filters, gender: v as Filters['gender'] })
              }
            >
              <SelectTrigger className="w-full">
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
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="with">With</SelectItem>
                <SelectItem value="without">Without</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label>Created at</Label>
          <InputDate
            onConfirm={(range) =>
              onFilters({
                ...filters,
                createdFrom: range.from,
                createdTo: range.to,
              })
            }
          />
        </div>

        <div className="space-y-1">
          <Label>Updated at</Label>
          <InputDate
            onConfirm={(range) =>
              onFilters({
                ...filters,
                updatedFrom: range.from,
                updatedTo: range.to,
              })
            }
          />
        </div>
        <div className="space-y-1">
          <Label>DOB</Label>
          <InputDate
            onConfirm={(range) =>
              onFilters({
                ...filters,
                dobFrom: range.from,
                dobTo: range.to,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export { FilterBar };

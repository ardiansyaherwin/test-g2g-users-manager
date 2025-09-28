import { Download, LayoutGrid, ListIcon, PlusCircle } from 'lucide-react';
import React, { FC } from 'react';

import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ViewMode } from '@/lib/types';

interface ToolbarProps {
  title: string;
  view: ViewMode;
  onViewToggle: (v: ViewMode) => void;
  onAddUser: () => void;
  onExport?: () => void;
}

const PageHeader: FC<ToolbarProps> = ({
  title,
  view,
  onViewToggle,
  onAddUser,
  onExport,
}) => {
  return (
    <>
      <header className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <ToggleGroup
              type="single"
              value={view}
              onValueChange={(v) => v && onViewToggle(v as ViewMode)}
            >
              <ToggleGroupItem value="list">
                <ListIcon className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="grid">
                <LayoutGrid className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            {onExport && (
              <Button variant="outline" onClick={onExport}>
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            )}
          </div>
          <Button onClick={() => onAddUser()}>
            <PlusCircle className="h-4 w-4" />
            User
          </Button>
        </div>
      </header>
    </>
  );
};

export { PageHeader };

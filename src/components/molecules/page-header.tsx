import React, { FC } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Download, LayoutGrid, ListIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewMode } from '@/lib/types';

interface ToolbarProps {
  title: string;
  view: ViewMode;
  onViewToggle: (v: ViewMode) => void;
  onExport?: () => void;
}

const PageHeader: FC<ToolbarProps> = ({
  title,
  view,
  onViewToggle,
  onExport,
}) => {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">{title}</h1>
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
    </header>
  );
};

export { PageHeader };

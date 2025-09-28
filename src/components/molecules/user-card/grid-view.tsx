import { format } from 'date-fns';
import { Edit3, Trash2 } from 'lucide-react';
import React, { FC } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DISPLAY_DATE_FORMAT, DISPLAY_DATE_TIME_FORMAT } from '@/lib/constanta';

import { ListViewProps } from './list-view';

type GridViewProps = ListViewProps;

const GridView: FC<GridViewProps> = ({ users, onSelect }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {users.map((u) => (
        <Card key={u.id} className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Avatar className="size-16">
              <AvatarImage src={u.profilePicture} />
              <AvatarFallback>{u.name[0]}</AvatarFallback>
            </Avatar>
            <div className="font-medium">{u.name}</div>
          </div>
          <div>
            <div className="[&>*]:text-xs [&>*]:text-muted-foreground">
              <p>{u.email}</p>
              <p>{format(u.dob, DISPLAY_DATE_FORMAT)}</p>
              <p className="capitalize">{u.gender}</p>
            </div>
          </div>
          <div className="flex justify-between gap-2 items-center">
            <em className="text-[10px] text-muted-foreground">
              Last updated at:{' '}
              {u?.updatedAt
                ? format(u?.updatedAt, DISPLAY_DATE_TIME_FORMAT)
                : format(new Date(), DISPLAY_DATE_TIME_FORMAT)}
            </em>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onSelect('edit', u)}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onSelect('delete', u)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export { GridView };

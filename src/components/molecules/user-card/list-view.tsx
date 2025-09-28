import { format } from 'date-fns';
import { Edit3, Trash2 } from 'lucide-react';
import React, { FC } from 'react';

import { DISPLAY_DATE_FORMAT, DISPLAY_DATE_TIME_FORMAT } from '@/lib/constanta';
import { UserCardSelection, UserDoc } from '@/lib/types';

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

export interface ListViewProps {
  users: UserDoc[];
  onSelect: (type: UserCardSelection, user: UserDoc) => void;
}

const ListView: FC<ListViewProps> = ({ users, onSelect }) => {
  return (
    <>
      <div className="space-y-2">
        {users.map((u) => (
          <Card
            key={u.id}
            className="flex md:flex-row items-center justify-between p-4"
          >
            <div className="flex w-full md:w-auto items-start gap-6">
              <Avatar className="size-24">
                <AvatarImage src={u.profilePicture} />
                <AvatarFallback>{u.name[0]}</AvatarFallback>
              </Avatar>
              <div className="[&>*]:text-xs [&>*]:text-muted-foreground">
                <p className="font-medium !text-black !text-sm mb-2">
                  {u.name}
                </p>
                <p>{u.email}</p>
                <p>{format(u.dob, DISPLAY_DATE_FORMAT)}</p>
                <p className="capitalize">{u.gender}</p>
                <em>
                  Last updated at:{' '}
                  {u?.updatedAt
                    ? format(u?.updatedAt, DISPLAY_DATE_TIME_FORMAT)
                    : format(new Date(), DISPLAY_DATE_TIME_FORMAT)}
                </em>
              </div>
            </div>
            <div className="flex w-full md:w-auto justify-end gap-2">
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
          </Card>
        ))}
      </div>
    </>
  );
};

export { ListView };

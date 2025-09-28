import React from 'react'
import { ListView } from './list-view';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit3, Trash2 } from 'lucide-react';

const GridView = (props: Parameters<typeof ListView>[0]) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {props.users.map((u) => (
        <Card key={u.id} className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Avatar><AvatarImage src={u.profilePicture} /><AvatarFallback>{u.name[0]}</AvatarFallback></Avatar>
            <div className="font-medium">{u.name}</div>
          </div>
          <div className="text-sm">{u.email}</div>
          <div className="text-xs text-muted-foreground">{u.dob}</div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon"><Edit3 className="h-4 w-4" /></Button>
            <Button variant="destructive" size="icon" onClick={() => props.onDelete(u.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export { GridView }

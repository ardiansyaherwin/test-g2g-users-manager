import { UserDoc, UserInput } from '@/lib/types';
import React from 'react';
import { Card } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Edit3, Trash2 } from 'lucide-react';

const ListView = ({
  users,
  onDelete,
  onUpdate,
}: {
  users: UserDoc[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: Partial<UserInput>) => void;
}) => {
  return (
    <div className="space-y-2">
      {users.map((u) => (
        <Card key={u.id} className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={u.profilePicture} />
              <AvatarFallback>{u.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-muted-foreground">{u.email}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                {/* Implement small edit form similar to UserForm calling onUpdate */}
              </DialogContent>
            </Dialog>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(u.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export { ListView };

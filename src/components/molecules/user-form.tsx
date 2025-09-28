'use client';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Gender, UserDoc, UserInput } from '@/lib/types';

interface UserFormProps {
  onSubmit: (values: UserInput) => Promise<void> | void;
  onCancel?: () => void;
  initialValues?: Partial<UserDoc>;
  mode?: 'add' | 'edit';
}

export const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  mode = 'add',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [profilePicture, setProfilePicture] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({
      name,
      email,
      dob,
      gender: gender || 'other',
      profilePicture,
    });
    setLoading(false);

    if (mode === 'add') {
      setName('');
      setEmail('');
      setDob('');
      setGender('other');
      setProfilePicture('');
    }
  };

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name ?? '');
      setEmail(initialValues.email ?? '');
      setDob(initialValues.dob ?? '');
      setGender((initialValues.gender as Gender) ?? '');
      setProfilePicture(initialValues.profilePicture ?? '');
    }
  }, [initialValues]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dob">DOB</Label>
        <Input
          id="dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Gender</Label>
        <Select
          value={gender}
          onValueChange={(v) => {
            if (v) setGender(v as Gender);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="sm:col-span-2 space-y-2">
        <Label htmlFor="profilePicture">Profile Picture URL</Label>
        <Input
          id="profilePicture"
          placeholder="https://…"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
      </div>

      <div className="sm:col-span-2 flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving…' : mode === 'edit' ? 'Save Changes' : 'Add User'}
        </Button>
      </div>
    </form>
  );
};

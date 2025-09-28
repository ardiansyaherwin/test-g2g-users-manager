import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UserInput, Gender } from "@/lib/types";
import { Card } from '../ui/card';
import { Button } from '../ui/button';

const UserForm = ({ onSubmit }: { onSubmit: (input: UserInput) => Promise<void> }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<Gender>("other");
  const [profilePicture, setProfilePicture] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit({ name, email, dob, gender, profilePicture });
    setName(""); setEmail(""); setDob(""); setGender("other"); setProfilePicture("");
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-6">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">DOB</Label>
          <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Gender</Label>
          <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
            <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-3 space-y-2">
          <Label htmlFor="pic">Profile Picture URL</Label>
          <Input id="pic" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
        </div>
        <div className="md:col-span-3 flex items-end">
          <Button type="submit" className="w-full md:w-auto">Add User</Button>
        </div>
      </form>
    </Card>
  );
}

export { UserForm }

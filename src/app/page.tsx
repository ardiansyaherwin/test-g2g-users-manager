'use client';

import { useEffect, useMemo, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
  query,
} from 'firebase/firestore';
import type {
  DateRange,
  Filters,
  SortKey,
  UserDoc,
  UserInput,
  ViewMode,
} from '@/lib/types';

import { Separator } from '@/components/ui/separator';
import { escapeCSV, toISO } from '@/helpers/to-ISO-helper';
import { UserForm } from '@/components/molecules/user-form';
import { ListView } from '@/components/molecules/user-card/list-view';
import { GridView } from '@/components/molecules/user-card/grid-view';
import { PageHeader } from '@/components/molecules/page-header';
import { ToolBar } from '@/components/molecules/toolbar';

const USERS_COL = 'users';

export default function Page() {
  const [view, setView] = useState<ViewMode>('list');
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [createdRange, setCreatedRange] = useState<DateRange>({});

  const [filters, setFilters] = useState<Filters>({
    name: '',
    email: '',
    gender: 'all',
    hasProfile: 'all',
  });

  useEffect(() => {
    const q = query(collection(db, USERS_COL));
    const unsub = onSnapshot(q, (snap) => {
      const list: UserDoc[] = snap.docs.map((d) => {
        const data = d.data() as UserDoc;
        return {
          id: d.id,
          name: data.name ?? '',
          email: data.email ?? '',
          dob: data.dob ?? '',
          gender: data.gender ?? 'other',
          profilePicture: data.profilePicture ?? '',
          createdAt: toISO(data.createdAt),
          updatedAt: toISO(data.updatedAt),
        };
      });
      setUsers(list);
    });
    return () => unsub();
  }, []);

  const filtered = useMemo(
    () => applyFilters(users, filters),
    [users, filters]
  );

  const displayed = useMemo(
    () => applySort(filtered, sortKey, sortDir),
    [filtered, sortKey, sortDir]
  );

  async function addUser(input: UserInput) {
    await addDoc(collection(db, USERS_COL), {
      ...input,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  async function deleteUser(id: string) {
    await deleteDoc(doc(db, USERS_COL, id));
  }

  async function updateUser(id: string, patch: Partial<UserInput>) {
    await updateDoc(doc(db, USERS_COL, id), {
      ...patch,
      updatedAt: serverTimestamp(),
    });
  }

  function exportCSV() {
    const csv = [
      [
        'Name',
        'Email',
        'DOB',
        'Gender',
        'Profile Picture',
        'Created At',
        'Updated At',
      ],
      ...displayed.map((u) => [
        u.name,
        u.email,
        u.dob,
        u.gender,
        u.profilePicture ?? '',
        u.createdAt,
        u.updatedAt,
      ]),
    ]
      .map((r) => r.map(escapeCSV).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function applySort(
    list: UserDoc[],
    key: SortKey,
    dir: 'asc' | 'desc'
  ): UserDoc[] {
    const sorted = [...list].sort((a, b) => {
      const va = (a[key] ?? '').toString().toLowerCase();
      const vb = (b[key] ?? '').toString().toLowerCase();
      if (va < vb) return -1;
      if (va > vb) return 1;
      return 0;
    });
    return dir === 'asc' ? sorted : sorted.reverse();
  }

  function applyFilters(list: UserDoc[], f: Filters): UserDoc[] {
    // Helper to check if an ISO date is within a given range
    const inRange = (iso: string, from?: string | Date, to?: string | Date) => {
      if (!iso) return false;
      const t = new Date(iso).getTime();
      if (from && t < new Date(from).getTime()) return false;
      if (to && t > new Date(to).getTime()) return false;
      return true;
    };

    return list.filter((u) => {
      // --- text search ---
      if (f.name && !u.name.toLowerCase().includes(f.name.toLowerCase()))
        return false;
      if (f.email && !u.email.toLowerCase().includes(f.email.toLowerCase()))
        return false;

      // --- gender filter ---
      if (f.gender && f.gender !== 'all' && u.gender !== f.gender) return false;

      // --- DOB range ---
      if (f.dobFrom || f.dobTo) {
        if (!u.dob) return false;
        if (!inRange(u.dob, f.dobFrom, f.dobTo)) return false;
      }

      // --- profile picture presence ---
      if (f.hasProfile === 'with' && !u.profilePicture) return false;
      if (f.hasProfile === 'without' && !!u.profilePicture) return false;

      // --- createdAt range ---
      if (
        (f.createdFrom || f.createdTo) &&
        !inRange(u.createdAt, f.createdFrom, f.createdTo)
      )
        return false;

      // --- updatedAt range ---
      if (
        (f.updatedFrom || f.updatedTo) &&
        !inRange(u.updatedAt, f.updatedFrom, f.updatedTo)
      )
        return false;

      return true;
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users Manager"
        view={view}
        onViewToggle={setView}
        onExport={exportCSV}
      />

      <UserForm onSubmit={addUser} />

      <ToolBar
        sortKey={sortKey}
        sortDir={sortDir}
        onSortKey={setSortKey}
        onSortDir={setSortDir}
        filters={filters}
        onFilters={setFilters}
      />
      <Separator className="my-4" />

      {view === 'list' ? (
        <ListView
          users={displayed}
          onDelete={deleteUser}
          onUpdate={updateUser}
        />
      ) : (
        <GridView
          users={displayed}
          onDelete={deleteUser}
          onUpdate={updateUser}
        />
      )}
    </div>
  );
}

'use client';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { escapeCSV, toISO } from '@/helpers/to-ISO-helper';
import { db } from '@/lib/firebase';
import { Filters, SortDir, SortKey, UserDoc, UserInput } from '@/lib/types';

const USERS_COL = 'users';

interface PageContextProps {
  displayed: UserDoc[];
  handleExportCSV: () => void;
  sortKey: SortKey;
  sortDir: SortDir;
  filters: Filters;
  setSortKey: (key: SortKey) => void;
  setSortDir: (dir: SortDir) => void;
  setFilters: (filter: Filters) => void;
  addUser: (values: UserInput) => void;
  deleteUser: (id: string) => void;
  updateUser: (id: string, patch: Partial<UserInput>) => void;
}

const PageContext = createContext<PageContextProps>({
  displayed: [],
  handleExportCSV: () => {},
  sortKey: 'createdAt',
  sortDir: 'asc',
  filters: {
    name: '',
    email: '',
    gender: 'all',
    hasProfile: 'all',
  },
  setSortKey: () => {},
  setSortDir: () => {},
  setFilters: () => {},
  addUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
});

export const PageContextProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState<Filters>({
    name: '',
    email: '',
    gender: 'all',
    hasProfile: 'all',
  });

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
      if (f.name && !u.name.toLowerCase().includes(f.name.toLowerCase()))
        return false;
      if (f.email && !u.email.toLowerCase().includes(f.email.toLowerCase()))
        return false;

      if (f.gender && f.gender !== 'all' && u.gender !== f.gender) return false;

      if (f.dobFrom || f.dobTo) {
        if (!u.dob) return false;
        if (!inRange(u.dob, f.dobFrom, f.dobTo)) return false;
      }

      if (f.hasProfile === 'with' && !u.profilePicture) return false;
      if (f.hasProfile === 'without' && !!u.profilePicture) return false;

      if (
        (f.createdFrom || f.createdTo) &&
        !inRange(u.createdAt, f.createdFrom, f.createdTo)
      )
        return false;

      if (
        (f.updatedFrom || f.updatedTo) &&
        !inRange(u.updatedAt, f.updatedFrom, f.updatedTo)
      )
        return false;

      return true;
    });
  }

  function handleExportCSV() {
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

  const value = {
    displayed,
    handleExportCSV,
    sortKey,
    sortDir,
    filters,
    setSortDir,
    setSortKey,
    setFilters,
    addUser,
    deleteUser,
    updateUser,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = () => useContext(PageContext);

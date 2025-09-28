export type Gender = 'male' | 'female' | 'all';
export type ViewMode = 'list' | 'grid';

export type UserDoc = {
  id: string;
  name: string;
  email: string;
  dob: string; // YYYY-MM-DD
  gender: Gender;
  profilePicture?: string; // Optional URL
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};

export type UserInput = Omit<UserDoc, 'id' | 'createdAt' | 'updatedAt'>;

export type SortKey = keyof Pick<
  UserDoc,
  'name' | 'email' | 'dob' | 'gender' | 'createdAt' | 'updatedAt'
>;

export type Filters = {
  name: string;
  email: string;
  dobFrom?: string;
  dobTo?: string;
  gender?: Gender | '';
  hasProfile?: 'all' | 'with' | 'without';
  createdFrom?: string;
  createdTo?: string;
  updatedFrom?: string;
  updatedTo?: string;
};

export type SortDir = 'asc' | 'desc';

export type DateRange = {
  from?: Date;
  to?: Date;
};

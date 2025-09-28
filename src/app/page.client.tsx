'use client';

import { useState } from 'react';

import { PageHeader } from '@/components/molecules/page-header';
import { ToolBar } from '@/components/molecules/toolbar';
import { GridView } from '@/components/molecules/user-card/grid-view';
import { ListView } from '@/components/molecules/user-card/list-view';
import { UserForm } from '@/components/molecules/user-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import type {
  UserCardSelection,
  UserDoc,
  UserInput,
  ViewMode,
} from '@/lib/types';

import { usePageContext } from './context';

function PageClient() {
  const {
    displayed,
    handleExportCSV,
    sortDir,
    sortKey,
    setSortDir,
    setSortKey,
    filters,
    setFilters,
    addUser,
    deleteUser,
    updateUser,
  } = usePageContext();
  const [view, setView] = useState<ViewMode>('list');
  const [selectedUser, setSelectedUser] = useState<UserDoc>();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleUserSelect = (type: UserCardSelection, user: UserDoc) => {
    setSelectedUser(user);
    if (type === 'edit') {
      setEditDialogOpen(true);
    }

    if (type === 'delete') {
      setDeleteDialogOpen(true);
    }
  };

  const handleSubmitForm = (values: UserInput, id: string) => {
    if (!id) addUser(values);
    else updateUser(id, values);
    setEditDialogOpen(false);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      setDeleteDialogOpen(false);
      setSelectedUser(undefined);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users Manager"
        view={view}
        onViewToggle={setView}
        onExport={handleExportCSV}
      />

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <UserForm
            mode="edit"
            initialValues={selectedUser}
            onSubmit={(vals) => handleSubmitForm(vals, selectedUser?.id || '')}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{' '}
              <strong>{selectedUser?.name}</strong> data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
        <ListView users={displayed} onSelect={handleUserSelect} />
      ) : (
        <GridView users={displayed} onSelect={handleUserSelect} />
      )}
    </div>
  );
}

export default PageClient;

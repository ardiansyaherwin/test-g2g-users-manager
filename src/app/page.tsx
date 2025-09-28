import { Metadata } from 'next';

import { PageContextProvider } from './context';
import PageClient from './page.client';

export const metadata: Metadata = {
  title: 'G2G Users Manager App',
};
export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <PageContextProvider>
      <PageClient />
    </PageContextProvider>
  );
}

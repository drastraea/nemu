import { NavClient } from './nav-client';
import { auth } from '@/libs/auth';

export const Nav = async () => {
  const session = await auth();
  return <NavClient session={session} />;
};

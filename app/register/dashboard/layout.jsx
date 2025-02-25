import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase';
import { Toaster } from '@/components/ui/sonner';

export default async function DashboardLayout({
  children,
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
}

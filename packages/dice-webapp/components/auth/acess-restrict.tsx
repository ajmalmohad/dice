import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default function withAuth(WrappedComponent: any, role: string) {
  const hocComponent = async ({ ...props }) => {
    const session = await getServerSession(authOptions)
    if (!session) redirect("/auth")
    else if (session.user.role !== role) redirect("/auth")
    return <WrappedComponent {...props} />;
  };

  return hocComponent;
}
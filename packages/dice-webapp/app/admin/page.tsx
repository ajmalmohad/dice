import withAuth from "@/components/auth/acess-restrict";

async function Page() {
  return (
    <div>Admin</div>
  );
}

export default withAuth(Page, "ADMIN");
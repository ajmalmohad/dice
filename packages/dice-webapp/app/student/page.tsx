import withAuth from "@/components/auth/acess-restrict";

async function Page() {
  return (
    <div>Student</div>
  );
}

export default withAuth(Page, "USER");
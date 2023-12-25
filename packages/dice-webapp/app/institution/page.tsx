import withAuth from "@/components/auth/acess-restrict";

async function Page() {
  return (
    <div>Institution</div>
  );
}

export default withAuth(Page, "INSTITUTION");
export default function Page({ params }: { params: { linkId: string } }) {
  return <div>My Link: {params.linkId}</div>;
}

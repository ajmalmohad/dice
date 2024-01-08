const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

export const RecentCertSchema: string[] = [
  "Name",  "Status", "Date", "Issuer",
]

const RecentCertData: string[][] = [
  ["Ajmal", "Active", "12/12/2020", "Kerala University"],
  ["Vishnu", "Active", "12/12/2020", "Kerala University"],
  ["Ajmal", "Active", "12/12/2020", "Kerala University"],
  ["Vishnu", "Active", "12/12/2020", "Kerala University"],
  ["Ajmal", "Active", "12/12/2020", "Kerala University"],
  ["Vishnu", "Active", "12/12/2020", "Kerala University"],
  ["Ajmal", "Active", "12/12/2020", "Kerala University"],
]

export let fetchCertificates = async () => {
  await sleep(1000);
  const response = RecentCertData;
  return response;
}
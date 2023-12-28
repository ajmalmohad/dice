import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  if (!req.body) {
    return { statusCode: 400, body: "No body provided" };
  }

  const body = await req.json();

  if (!body.senderEmail) {
    return { statusCode: 400, body: "No sender email provided" };
  }

  console.log(body);
  const user = await prisma.user.findUnique({
    where: {
      email: body.senderEmail,
    },
  });

  console.log(user);

  if (!user) {
    return { statusCode: 400, body: "No user found with that email" };
  }

  const application = await prisma.applicationForm.create({
    data: {
      institutionName: body.institutionName,
      institutionAddress: body.institutionAddress,
      licenseNumber: body.licenseNumber,
      email: body.email,
      phoneNumber: body.phoneNumber,
      userId: user.id,
    },
  });

  await prisma.user.update({
    where: {
      email: body.senderEmail,
    },
    data: {
      pending: false,
    },
  });

  return Response.json(application);
}

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body)
    return Response.json({ statusCode: 400, body: "No body provided" });

  if (
    !body.institutionName ||
    !body.institutionAddress ||
    !body.licenseNumber ||
    !body.email ||
    !body.phoneNumber ||
    !body.senderEmail
  ) {
    return Response.json({ statusCode: 400, body: "Missing fields" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.senderEmail,
    },
  });

  if (!user) {
    return Response.json({
      statusCode: 404,
      body: "Sender email doesn't match any users",
    });
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

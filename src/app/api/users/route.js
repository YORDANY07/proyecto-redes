import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const users = await prisma.usuario.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener usuarios" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
export async function DELETE(req) {
  const { id } = await req.json(); // Obtener el ID del cuerpo de la solicitud

  try {
    const user = await prisma.usuario.delete({
      where: { C_idUser: id },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return new Response(
      JSON.stringify({ error: "Error al eliminar el usuario" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import db from "@/libs/db";
import bcrypt from 'bcrypt'
import { signIn } from "next-auth/react";

export const authOptions = {
  providers: [
    CredentialsProviders({
      name: "Credentials",
      credentials: {
        D_username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userFound = await db.usuario.findFirst({
          where: {
            D_userName: credentials.D_username,
          },
        });
        if (!userFound)  throw new Error('Usuario no encontrado')
      
        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.D_contrase_a
        );
        
        if (!matchPassword) throw new Error("Wrong password");
        
        return {
          id: userFound.C_idUser,
          name: userFound.D_userName,
          
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
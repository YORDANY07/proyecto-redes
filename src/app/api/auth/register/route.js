const { NextResponse } = require("next/server")
import  db  from "@/libs/db"
import bcrypt from "bcrypt";

export async function POST(request){
    try {
        const data = await request.json()
    const userFound = await db.usuario.findFirst({
        where: {
            
            D_userName: data.D_userName
        }
    })
    if (userFound) {
        return NextResponse.json({
            messge: "El usuario ya existe"
        },{
            status: 400
        })
    }
    console.log(data)
    const hashesPassword = await bcrypt.hash(data.D_contrase_a, 10)
    const newUser = await db.usuario.create({
        data:{
            D_userName: data.D_userName,
            D_contrase_a: hashesPassword
        }
    })
    const { D_contrase_a: _, ...user } = newUser;
    return NextResponse.json(user)

    } catch (error) {
        return NextResponse.json(
            {
              message: error.message,
            },
            {
              status: 500,
            }
          );
        }
      }
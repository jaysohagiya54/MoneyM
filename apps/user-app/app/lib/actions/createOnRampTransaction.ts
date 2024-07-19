"use server";

import prisma from "@repo/db/client";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";


export default async function createOnRampTransaction({provider,value}:{provider:string,value:number}){
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString();


    await prisma.onRampTransaction.create({
        data:{
            provider,
            status:"Processing",
            amount: value * 100,
            token:token,
            startTime:new Date(),
            userId: Number(session?.user?.id),


        }
    })

    return {
        message: "Done"
    }

}
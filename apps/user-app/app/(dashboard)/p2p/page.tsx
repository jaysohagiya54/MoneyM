import prisma from "@repo/db/client";
import { P2pTransactions } from "../../../components/P2pTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { SendCard } from "../../../components/SendCard";


async function getOnP2PTransfer() {
    const session = await getServerSession(authOptions);
    const p2ps = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        }
    });
    return p2ps.map(t => ({
        amount: t.amount,
        timestamp: t.timestamp,
    }))
}

export default async function() {
    const p2pTransfers = await getOnP2PTransfer();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold pl-4">
            P2P Transfer
        </div>
        <div className="flex items-start gap-[200px] p-4">
            <div>
               <SendCard/>
            </div>
            <div>
                <P2pTransactions transactions={p2pTransfers}/>
                
               
            </div>
        </div>
    </div>
}
import { Card } from "@repo/ui/card"

export const P2pTransactions = ({
    transactions
}: {
    transactions: {     
        amount: number,
        timestamp: Date
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div className="pt-2">
                    <div className="text-sm">
                        Received INR  
                    </div> 
                    <div className="text-[0.6rem] font-light">
                        {t.timestamp.toDateString()} 
                    </div>  
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}
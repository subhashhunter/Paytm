import { Card } from "@repo/ui/card";

export const TransferMoney = ({ Transfer }: { 
  Transfer: { 
    timestamp: Date, 
    amount: number 
  }[] 
}) => {
  if (!Transfer.length) { 
    return (
      <Card title="Recent Transfers">
        <div className="text-md text-slate-400">
          No amount Transferred
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transfers">
      <div className="pt-2">
        {Transfer.map((t, index) => (
          <div key={index} className="flex justify-between"> {/* Added a key for the map */}
            <div>
              <div className="text-sm">
                Transferred INR
              </div>
              <div className="text-sm">
                {t.timestamp.toDateString()}
              </div>
            </div>
            <div className="pt-2 flex flex-col justify-center">
              {t.amount / 100} INR
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

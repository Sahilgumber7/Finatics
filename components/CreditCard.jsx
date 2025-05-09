import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CreditCard = ({ username, balance, income, expense }) => {
  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">{username}'s Wallet</CardTitle>

      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-blue-100">Current Balance</p>
          <p className="text-3xl font-semibold">${balance.toLocaleString()}</p>
        </div>
        <div className="flex justify-between text-sm">
          <div className="space-y-1">
            <p className="text-blue-100">Income</p>
            <p className="text-green-200 font-medium">+${income.toLocaleString()}</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-blue-100">Expense</p>
            <p className="text-red-200 font-medium">-${expense.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditCard;

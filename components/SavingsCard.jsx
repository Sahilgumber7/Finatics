"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SavingsCard = ({ title, target, saved }) => {
  const percentage = Math.min((saved / target) * 100, 100);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-sm text-muted-foreground">
          ₹{saved} / ₹{target} saved
        </div>
        <Progress value={percentage} />
        <div className="mt-1 text-sm">{percentage.toFixed(1)}% complete</div>
      </CardContent>
    </Card>
  );
};

export default SavingsCard;

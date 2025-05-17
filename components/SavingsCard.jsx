import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import EditSavingDialog from "@/components/EditSavingDialog"; 
import DeleteSavingDialog from "@/components/DeleteSavingDialog";

/**
 * @param {{ saving: { id: string, title: string, saved_amount: number, target_amount: number }, onUpdate: () => void }}
 */
export default function SavingsCard({ saving, onUpdate }) {
  const { title, saved_amount, target_amount } = saving;

  const saved = Number(saved_amount) || 0;
  const target = Number(target_amount) || 1;
  const progress = Math.min((saved / target) * 100, 100);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <div className="flex items-center space-x-2">
                <EditSavingDialog saving={saving} onUpdate={onUpdate} />
                <DeleteSavingDialog savingId={saving.id} onDelete={onUpdate} />
            </div>        
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center text-base font-semibold">
          <div className="text-xl font-semibold">
            ₹{saved.toLocaleString()}{" "}
            <span className="text-sm text-muted-foreground font-normal">
              / ₹{target.toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {Math.round(progress)}%
          </div>
        </div>

        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}

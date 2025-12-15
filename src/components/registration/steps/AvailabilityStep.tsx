import { Label } from "@/components/ui/label";

interface AvailabilityStepProps {
  data: {
    comfortableWithSwimwear: boolean | null;
  };
  onChange: (field: string, value: boolean) => void;
}

const AvailabilityStep = ({ data, onChange }: AvailabilityStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Additional Information
        </h2>
        <p className="text-muted-foreground">A few more details about your preferences</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Are you comfortable modeling swimwear?</Label>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => onChange("comfortableWithSwimwear", true)}
              className={`flex items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                data.comfortableWithSwimwear === true
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className={`text-lg font-semibold ${
                data.comfortableWithSwimwear === true ? "text-primary" : "text-foreground"
              }`}>
                Yes
              </span>
            </div>
            <div
              onClick={() => onChange("comfortableWithSwimwear", false)}
              className={`flex items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                data.comfortableWithSwimwear === false
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className={`text-lg font-semibold ${
                data.comfortableWithSwimwear === false ? "text-primary" : "text-foreground"
              }`}>
                No
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityStep;
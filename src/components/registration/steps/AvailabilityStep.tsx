import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AvailabilityStepProps {
  data: {
    hasCar: boolean;
    hasLicense: boolean;
    hasPassport: boolean;
    canTravel: boolean;
    comfortableWithSwimwear: boolean | null;
  };
  onChange: (field: string, value: boolean) => void;
}

const AvailabilityStep = ({ data, onChange }: AvailabilityStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Availability & Logistics
        </h2>
        <p className="text-muted-foreground">Practical information for bookings</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <Label htmlFor="hasCar" className="cursor-pointer">Do you have a car?</Label>
          <Switch
            id="hasCar"
            checked={data.hasCar}
            onCheckedChange={(checked) => onChange("hasCar", checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <Label htmlFor="hasLicense" className="cursor-pointer">Do you have a driving license?</Label>
          <Switch
            id="hasLicense"
            checked={data.hasLicense}
            onCheckedChange={(checked) => onChange("hasLicense", checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <Label htmlFor="hasPassport" className="cursor-pointer">Do you have a valid passport?</Label>
          <Switch
            id="hasPassport"
            checked={data.hasPassport}
            onCheckedChange={(checked) => onChange("hasPassport", checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <Label htmlFor="canTravel" className="cursor-pointer">Are you available for international travel?</Label>
          <Switch
            id="canTravel"
            checked={data.canTravel}
            onCheckedChange={(checked) => onChange("canTravel", checked)}
          />
        </div>
      </div>

      {/* Swimwear Poll Question */}
      <div className="mt-8">
        <Label className="block text-center text-lg font-medium mb-4">
          Are you comfortable modeling swimwear?
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onChange("comfortableWithSwimwear", true)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 font-medium text-lg ${
              data.comfortableWithSwimwear === true
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50 text-foreground"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => onChange("comfortableWithSwimwear", false)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 font-medium text-lg ${
              data.comfortableWithSwimwear === false
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50 text-foreground"
            }`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityStep;

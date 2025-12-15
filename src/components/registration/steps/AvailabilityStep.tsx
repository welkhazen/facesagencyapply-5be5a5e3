import { Label } from "@/components/ui/label";

interface AvailabilityStepProps {
  data: {
    interestedInExtra: string;
    hasCar: string;
    hasLicense: string;
    isEmployed: string;
    canTravel: string;
    hasPassport: string;
    hasMultiplePassports: string;
    comfortableWithSwimwear: boolean | null;
  };
  onChange: (field: string, value: string | boolean) => void;
}

const AvailabilityStep = ({ data, onChange }: AvailabilityStepProps) => {
  const PollQuestion = ({
    label,
    field,
    value,
  }: {
    label: string;
    field: string;
    value: string;
  }) => (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="grid grid-cols-2 gap-4">
        <div
          onClick={() => onChange(field, "yes")}
          className={`flex items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all ${
            value === "yes"
              ? "border-primary bg-primary/10 shadow-md"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          <span className={`text-lg font-semibold ${
            value === "yes" ? "text-primary" : "text-foreground"
          }`}>
            Yes
          </span>
        </div>
        <div
          onClick={() => onChange(field, "no")}
          className={`flex items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all ${
            value === "no"
              ? "border-primary bg-primary/10 shadow-md"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          <span className={`text-lg font-semibold ${
            value === "no" ? "text-primary" : "text-foreground"
          }`}>
            No
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Additional Information
        </h2>
        <p className="text-muted-foreground">A few more details about your availability</p>
      </div>

      <div className="space-y-6">
        <PollQuestion
          label="If needed, would you be interested in casting as a Background Actor/Extra/Comparse?"
          field="interestedInExtra"
          value={data.interestedInExtra}
        />

        <PollQuestion
          label="Do you own a car?"
          field="hasCar"
          value={data.hasCar}
        />

        <PollQuestion
          label="Do you have a driving license?"
          field="hasLicense"
          value={data.hasLicense}
        />

        <PollQuestion
          label="Are you employed?"
          field="isEmployed"
          value={data.isEmployed}
        />

        <PollQuestion
          label="Are you willing to travel?"
          field="canTravel"
          value={data.canTravel}
        />

        <PollQuestion
          label="Do you have a valid passport?"
          field="hasPassport"
          value={data.hasPassport}
        />

        <PollQuestion
          label="Do you have more than one passport?"
          field="hasMultiplePassports"
          value={data.hasMultiplePassports}
        />

        <div className="space-y-3">
          <Label>Are you comfortable modeling swimwear?</Label>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => onChange("comfortableWithSwimwear", true)}
              className={`flex items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all ${
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
              className={`flex items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all ${
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MeasurementsStepProps {
  data: {
    height: string;
    weight: string;
    pantSize: string;
    jacketSize: string;
    shoeSize: string;
    bust: string;
    waist: string;
    hips: string;
    shoulders: string;
  };
  gender: "male" | "female";
  onChange: (field: string, value: string) => void;
}

const MeasurementsStep = ({ data, gender, onChange }: MeasurementsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Measurements
        </h2>
        <p className="text-muted-foreground">Your body measurements and sizes</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm) *</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              value={data.height}
              onChange={(e) => onChange("height", e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg) *</Label>
            <Input
              id="weight"
              type="number"
              placeholder="60"
              value={data.weight}
              onChange={(e) => onChange("weight", e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pantSize">Pant Size *</Label>
            <Input
              id="pantSize"
              type="text"
              placeholder="32"
              value={data.pantSize}
              onChange={(e) => onChange("pantSize", e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jacketSize">{gender === "male" ? "Jacket" : "Blouse"} Size *</Label>
            <Input
              id="jacketSize"
              type="text"
              placeholder="M"
              value={data.jacketSize}
              onChange={(e) => onChange("jacketSize", e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shoeSize">Shoe Size *</Label>
            <Input
              id="shoeSize"
              type="text"
              placeholder="42"
              value={data.shoeSize}
              onChange={(e) => onChange("shoeSize", e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="waist">Waist (cm) *</Label>
            <Input
              id="waist"
              type="number"
              placeholder="70"
              value={data.waist}
              onChange={(e) => onChange("waist", e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bust">{gender === "male" ? "Chest" : "Bust"} (cm) *</Label>
            <Input
              id="bust"
              type="number"
              placeholder="90"
              value={data.bust}
              onChange={(e) => onChange("bust", e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hips">Hips (cm) *</Label>
            <Input
              id="hips"
              type="number"
              placeholder="95"
              value={data.hips}
              onChange={(e) => onChange("hips", e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shoulders">Shoulders (cm) *</Label>
            <Input
              id="shoulders"
              type="number"
              placeholder="45"
              value={data.shoulders}
              onChange={(e) => onChange("shoulders", e.target.value)}
              className="h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementsStep;
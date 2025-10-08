import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputFile({ label }: { label?: string | null }) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      {label && <Label htmlFor="picture">{label}</Label>}
      <Input id="picture" type="file" />
    </div>
  );
}

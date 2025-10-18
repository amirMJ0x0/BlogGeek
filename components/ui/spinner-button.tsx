import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ReactNode } from "react";

export function SpinnerButton({
  children = "در حال برگزاری",
}: {
  children?: ReactNode | string;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Button variant="outline" disabled size="sm">
        {children}
        <Spinner />
      </Button>
    </div>
  );
}

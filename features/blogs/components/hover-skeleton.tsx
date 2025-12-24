export default function HoverSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="h-14 w-14 rounded-full bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="h-3 w-24 bg-muted rounded" />
        <div className="flex justify-between">
          <div className="h-3 w-12 bg-muted rounded" />
          <div className="h-3 w-12 bg-muted rounded" />
          <div className="h-3 w-12 bg-muted rounded" />
        </div>
        <div className="h-8 w-full bg-muted rounded" />
      </div>
    </div>
  );
}

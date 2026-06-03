export function SkeletonLoader() {
  return (
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
    </div>
  );
}

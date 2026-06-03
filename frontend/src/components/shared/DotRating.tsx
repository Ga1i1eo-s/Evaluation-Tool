interface DotRatingProps {
  score: number;
  max: number;
  color: 'green' | 'amber' | 'red';
}

export function DotRating({ score, max, color }: DotRatingProps) {
  const colors = {
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < score ? colors[color] : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

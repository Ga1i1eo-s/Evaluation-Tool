interface ConfidenceDotsProps {
  rating: number | null;
  onRate: (rating: number) => void;
}

export function ConfidenceDots({ rating, onRate }: ConfidenceDotsProps) {
  return (
    <div className="flex gap-2 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          onClick={() => onRate(i + 1)}
          className={`w-3 h-3 rounded-full transition-colors ${
            rating !== null && i < rating
              ? 'bg-purple-500'
              : 'bg-gray-300 hover:bg-purple-400'
          }`}
        />
      ))}
    </div>
  );
}

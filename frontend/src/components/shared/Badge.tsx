interface BadgeProps {
  variant: 'high' | 'moderate' | 'low' | 'beta';
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  const colors = {
    high: 'bg-green-500 text-white',
    moderate: 'bg-amber-500 text-white',
    low: 'bg-red-500 text-white',
    beta: 'bg-amber-500 text-white',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[variant]}`}>
      {children}
    </span>
  );
}

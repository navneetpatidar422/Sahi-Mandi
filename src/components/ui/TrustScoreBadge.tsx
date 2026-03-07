interface TrustScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function TrustScoreBadge({ score, size = 'md' }: TrustScoreBadgeProps) {
  const getColor = () => {
    if (score >= 90) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 75) return 'bg-green-50 text-green-600 border-green-100';
    if (score >= 60) return 'bg-yellow-50 text-yellow-600 border-yellow-200';
    return 'bg-red-50 text-red-600 border-red-200';
  };

  const getLabel = () => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Average';
    return 'Low';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${getColor()} ${sizeClasses[size]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      Trust {score} · {getLabel()}
    </span>
  );
}

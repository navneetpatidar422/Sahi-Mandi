import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceChangeIndicatorProps {
  percent: number;
}

export default function PriceChangeIndicator({ percent }: PriceChangeIndicatorProps) {
  if (Math.abs(percent) < 0.1) {
    return (
      <span className="inline-flex items-center gap-0.5 text-gray-500 text-sm font-medium">
        <Minus size={14} />
        0%
      </span>
    );
  }

  if (percent > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-green-600 text-sm font-medium">
        <TrendingUp size={14} />
        +{percent.toFixed(1)}%
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-0.5 text-red-500 text-sm font-medium">
      <TrendingDown size={14} />
      {percent.toFixed(1)}%
    </span>
  );
}

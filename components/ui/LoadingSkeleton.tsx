export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-2xl ${className}`} />
}

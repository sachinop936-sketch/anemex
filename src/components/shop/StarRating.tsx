interface StarRatingProps {
  rating: number;
  className?: string;
}

const StarRating = ({ rating, className = "h-4" }: StarRatingProps) => {
  // Color based on rating
  const getColor = (rating: number) => {
    if (rating >= 4.5) return '#388e3c'; // dark green - excellent
    if (rating >= 4.0) return '#4caf50'; // green - very good
    if (rating >= 3.5) return '#8bc34a'; // light green - good
    if (rating >= 3.0) return '#ffc107'; // amber - average
    if (rating >= 2.0) return '#ff9800'; // orange - below average
    return '#f44336'; // red - poor
  };

  const color = getColor(rating);
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const totalStars = 5;

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: totalStars }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-full w-auto">
          {i < fullStars ? (
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={color}
              stroke={color}
              strokeWidth="0.5"
            />
          ) : i === fullStars && hasHalf ? (
            <>
              <defs>
                <linearGradient id={`half-${i}`}>
                  <stop offset="50%" stopColor={color} />
                  <stop offset="50%" stopColor="#e0e0e0" />
                </linearGradient>
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={`url(#half-${i})`}
                stroke={color}
                strokeWidth="0.5"
              />
            </>
          ) : (
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="#e0e0e0"
              stroke="#e0e0e0"
              strokeWidth="0.5"
            />
          )}
        </svg>
      ))}
    </div>
  );
};

export default StarRating;

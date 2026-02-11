import { useNavigate } from 'react-router-dom';
import { Product } from '@/data/products';

interface ShopProductCardProps {
  product: Product;
  index?: number;
}

const ShopProductCard = ({ product, index = 0 }: ShopProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative bg-card border-r border-b border-border/40 cursor-pointer animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-white flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-bold text-foreground">₹{product.discountPrice.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          <span className="text-xs font-semibold text-green-600">{product.discountPercent}% off</span>
        </div>

        {/* Wow Price + Limited Stock row */}
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-extrabold border border-yellow-400 rounded-full px-2 py-0.5 tracking-wide"
              style={{
                background: 'linear-gradient(90deg, #fff7e6 0%, #fff3cd 100%)',
                color: '#b8860b',
              }}
            >WOW!</span>
            <span className="text-xs font-semibold text-foreground">₹{product.discountPrice.toLocaleString()}</span>
          </div>
          <span className="text-[10px] font-medium text-green-600 uppercase tracking-wide">Limited Stock</span>
        </div>

        {/* Star Rating + Assured */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                className="h-4 w-4"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={
                    i < Math.floor(product.rating)
                      ? '#FFD700'
                      : i < product.rating
                      ? 'url(#halfStar)'
                      : '#E0E0E0'
                  }
                  stroke={
                    i < Math.floor(product.rating)
                      ? '#FFC107'
                      : i < product.rating
                      ? '#FFC107'
                      : '#D0D0D0'
                  }
                  strokeWidth="0.5"
                />
                {i < product.rating && i >= Math.floor(product.rating) && (
                  <defs>
                    <linearGradient id="halfStar">
                      <stop offset="50%" stopColor="#FFD700" />
                      <stop offset="50%" stopColor="#E0E0E0" />
                    </linearGradient>
                  </defs>
                )}
              </svg>
            ))}
          </div>
          {/* Assured Badge */}
          <div className="ml-auto flex items-center gap-0.5 rounded-full px-2 py-0.5"
            style={{ background: 'linear-gradient(90deg, #e8f5e9 0%, #c8e6c9 100%)', border: '1px solid #a5d6a7' }}
          >
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5">
              <circle cx="10" cy="10" r="9" fill="#4CAF50" stroke="#388E3C" strokeWidth="0.5"/>
              <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[11px] font-bold" style={{ color: '#2E7D32' }}>Assured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;

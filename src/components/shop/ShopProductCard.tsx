import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle } from 'lucide-react';
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
      {/* Product Image - white background, uniform height */}
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
            <span className="text-[10px] font-extrabold text-yellow-700 bg-yellow-100 border border-yellow-300 rounded px-1.5 py-0.5 tracking-wide">WOW!</span>
            <span className="text-xs font-semibold text-foreground">₹{product.discountPrice.toLocaleString()}</span>
          </div>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Limited Stock</span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : i < product.rating
                    ? 'fill-yellow-400/50 text-yellow-400'
                    : 'fill-muted text-muted-foreground/30'
                }`}
              />
            ))}
          </div>
          {/* Assured Badge */}
          <div className="ml-auto flex items-center gap-0.5 bg-primary/10 rounded px-1.5 py-0.5">
            <CheckCircle className="h-3.5 w-3.5 text-primary fill-primary/20" />
            <span className="text-[11px] font-bold text-primary">Assured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;

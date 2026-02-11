import { useNavigate } from 'react-router-dom';
import { Star, Heart, Truck, CheckCircle } from 'lucide-react';
import { Product } from '@/data/products';
import { useState } from 'react';

interface ShopProductCardProps {
  product: Product;
  index?: number;
}

const ShopProductCard = ({ product, index = 0 }: ShopProductCardProps) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div
      onClick={handleClick}
      className="relative bg-card border-r border-b border-border/40 cursor-pointer touch-feedback animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
    >
      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-card shadow-md flex items-center justify-center"
      >
        <Heart
          className={`h-4 w-4 ${
            isWishlisted ? 'fill-primary text-primary' : 'text-muted-foreground'
          }`}
        />
      </button>

      {/* Product Tag */}
      {product.tag && (
        <div className="absolute top-2 left-2 z-10">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide text-primary-foreground ${
              product.tag === 'trending'
                ? 'bg-secondary'
                : product.tag === 'bestseller'
                ? 'bg-primary'
                : product.tag === 'new'
                ? 'bg-green-500'
                : 'bg-purple-500'
            }`}
          >
            {product.tag}
          </span>
        </div>
      )}

      {/* Product Image - fixed height for consistency */}
      <div className="h-48 overflow-hidden bg-muted flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1 leading-tight min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base font-bold text-foreground">₹{product.discountPrice}</span>
          <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
          <span className="text-xs font-semibold text-green-600">{product.discountPercent}% off</span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : i < product.rating
                    ? 'fill-yellow-400/50 text-yellow-400'
                    : 'fill-muted text-muted-foreground/30'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Free Delivery & Assured */}
        <div className="flex items-center justify-between">
          {product.freeDelivery && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Truck className="h-3 w-3" />
              <span className="text-[10px]">Free Delivery</span>
            </div>
          )}
          <div className="flex items-center gap-0.5">
            <CheckCircle className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-semibold text-primary">Assured</span>
          </div>
        </div>

        {/* Stock Urgency Tag */}
        {product.stockTag && (
          <div className="mt-1">
            <span className="text-[10px] font-semibold text-destructive">{product.stockTag}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProductCard;

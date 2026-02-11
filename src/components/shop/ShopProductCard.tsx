import { useNavigate } from 'react-router-dom';
import { Product } from '@/data/products';
import assuredBadge from '@/assets/assured-badge.png';
import wowBadge from '@/assets/wow-badge.png';
import greenStars from '@/assets/green-stars.png';

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
            <img src={wowBadge} alt="WOW! DEAL" className="h-5 object-contain" />
            <span className="text-xs font-semibold text-foreground">₹{product.discountPrice.toLocaleString()}</span>
          </div>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Limited Stock</span>
        </div>

        {/* Star Rating + Assured */}
        <div className="flex items-center gap-1.5 mt-2">
          <img src={greenStars} alt={`${product.rating} stars`} className="h-4 object-contain" />
          {/* Assured Badge */}
          <div className="ml-auto">
            <img src={assuredBadge} alt="Assured" className="h-5 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;

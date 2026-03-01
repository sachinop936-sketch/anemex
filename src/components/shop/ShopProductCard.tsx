import { useNavigate } from 'react-router-dom';
import assuredBadge from '@/assets/assured-badge.png';
import wowBadge from '@/assets/wow-badge.png';
import StarRating from '@/components/shop/StarRating';

interface ProductCardData {
  id: string;
  name: string;
  originalPrice: number;
  discountPrice: number;
  discountPercent: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  stockTag?: string | null;
  [key: string]: any;
}

interface ShopProductCardProps {
  product: ProductCardData;
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
      <div className="p-3 flex flex-col">
        <div
          className="text-sm font-medium text-foreground leading-tight mb-2"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '2.5rem',
            maxHeight: '2.5rem',
          }}
        >
          {product.name}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-foreground">₹{product.discountPrice.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          <span className="text-xs font-semibold text-green-600">{product.discountPercent}% off</span>
        </div>

        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1.5">
            <img src={wowBadge} alt="WOW! DEAL" className="h-8 object-contain" />
            <span className="text-xs font-semibold text-foreground">₹{product.discountPrice.toLocaleString()}</span>
          </div>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Limited Stock</span>
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <StarRating rating={product.rating} className="h-3.5" />
          <div className="ml-auto">
            <img src={assuredBadge} alt="Assured" className="h-5 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;

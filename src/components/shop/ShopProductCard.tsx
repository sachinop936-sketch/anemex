import { Link } from 'react-router-dom';
import { Star, TrendingUp, Award, Clock, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '@/data/products';

interface ShopProductCardProps {
  product: Product;
  index: number;
}

const tagConfig = {
  trending: {
    label: 'Trending',
    icon: TrendingUp,
    className: 'bg-gradient-to-r from-orange-500 to-pink-500',
  },
  bestseller: {
    label: 'Bestseller',
    icon: Award,
    className: 'bg-gradient-to-r from-green-500 to-emerald-500',
  },
  limited: {
    label: 'Limited Offer',
    icon: Clock,
    className: 'bg-gradient-to-r from-purple-500 to-indigo-500',
  },
};

const ShopProductCard = ({ product, index }: ShopProductCardProps) => {
  const tag = product.tag ? tagConfig[product.tag] : null;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="overflow-hidden rounded-xl bg-card border border-border/50 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Tag Badge */}
          {tag && (
            <div className={`absolute top-2 left-2 rounded-sm px-2 py-0.5 flex items-center gap-1 ${tag.className}`}>
              <tag.icon className="h-3 w-3 text-white" />
              <span className="text-[10px] font-semibold text-white">{tag.label}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 border-t border-border/30">
          {/* Product Name */}
          <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Discount & Price Row */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-green-600">
              {product.discountPercent}% Off
            </span>
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>

          {/* Final Price */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-foreground">
              ₹{product.discountPrice.toLocaleString()}
            </span>
            {/* Assured Badge */}
            <div className="flex items-center gap-1 rounded-sm bg-blue-600 px-1.5 py-0.5">
              <ShieldCheck className="h-3 w-3 text-white" />
              <span className="text-[10px] font-semibold text-white">Assured</span>
            </div>
          </div>

          {/* Free Delivery */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <Truck className="h-3 w-3" />
            <span className="text-[10px]">Free Delivery in Two Days</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopProductCard;

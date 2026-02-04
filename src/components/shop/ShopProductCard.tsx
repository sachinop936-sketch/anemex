import { Link } from 'react-router-dom';
import { TrendingUp, Award, Clock, ShieldCheck, Truck } from 'lucide-react';
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
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="overflow-hidden bg-white border-b border-r border-border/40 transition-all duration-200 hover:shadow-md">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-white p-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Tag Badge */}
          {tag && (
            <div className={`absolute top-2 left-2 rounded-sm px-1.5 py-0.5 flex items-center gap-0.5 ${tag.className}`}>
              <tag.icon className="h-2.5 w-2.5 text-white" />
              <span className="text-[9px] font-semibold text-white">{tag.label}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-3 pb-3">
          {/* Product Name */}
          <h3 className="text-xs font-medium text-foreground line-clamp-2 mb-1.5 min-h-[2rem] leading-tight">
            {product.name}
          </h3>

          {/* Discount & Price Row */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-semibold text-green-600">
              {product.discountPercent}% Off
            </span>
            <span className="text-[10px] text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>

          {/* Final Price & Assured */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-base font-bold text-foreground">
              ₹ {product.discountPrice.toLocaleString()}
            </span>
            <div className="flex items-center gap-0.5 rounded-sm bg-blue-600 px-1 py-0.5">
              <ShieldCheck className="h-2.5 w-2.5 text-white" />
              <span className="text-[8px] font-semibold text-white">Assured</span>
            </div>
          </div>

          {/* Free Delivery */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <Truck className="h-2.5 w-2.5" />
            <span className="text-[10px]">Free Delivery in Two Days</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopProductCard;

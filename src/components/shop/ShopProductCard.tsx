import { Link } from 'react-router-dom';
import { Star, TrendingUp, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <div className="overflow-hidden rounded-2xl bg-card card-shadow transition-all duration-300 group-hover:card-shadow-hover group-hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Discount Badge */}
          <div className="absolute top-2 left-2 rounded-full bg-secondary px-2 py-0.5">
            <span className="text-xs font-bold text-secondary-foreground">
              {product.discountPercent}% OFF
            </span>
          </div>

          {/* Tag Badge */}
          {tag && (
            <div className={`absolute top-2 right-2 rounded-full px-2 py-0.5 flex items-center gap-1 ${tag.className}`}>
              <tag.icon className="h-3 w-3 text-white" />
              <span className="text-xs font-semibold text-white">{tag.label}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Product Name */}
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5 rounded-full bg-green-500/10 px-1.5 py-0.5">
              <Star className="h-3 w-3 fill-green-500 text-green-500" />
              <span className="text-xs font-semibold text-green-600">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold gradient-text">
              ₹{product.discountPrice}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice}
            </span>
          </div>

          {/* Buy Button */}
          <Button
            variant="gradient"
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/product/${product.id}`;
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ShopProductCard;

import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import assuredBadge from '@/assets/assured-badge.png';
import wowBadge from '@/assets/wow-badge.png';
import StarRating from '@/components/shop/StarRating';

const RECOMMENDED_IDS = [
  'product-32', 'product-33', 'product-34', 'product-35', 'product-36',
  'product-37', 'product-38', 'product-39', 'product-40', 'product-41',
];

const RecommendedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const recommended = products.filter((p) => RECOMMENDED_IDS.includes(p.id));

  const handleAddToCart = (e: React.MouseEvent, product: typeof recommended[0]) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice,
      originalPrice: product.originalPrice,
      image: product.image,
    });
  };

  return (
    <div className="mt-4">
      <h2 className="text-base font-semibold text-foreground mb-3 px-4">You May Also Like</h2>
      <div className="flex gap-3 overflow-x-auto px-4 pb-3 scrollbar-hide">
        {recommended.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex-shrink-0 w-[160px] bg-card border border-border/40 rounded-xl cursor-pointer"
          >
            <div className="aspect-square overflow-hidden bg-white flex items-center justify-center p-2 rounded-t-xl">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="p-2.5">
              <h3 className="text-xs font-medium text-foreground line-clamp-2 leading-tight min-h-[2rem]">
                {product.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <img src={wowBadge} alt="WOW! DEAL" className="h-7 object-contain" />
                <span className="text-sm font-bold text-foreground">₹{product.discountPrice}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-[10px] font-semibold text-green-600">{product.discountPercent}% off</span>
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <StarRating rating={product.rating} className="h-3" />
                <img src={assuredBadge} alt="Assured" className="h-4 object-contain ml-auto" />
              </div>
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
              >
                <ShoppingCart className="h-3 w-3" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;

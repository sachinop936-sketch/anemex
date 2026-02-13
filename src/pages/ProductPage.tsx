import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShopHeader from '@/components/shop/ShopHeader';
import { Button } from '@/components/ui/button';
import { products, Product } from '@/data/products';
import ShopProductCard from '@/components/shop/ShopProductCard';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  Check,
} from 'lucide-react';
import assuredBadge from '@/assets/assured-badge.png';
import StarRating from '@/components/shop/StarRating';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  // Related products: same category, excluding current product
  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6)
    : [];

  const totalPrice = product ? product.discountPrice * quantity : 0;
  const deliveryCharge = totalPrice < 100 ? 40 : 0;

  // Auto-slide images every 4 seconds
  useEffect(() => {
    if (!product || product.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.discountPrice,
          originalPrice: product.originalPrice,
          image: product.images[0],
        });
      }
      toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Product not found</h1>
          <Button onClick={() => navigate('/')}>Go Back</Button>
        </div>
      </div>
    );
  }

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        setCurrentImage((prev) => (prev + 1) % product.images.length);
      } else {
        setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    }
  };

  // Demo reviews
  const reviews = [
    { name: 'Priya S.', rating: 5, comment: 'Excellent quality! Very happy with the purchase. The material is so soft and comfortable.', date: '2 days ago', avatar: 'P' },
    { name: 'Ananya M.', rating: 4, comment: 'Good product, fast delivery. Matches the description perfectly.', date: '1 week ago', avatar: 'A' },
    { name: 'Ritu K.', rating: 5, comment: 'Loved it! Will definitely order again. Best value for money.', date: '2 weeks ago', avatar: 'R' },
    { name: 'Sneha G.', rating: 5, comment: 'Amazing product! Exactly as shown in pictures. Very satisfied.', date: '3 weeks ago', avatar: 'S' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />

      <main className="pb-28">
        {/* Back Button */}
        <div className="bg-white px-4 py-3 border-b border-border/50">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        {/* Image Gallery */}
        <section className="bg-white animate-fade-in">
          <div className="relative">
            <div
              className="aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center relative"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={product.name}
                  className={`absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-in-out ${
                    index === currentImage
                      ? 'opacity-100 translate-x-0'
                      : index < currentImage || (currentImage === 0 && index === product.images.length - 1 && index !== 0)
                        ? 'opacity-0 -translate-x-full'
                        : 'opacity-0 translate-x-full'
                  }`}
                />
              ))}

              {/* Small dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentImage ? 'bg-primary w-4' : 'bg-black/25 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Discount Badge */}
            <div className="absolute top-4 left-4 rounded bg-green-600 px-2 py-1">
              <span className="text-xs font-bold text-white">
                {product.discountPercent}% OFF
              </span>
            </div>

            {/* Wishlist & Share */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? 'fill-primary text-primary' : 'text-gray-500'
                  }`}
                />
              </button>
              <button className="h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
                <Share2 className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImage ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* Product Info */}
        <section className="bg-white mt-2 p-4 animate-slide-up">
          {/* Seller & Category */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground">{product.seller}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              {product.category}
            </span>
          </div>

          {/* Name */}
          <h1 className="text-lg font-semibold text-foreground mb-3 leading-tight">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 rounded bg-green-600 px-2 py-1">
              <span className="text-sm font-bold text-white">{product.rating}</span>
              <svg viewBox="0 0 24 24" className="h-3 w-3">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white" stroke="white" strokeWidth="0.5"/>
              </svg>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.reviewCount.toLocaleString()} Reviews
            </span>
            <img src={assuredBadge} alt="Assured" className="h-5 object-contain" />
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-2xl font-bold text-foreground">₹{(product.discountPrice * quantity).toLocaleString()}</span>
            <span className="text-base text-muted-foreground line-through">
              ₹{(product.originalPrice * quantity).toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-green-600">
              {product.discountPercent}% off
            </span>
          </div>
          {quantity > 1 && (
            <p className="text-xs text-muted-foreground mb-3">₹{product.discountPrice.toLocaleString()} × {quantity} items</p>
          )}

          {/* Savings Tag */}
          <div className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium mb-4">
            <Check className="h-4 w-4" />
            You save ₹{((product.originalPrice - product.discountPrice) * quantity).toLocaleString()}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-foreground">Quantity:</span>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-9 w-9 flex items-center justify-center rounded-l-lg border border-border bg-muted text-lg font-bold text-foreground hover:bg-muted/80 transition-colors"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="h-9 w-11 flex items-center justify-center border-t border-b border-border text-sm font-semibold text-foreground bg-card">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="h-9 w-9 flex items-center justify-center rounded-r-lg border border-border bg-muted text-lg font-bold text-foreground hover:bg-muted/80 transition-colors"
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>
        </section>

        {/* Delivery Info */}
        <section className="bg-white mt-2 p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Delivery & Services</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                {deliveryCharge > 0 ? (
                  <>
                    <p className="text-sm font-medium text-foreground">Delivery Charge: ₹{deliveryCharge}</p>
                    <p className="text-xs text-muted-foreground">Free delivery on orders above ₹100</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-green-600">FREE Delivery</p>
                    <p className="text-xs text-muted-foreground">Estimated delivery in 5-7 days</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <RotateCcw className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Easy Returns</p>
                <p className="text-xs text-muted-foreground">7 days return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Quality Assured</p>
                <p className="text-xs text-muted-foreground">100% original products</p>
              </div>
            </div>
          </div>
          {deliveryCharge > 0 && (
            <div className="mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-xs text-amber-700">
                💡 Add items worth ₹{(100 - totalPrice).toLocaleString()} more to get <span className="font-semibold">FREE delivery</span>
              </p>
            </div>
          )}
        </section>

        {/* Description */}
        <section className="bg-white mt-2 p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Product Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </section>

        {/* Features */}
        <section className="bg-white mt-2 p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Product Features</h3>
          <div className="grid grid-cols-2 gap-2">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-xs text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-white mt-2 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Customer Reviews</h3>
            <span className="text-xs text-primary font-medium">View All</span>
          </div>
          
          {/* Rating Summary */}
          <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{product.rating}</div>
              <div className="flex items-center justify-center mt-1">
                <StarRating rating={product.rating} className="h-3.5" />
              </div>
              <span className="text-xs text-muted-foreground">{product.reviewCount.toLocaleString()} reviews</span>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-3">{star}</span>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : 2}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="pb-4 border-b border-border/50 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{review.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{review.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <StarRating rating={review.rating} className="h-3" />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground ml-11">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-2">
            <div className="bg-white p-4 pb-2">
              <h3 className="text-sm font-semibold text-foreground">Related Products</h3>
            </div>
            <div className="bg-white grid grid-cols-2">
              {relatedProducts.map((rp, idx) => (
                <ShopProductCard key={rp.id} product={rp} index={idx} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky Buy Buttons - Flipkart Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg safe-bottom">
        <div className="flex gap-0 max-w-md mx-auto">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-gray-800 text-sm font-medium border-r border-gray-200 hover:bg-gray-50 transition-colors uppercase tracking-wide"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#FFE500] text-gray-900 text-sm font-medium hover:bg-[#F5DC00] transition-colors uppercase tracking-wide"
            onClick={() => {
              for (let i = 0; i < quantity; i++) {
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.discountPrice,
                  originalPrice: product.originalPrice,
                  image: product.images[0],
                });
              }
              navigate(`/address?productId=${product.id}`);
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

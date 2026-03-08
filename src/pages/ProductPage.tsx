import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShopHeader from '@/components/shop/ShopHeader';
import { Button } from '@/components/ui/button';
import { products as staticProducts } from '@/data/products';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import {
  ArrowLeft, Heart, Share2, Truck, RotateCcw, Shield, Check, ChevronLeft, ChevronRight,
} from 'lucide-react';
import assuredBadge from '@/assets/assured-badge.png';
import StarRating from '@/components/shop/StarRating';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { products: dbProducts } = useProducts();

  // Try DB first, then static
  const dbProduct = dbProducts.find((p) => p.id === id);
  const staticProduct = staticProducts.find((p) => p.id === id);

  const product = dbProduct ? {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description,
    shortDescription: dbProduct.short_description,
    originalPrice: dbProduct.original_price,
    discountPrice: dbProduct.price,
    discountPercent: dbProduct.discount_percent,
    image: dbProduct.image,
    images: dbProduct.images,
    category: dbProduct.category,
    tag: dbProduct.tag as any,
    stockTag: dbProduct.stock_tag,
    rating: dbProduct.rating,
    reviewCount: dbProduct.review_count,
    features: dbProduct.features,
    seller: dbProduct.seller,
    freeDelivery: dbProduct.free_delivery,
  } : staticProduct;

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

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  const reviews = [
    { name: 'Priya S.', rating: 5, comment: 'Excellent quality! Very happy with the purchase.', date: '2 days ago', avatar: 'P' },
    { name: 'Ananya M.', rating: 4, comment: 'Good product, fast delivery. Matches description.', date: '1 week ago', avatar: 'A' },
    { name: 'Ritu K.', rating: 5, comment: 'Loved it! Will order again. Best value for money.', date: '2 weeks ago', avatar: 'R' },
    { name: 'Sneha G.', rating: 5, comment: 'Amazing product! Exactly as shown in pictures.', date: '3 weeks ago', avatar: 'S' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />
      <main className="pb-28">
        <div className="bg-white px-4 py-3 border-b border-border/50">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>

        {/* Image Gallery */}
        <section className="bg-white animate-fade-in">
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden bg-muted flex items-center justify-center relative">
              {product.images.map((img, index) => (
                <img key={index} src={img} alt={product.name}
                  className={`absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-in-out ${
                    index === currentImage ? 'opacity-100 translate-x-0'
                      : index < currentImage || (currentImage === 0 && index === product.images.length - 1 && index !== 0)
                        ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                  }`}
                />
              ))}
            </div>
            <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white">
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>
            <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white">
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, index) => (
                <button key={index} onClick={() => setCurrentImage(index)}
                  className={`h-2 rounded-full transition-all ${index === currentImage ? 'bg-primary w-6' : 'bg-black/30 w-2 hover:bg-black/50'}`} />
              ))}
            </div>
            <div className="absolute top-4 left-4 rounded bg-green-600 px-2 py-1">
              <span className="text-xs font-bold text-white">{product.discountPercent}% OFF</span>
            </div>
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button onClick={() => setIsWishlisted(!isWishlisted)} className="h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-primary text-primary' : 'text-gray-500'}`} />
              </button>
              <button className="h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Share2 className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide">
            {product.images.map((img, index) => (
              <button key={index} onClick={() => setCurrentImage(index)}
                className={`flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${index === currentImage ? 'border-primary' : 'border-transparent'}`}>
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* Product Info */}
        <section className="bg-white mt-2 p-4 animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground">{product.seller}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{product.category}</span>
          </div>
          <h1 className="text-lg font-semibold text-foreground mb-3 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 rounded bg-green-600 px-2 py-1">
              <span className="text-sm font-bold text-white">{product.rating}</span>
              <svg viewBox="0 0 24 24" className="h-3 w-3"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white" stroke="white" strokeWidth="0.5"/></svg>
            </div>
            <span className="text-sm text-muted-foreground">{product.reviewCount.toLocaleString()} Reviews</span>
            <img src={assuredBadge} alt="Assured" className="h-5 object-contain" />
          </div>
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-2xl font-bold text-foreground">₹{(product.discountPrice * quantity).toLocaleString()}</span>
            <span className="text-base text-muted-foreground line-through">₹{(product.originalPrice * quantity).toLocaleString()}</span>
            <span className="text-sm font-semibold text-green-600">{product.discountPercent}% off</span>
          </div>
          {quantity > 1 && <p className="text-xs text-muted-foreground mb-3">₹{product.discountPrice.toLocaleString()} × {quantity} items</p>}
          <div className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium mb-4">
            <Check className="h-4 w-4" />
            You save ₹{((product.originalPrice - product.discountPrice) * quantity).toLocaleString()}
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-foreground">Quantity:</span>
            <div className="flex items-center">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="h-9 w-9 flex items-center justify-center rounded-l-lg border border-border bg-muted text-lg font-bold text-foreground" disabled={quantity <= 1}>−</button>
              <span className="h-9 w-11 flex items-center justify-center border-t border-b border-border text-sm font-semibold text-foreground bg-card">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(10, q + 1))} className="h-9 w-9 flex items-center justify-center rounded-r-lg border border-border bg-muted text-lg font-bold text-foreground" disabled={quantity >= 10}>+</button>
            </div>
          </div>
        </section>

        {/* Delivery Info */}
        <section className="bg-white mt-2 p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Delivery & Services</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"><Truck className="h-5 w-5 text-primary" /></div>
              <div><p className="text-sm font-medium text-foreground">Free Delivery</p><p className="text-xs text-muted-foreground">Estimated delivery in 5-7 days</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"><RotateCcw className="h-5 w-5 text-primary" /></div>
              <div><p className="text-sm font-medium text-foreground">Easy Returns</p><p className="text-xs text-muted-foreground">7 days return policy</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"><Shield className="h-5 w-5 text-primary" /></div>
              <div><p className="text-sm font-medium text-foreground">Quality Assured</p><p className="text-xs text-muted-foreground">100% original products</p></div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="bg-white mt-2 p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Product Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
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

        {/* Reviews */}
        <section className="bg-white mt-2 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Customer Reviews</h3>
            <span className="text-xs text-primary font-medium">View All</span>
          </div>
          <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{product.rating}</div>
              <div className="flex items-center justify-center mt-1"><StarRating rating={product.rating} className="h-3.5" /></div>
              <span className="text-xs text-muted-foreground">{product.reviewCount.toLocaleString()} reviews</span>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-3">{star}</span>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : 2}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                      <StarRating rating={review.rating} className="h-3" />
                      <span className="text-[10px] text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground ml-11">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky Buy Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg safe-bottom">
        <div className="flex gap-0 max-w-md mx-auto">
          <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-gray-800 text-sm font-medium border-r border-gray-200 hover:bg-gray-50 transition-colors uppercase tracking-wide" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-yellow-400 text-black text-sm font-bold hover:bg-yellow-500 transition-colors uppercase tracking-wide"
            onClick={() => {
              for (let i = 0; i < quantity; i++) {
                addToCart({ id: product.id, name: product.name, price: product.discountPrice, originalPrice: product.originalPrice, image: product.images[0] });
              }
              navigate(`/address?productId=${product.id}`);
            }}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

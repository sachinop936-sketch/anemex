import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShopHeader from '@/components/shop/ShopHeader';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  Check,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Zap,
} from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice,
        image: product.images[0],
      });
      toast.success('Added to cart!');
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

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
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
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="h-full w-full object-cover transition-opacity duration-300"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImage
                      ? 'bg-primary w-6'
                      : 'bg-black/30 w-2 hover:bg-black/50'
                  }`}
                />
              ))}
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
              <Star className="h-3 w-3 fill-white text-white" />
            </div>
            <span className="text-sm text-muted-foreground">
              {product.reviewCount.toLocaleString()} Reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold text-foreground">₹{product.discountPrice}</span>
            <span className="text-base text-muted-foreground line-through">
              ₹{product.originalPrice}
            </span>
            <span className="text-sm font-semibold text-green-600">
              {product.discountPercent}% off
            </span>
          </div>

          {/* Savings Tag */}
          <div className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium mb-4">
            <Check className="h-4 w-4" />
            You save ₹{(product.originalPrice - product.discountPrice).toLocaleString()}
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
                <p className="text-sm font-medium text-foreground">Free Delivery</p>
                <p className="text-xs text-muted-foreground">Estimated delivery in 5-7 days</p>
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
              <div className="flex items-center gap-0.5 justify-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.round(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
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
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-2.5 w-2.5 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        ))}
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
      </main>

      {/* Sticky Buy Buttons - Flipkart Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg safe-bottom">
        <div className="flex gap-0 max-w-md mx-auto">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-gray-800 text-base font-medium border-r border-gray-200 hover:bg-gray-50 transition-colors uppercase tracking-wide"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#FB641B] text-white text-base font-medium hover:bg-[#E85A17] transition-colors uppercase tracking-wide"
            onClick={() => {
              addToCart({
                id: product.id,
                name: product.name,
                price: product.discountPrice,
                image: product.images[0],
              });
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

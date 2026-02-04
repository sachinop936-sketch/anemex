import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopFooter from '@/components/shop/ShopFooter';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
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
} from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find((p) => p.id === id);

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
    { name: 'Priya S.', rating: 5, comment: 'Excellent quality! Very happy with the purchase.', date: '2 days ago' },
    { name: 'Ananya M.', rating: 4, comment: 'Good product, fast delivery.', date: '1 week ago' },
    { name: 'Ritu K.', rating: 5, comment: 'Loved it! Will definitely order again.', date: '2 weeks ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ShopHeader />

      <main className="pb-28">
        {/* Back Button */}
        <div className="container py-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </button>
        </div>

        {/* Image Gallery */}
        <section className="container animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden bg-card card-shadow">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="h-full w-full object-cover transition-opacity duration-300"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentImage
                      ? 'bg-primary w-6'
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            {/* Discount Badge */}
            <div className="absolute top-4 left-4 rounded-full bg-secondary px-3 py-1">
              <span className="text-sm font-bold text-secondary-foreground">
                {product.discountPercent}% OFF
              </span>
            </div>

            {/* Wishlist & Share */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? 'fill-secondary text-secondary' : 'text-foreground'
                  }`}
                />
              </button>
              <button className="h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors">
                <Share2 className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
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
        <section className="container mt-6 animate-slide-up">
          <div className="rounded-2xl bg-card card-shadow p-4">
            {/* Category */}
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-2">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="text-xl font-bold text-foreground mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1">
                <Star className="h-4 w-4 fill-green-500 text-green-500" />
                <span className="text-sm font-bold text-green-600">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.reviewCount} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold gradient-text">₹{product.discountPrice}</span>
              <span className="text-lg text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-sm font-semibold text-green-600">
                Save ₹{product.originalPrice - product.discountPrice}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Features */}
            <div className="space-y-2 mb-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Info */}
        <section className="container mt-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-card card-shadow">
              <Truck className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs font-medium text-foreground">Free Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-card card-shadow">
              <RotateCcw className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs font-medium text-foreground">7 Day Returns</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-card card-shadow">
              <Shield className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs font-medium text-foreground">Secure Pay</span>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="container mt-6">
          <div className="rounded-2xl bg-card card-shadow p-4">
            <h2 className="text-lg font-bold text-foreground mb-4">Customer Reviews</h2>
            
            {/* Rating Summary */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">{product.rating}</div>
                <div className="flex items-center gap-0.5 justify-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{product.reviewCount} reviews</span>
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="pb-4 border-b border-border last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{review.name}</span>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Buy Buttons - Flipkart Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="container p-0">
          <div className="grid grid-cols-2 divide-x divide-border">
            <button
              className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              onClick={() => {
                // Add to cart functionality
                alert('Added to cart!');
              }}
            >
              Add to Cart
            </button>
            <button
              className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-white gradient-primary hover:opacity-90 transition-opacity"
              onClick={() => navigate(`/address?productId=${product.id}`)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <ShopFooter />
    </div>
  );
};

export default ProductPage;

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Camera } from "lucide-react";

import feedback1 from "@/assets/feedback-1.jpg";
import feedback2 from "@/assets/feedback-2.jpg";
import feedback3 from "@/assets/feedback-3.jpg";
import feedback4 from "@/assets/feedback-4.jpg";
import feedback5 from "@/assets/feedback-5.jpg";
import feedback6 from "@/assets/feedback-6.jpg";

const feedbackImages = [
  { src: feedback1, alt: "Customer feedback screenshot 1" },
  { src: feedback2, alt: "Customer feedback screenshot 2" },
  { src: feedback3, alt: "Customer feedback screenshot 3" },
  { src: feedback4, alt: "Customer feedback screenshot 4" },
  { src: feedback5, alt: "Customer feedback screenshot 5" },
  { src: feedback6, alt: "Customer feedback screenshot 6" },
];

const ServiceProof = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Camera className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Real Customer Feedback</h2>
        </div>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Screenshots shared by customers after successful payment & service completion.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {feedbackImages.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer overflow-hidden rounded-xl bg-card/80 backdrop-blur-sm card-shadow transition-all duration-300 hover:card-shadow-hover hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => setSelectedImage(image.src)}
            >
              <img src={image.src} alt={image.alt} className="w-full h-auto object-cover aspect-[3/4]" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-xs text-muted-foreground">
          For privacy, personal details in screenshots are blurred.
        </p>

        {/* Lightbox Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-2 bg-background/95 backdrop-blur-md border-border/50">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Full size feedback"
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ServiceProof;

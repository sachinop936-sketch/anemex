import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check } from "lucide-react";

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

const bulletPoints = [
  "Feedback shared voluntarily by customers",
  "Privacy protected (names & numbers hidden)",
  "Support available during service hours",
];

const ServiceProof = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-8">
      <div className="container">
        <h2 className="mb-2 text-center text-xl font-bold text-foreground">
          Customer Feedback & Service Proof
        </h2>
        <p className="mb-1 text-center text-sm text-muted-foreground">
          Some recent feedback shared by customers after service completion.
        </p>
        <p className="mb-6 text-center text-xs text-muted-foreground">
          For privacy reasons, personal details are blurred.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {feedbackImages.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer overflow-hidden rounded-xl bg-card/80 backdrop-blur-sm card-shadow transition-all duration-300 hover:card-shadow-hover hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover aspect-[3/4]"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Bullet Points */}
        <div className="space-y-2">
          {bulletPoints.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{point}</span>
            </div>
          ))}
        </div>

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

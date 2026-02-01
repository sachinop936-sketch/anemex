import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amit K.",
    initials: "AK",
    feedback: "affordable prices hai.",
    rating: 5,
  },
  {
    name: "Rahul S.",
    initials: "RS",
    feedback: "Easy booking process. Will use again.",
    rating: 5,
  },
  {
    name: "Neeraj P.",
    initials: "NP",
    feedback: "Fast response time. Satisfied.",
    rating: 4,
  },
  {
    name: "Pankaj M.",
    initials: "PM",
    feedback: "Simple and hassle-free payment ke turant baad start ho gya tha.",
    rating: 5,
  },
  {
    name: "Suresh R.",
    initials: "SR",
    feedback: "Nice service. Recommended.",
    rating: 4,
  },
  {
    name: "Vikram D.",
    initials: "VD",
    feedback: "Smooth calling. No issues.",
    rating: 5,
  },
];

const CustomerFeedback = () => {
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="mb-4 text-center text-xl font-bold text-foreground">Customer Feedback</h2>

        <div className="grid grid-cols-2 gap-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8 bg-primary/10">
                    <AvatarFallback className="text-xs font-medium text-primary bg-primary/10">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">{testimonial.name}</span>
                </div>

                <div className="flex gap-0.5 mb-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < testimonial.rating ? "fill-primary text-primary" : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">"{testimonial.feedback}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Droplets, Sun } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import maizeImg from "@/assets/crop-maize.jpg";
import wheatImg from "@/assets/crop-wheat.jpg";

const Crops = () => {
  const crops = [
    {
      name: "Maize (Corn)",
      image: maizeImg,
      description: "High-yield hybrid corn varieties suitable for diverse climates",
      growthTips: "Requires full sun, moderate water, fertile soil. Plant after last frost.",
      season: "Spring/Summer",
    },
    {
      name: "Wheat",
      image: wheatImg,
      description: "Premium wheat varieties for bread and flour production",
      growthTips: "Cool-season crop. Plant in fall or early spring. Needs well-drained soil.",
      season: "Fall/Spring",
    },
    {
      name: "Beans",
      image: maizeImg,
      description: "Protein-rich legumes that improve soil nitrogen",
      growthTips: "Easy to grow. Direct sow after frost. Needs support for climbing varieties.",
      season: "Spring/Summer",
    },
    {
      name: "Vegetables",
      image: wheatImg,
      description: "Fresh seasonal vegetables including tomatoes, peppers, and greens",
      growthTips: "Rotate crops annually. Use mulch for moisture retention.",
      season: "Year-round",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Crop Varieties
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover high-quality seeds, expert growing tips, and sustainable farming practices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {crops.map((crop) => (
                <Card key={crop.name} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      {crop.name}
                    </CardTitle>
                    <CardDescription>{crop.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Sun className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Growing Season</p>
                        <p className="text-sm text-muted-foreground">{crop.season}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Droplets className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Growth Tips</p>
                        <p className="text-sm text-muted-foreground">{crop.growthTips}</p>
                      </div>
                    </div>
                    <Button variant="default" className="w-full">
                      Buy Seeds & Fertilizers
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Crops;

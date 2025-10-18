import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Stethoscope, ShoppingCart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import cattleImg from "@/assets/livestock-cattle.jpg";
import poultryImg from "@/assets/livestock-poultry.jpg";

const Livestock = () => {
  const animals = [
    {
      name: "Dairy Cattle",
      image: cattleImg,
      description: "High-quality dairy breeds for milk production",
      careInfo: "Requires pasture grazing, shelter, regular milking, and veterinary care",
      diet: "Grass, hay, silage, and grain supplements",
    },
    {
      name: "Beef Cattle",
      image: cattleImg,
      description: "Premium beef cattle breeds for meat production",
      careInfo: "Need spacious pasture, water access, and mineral supplements",
      diet: "Grass-fed with grain finishing options",
    },
    {
      name: "Poultry (Chickens)",
      image: poultryImg,
      description: "Layer and broiler chickens for eggs and meat",
      careInfo: "Require coops, nesting boxes, protection from predators",
      diet: "Commercial feed, grains, kitchen scraps",
    },
    {
      name: "Goats",
      image: cattleImg,
      description: "Hardy goats for milk, meat, and land management",
      careInfo: "Need fencing, shelter, and social companionship",
      diet: "Browse, hay, and mineral supplements",
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
                Livestock Breeds
              </h1>
              <p className="text-lg text-muted-foreground">
                Quality animals with expert care guidance and veterinary support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {animals.map((animal) => (
                <Card key={animal.name} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      {animal.name}
                    </CardTitle>
                    <CardDescription>{animal.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Stethoscope className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Care Information</p>
                        <p className="text-sm text-muted-foreground">{animal.careInfo}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Heart className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Diet</p>
                        <p className="text-sm text-muted-foreground">{animal.diet}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="default" className="flex-1">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy/Sell
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Vet Services
                      </Button>
                    </div>
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

export default Livestock;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Stethoscope, ShoppingCart, Leaf, Recycle, Factory, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import beefCattleImg from "@/assets/livestock-beef-cattle.jpg";
import dairyCattleImg from "@/assets/livestock-dairy-cattle.jpg";
import poultryImg from "@/assets/livestock-poultry.jpg";
import goatsImg from "@/assets/livestock-goats.jpg";
import sheepImg from "@/assets/livestock-sheep.jpg";
import rabbitsImg from "@/assets/livestock-rabbits.jpg";

const Livestock = () => {
  const navigate = useNavigate();
  
  const animals = [
    {
      name: "Dairy Cattle",
      image: dairyCattleImg,
      description: "High-quality dairy breeds like Holstein, Jersey, and Guernsey for milk production",
      careInfo: "Requires pasture grazing, shelter, regular milking (2-3 times daily), and veterinary care",
      diet: "Grass, hay, silage, and grain supplements rich in protein and calcium",
      characteristics: "Large udders, lean body, produce 20-40 liters of milk daily",
    },
    {
      name: "Beef Cattle",
      image: beefCattleImg,
      description: "Premium beef cattle breeds like Angus, Hereford, and Charolais for meat production",
      careInfo: "Need spacious pasture, water access, mineral supplements, and rotational grazing",
      diet: "Grass-fed with grain finishing options for marbling",
      characteristics: "Muscular build, larger frame, faster weight gain for meat production",
    },
    {
      name: "Poultry (Chickens)",
      image: poultryImg,
      description: "Layer and broiler chickens for eggs and meat",
      careInfo: "Require coops, nesting boxes, protection from predators, proper ventilation",
      diet: "Commercial feed, grains, kitchen scraps, calcium supplements for layers",
      characteristics: "Layers produce 250-300 eggs/year, broilers ready in 6-8 weeks",
    },
    {
      name: "Goats",
      image: goatsImg,
      description: "Hardy goats like Saanen, Toggenburg for milk, and Boer for meat",
      careInfo: "Need secure fencing, shelter, hoof trimming, and social companionship",
      diet: "Browse (leaves, shrubs), hay, and mineral supplements",
      characteristics: "Adaptable, good browsers, milk goats produce 2-3 liters daily",
    },
    {
      name: "Sheep",
      image: sheepImg,
      description: "Wool and meat sheep breeds like Merino, Dorper, and Suffolk",
      careInfo: "Require fencing, shelter, regular shearing, and hoof care",
      diet: "Grass, hay, minimal grain, salt, and mineral blocks",
      characteristics: "Hardy, flock animals, provide wool, meat, and milk",
    },
    {
      name: "Rabbits",
      image: rabbitsImg,
      description: "Domestic rabbits like New Zealand White and Californian for meat",
      careInfo: "Need clean hutches, protection from extreme weather and predators",
      diet: "Pellets, hay, fresh vegetables, and clean water",
      characteristics: "Fast reproduction, low space requirements, lean meat production",
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
                      <Stethoscope className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Care Information</p>
                        <p className="text-sm text-muted-foreground">{animal.careInfo}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Heart className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Diet</p>
                        <p className="text-sm text-muted-foreground">{animal.diet}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Characteristics</p>
                        <p className="text-sm text-muted-foreground">{animal.characteristics}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="default" className="flex-1">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy/Sell
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => navigate('/vet-services')}>
                        Vet Services
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Livestock Waste Management Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Livestock Waste Management & Organic Manure
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                Transform animal waste into valuable organic fertilizer while maintaining environmental sustainability
              </p>

              {/* Video Tutorials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-primary" />
                      Compost Manure Making Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/8ScPn2Q_Ek0"
                        title="How to Make Compost Manure"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Learn the step-by-step process of converting livestock waste into nutrient-rich compost manure
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-primary" />
                      Silage Making Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/gJLhZrN2TD8"
                        title="How to Make Silage"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Complete guide to making quality silage for livestock feed preservation
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      Collection & Storage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Collect manure daily from animal housing areas</li>
                      <li>• Store in designated composting areas away from water sources</li>
                      <li>• Separate solid and liquid waste for better processing</li>
                      <li>• Use covered storage to prevent odor and flies</li>
                      <li>• Maintain proper drainage to avoid contamination</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Recycle className="h-5 w-5 text-secondary" />
                      Composting Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Mix manure with carbon-rich materials (straw, sawdust)</li>
                      <li>• Maintain optimal moisture level (50-60%)</li>
                      <li>• Turn compost pile every 2-3 weeks</li>
                      <li>• Monitor temperature (should reach 55-65°C)</li>
                      <li>• Compost for 3-6 months until dark and crumbly</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Factory className="h-5 w-5 text-accent" />
                      Application & Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Apply 2-4 weeks before planting</li>
                      <li>• Use 5-10 tons per hectare for crops</li>
                      <li>• Improves soil structure and water retention</li>
                      <li>• Increases soil nutrient content naturally</li>
                      <li>• Reduces need for chemical fertilizers</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6 bg-primary/5">
                <CardHeader>
                  <CardTitle>Safety Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <li>✓ Wear protective equipment when handling manure</li>
                    <li>✓ Never apply fresh manure to food crops</li>
                    <li>✓ Keep compost piles at least 100m from water bodies</li>
                    <li>✓ Wash hands thoroughly after handling</li>
                    <li>✓ Test compost pH before application (ideal: 6.5-8.0)</li>
                    <li>✓ Store finished compost in dry, covered area</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Livestock;

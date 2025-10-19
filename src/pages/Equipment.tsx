import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Settings } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Equipment = () => {
  const equipment = [
    {
      name: "Tractor",
      category: "Heavy Machinery",
      use: "Plowing, tilling, and hauling heavy loads across the farm",
      maintenance: "Regular oil changes, tire pressure checks, and engine tune-ups every 100 hours of operation",
    },
    {
      name: "Combine Harvester",
      category: "Harvesting",
      use: "Harvesting grain crops like wheat, corn, and barley efficiently",
      maintenance: "Clean grain tanks daily, sharpen blades weekly, lubricate moving parts after each use",
    },
    {
      name: "Plow",
      category: "Tillage",
      use: "Breaking and turning over soil to prepare for planting",
      maintenance: "Clean after use, sharpen blades annually, check bolt tightness before each season",
    },
    {
      name: "Harrow",
      category: "Tillage",
      use: "Breaking up soil clumps and smoothing field surfaces",
      maintenance: "Remove debris after use, oil hinges monthly, inspect teeth for wear",
    },
    {
      name: "Cultivator",
      category: "Tillage",
      use: "Stirring and pulverizing soil before planting or to remove weeds",
      maintenance: "Clean tines after use, tighten bolts regularly, replace worn shanks",
    },
    {
      name: "Seed Drill",
      category: "Planting",
      use: "Planting seeds in rows at consistent depth and spacing",
      maintenance: "Clean seed boxes daily, calibrate spacing annually, lubricate chains weekly",
    },
    {
      name: "Transplanter",
      category: "Planting",
      use: "Planting seedlings into prepared soil efficiently",
      maintenance: "Clean planting units after use, adjust spacing mechanisms, check hydraulics",
    },
    {
      name: "Sprayer",
      category: "Crop Protection",
      use: "Applying pesticides, herbicides, and fertilizers evenly",
      maintenance: "Flush system after each use, replace nozzles seasonally, check pressure gauges",
    },
    {
      name: "Irrigation Pump",
      category: "Irrigation",
      use: "Moving water from source to fields for crop irrigation",
      maintenance: "Check oil levels monthly, clean filters weekly, inspect seals for leaks",
    },
    {
      name: "Drip Irrigation System",
      category: "Irrigation",
      use: "Delivering water directly to plant roots efficiently",
      maintenance: "Flush lines weekly, check emitters for clogs, replace filters quarterly",
    },
    {
      name: "Sprinkler System",
      category: "Irrigation",
      use: "Distributing water over large areas evenly",
      maintenance: "Clean sprinkler heads monthly, check for leaks, winterize in cold seasons",
    },
    {
      name: "Baler",
      category: "Harvesting",
      use: "Compressing and bundling hay or straw into bales",
      maintenance: "Grease bearings after every 10 bales, tighten belts, clean pickup teeth",
    },
    {
      name: "Mower",
      category: "Cutting",
      use: "Cutting grass, hay, or crops close to the ground",
      maintenance: "Sharpen blades before season, clean deck after use, check belt tension",
    },
    {
      name: "Loader",
      category: "Material Handling",
      use: "Lifting and moving soil, feed, or materials around the farm",
      maintenance: "Check hydraulic fluid weekly, grease pivot points, inspect bucket for cracks",
    },
    {
      name: "Trailer",
      category: "Transport",
      use: "Transporting crops, equipment, and materials",
      maintenance: "Check tire pressure monthly, lubricate hitch, inspect brake lights",
    },
    {
      name: "Manure Spreader",
      category: "Fertilization",
      use: "Distributing manure evenly across fields as fertilizer",
      maintenance: "Clean beater bars after use, oil chains, check PTO shaft alignment",
    },
    {
      name: "Rotavator",
      category: "Tillage",
      use: "Deep tilling and mixing soil with organic matter",
      maintenance: "Sharpen blades seasonally, check gearbox oil, clean after muddy use",
    },
    {
      name: "Forage Harvester",
      category: "Harvesting",
      use: "Chopping green plants for silage production",
      maintenance: "Sharpen knives regularly, clean chute daily, inspect belts weekly",
    },
    {
      name: "Greenhouse Equipment",
      category: "Controlled Environment",
      use: "Climate control systems for protected crop cultivation",
      maintenance: "Clean sensors monthly, calibrate thermostats, check ventilation fans",
    },
    {
      name: "Grain Dryer",
      category: "Post-Harvest",
      use: "Removing moisture from harvested grain for storage",
      maintenance: "Clean burner monthly, inspect fans, calibrate moisture sensors annually",
    },
    {
      name: "Silage Cutter",
      category: "Feed Processing",
      use: "Cutting silage into uniform pieces for livestock feed",
      maintenance: "Sharpen blades weekly, check belt tension, lubricate bearings",
    },
    {
      name: "Chaff Cutter",
      category: "Feed Processing",
      use: "Cutting straw and hay into small pieces for animal feed",
      maintenance: "Sharpen blades before use, oil moving parts, tighten all bolts",
    },
    {
      name: "Milking Machine",
      category: "Dairy",
      use: "Automated milking of dairy cattle efficiently",
      maintenance: "Sanitize after each use, replace rubber parts quarterly, check vacuum pressure",
    },
    {
      name: "Cream Separator",
      category: "Dairy",
      use: "Separating cream from milk for butter production",
      maintenance: "Clean thoroughly after use, check bowl alignment, oil motor bearings",
    },
    {
      name: "Incubator",
      category: "Poultry",
      use: "Hatching eggs under controlled temperature and humidity",
      maintenance: "Calibrate thermostat monthly, clean trays after each batch, check humidity sensors",
    },
    {
      name: "Egg Grading Machine",
      category: "Poultry",
      use: "Sorting eggs by size and weight automatically",
      maintenance: "Clean rollers daily, calibrate scales weekly, lubricate conveyor chains",
    },
    {
      name: "Feed Mixer",
      category: "Livestock",
      use: "Mixing different feed ingredients uniformly",
      maintenance: "Clean augers after use, check motor brushes, inspect blades for wear",
    },
    {
      name: "Water Trough",
      category: "Livestock",
      use: "Providing clean drinking water to animals",
      maintenance: "Clean weekly, check float valves, inspect for leaks and cracks",
    },
    {
      name: "Fencing Tools",
      category: "Infrastructure",
      use: "Installing and maintaining farm fencing",
      maintenance: "Clean and oil wire cutters, check fence tester batteries, store in dry place",
    },
    {
      name: "Wheelbarrow",
      category: "Manual Tools",
      use: "Moving soil, compost, or materials manually",
      maintenance: "Check tire pressure, oil wheel bearings, repair rust spots with paint",
    },
    {
      name: "Hand Tools Set",
      category: "Manual Tools",
      use: "Various manual tasks like digging, cutting, and pruning",
      maintenance: "Clean after use, sharpen blades regularly, oil wooden handles, store dry",
    },
  ];

  const categories = [...new Set(equipment.map(item => item.category))];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Farm Equipment Guide
              </h1>
              <p className="text-lg text-muted-foreground">
                Comprehensive guide to essential farm equipment, their uses, and maintenance tips
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-sm px-4 py-2">
                  {category}
                </Badge>
              ))}
            </div>

            {/* Equipment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipment.map((item) => (
                <Card key={item.name} className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Wrench className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium mb-1">Use:</p>
                        <p className="text-sm text-muted-foreground">{item.use}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Settings className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium mb-1">Maintenance:</p>
                        <p className="text-sm text-muted-foreground">{item.maintenance}</p>
                      </div>
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

export default Equipment;

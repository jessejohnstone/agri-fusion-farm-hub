import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Droplets, TestTube, Leaf, ShieldCheck, Sprout } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Soil = () => {
  const soilTypes = [
    {
      name: "Clay Soil",
      icon: Mountain,
      description: "Heavy, nutrient-rich soil that retains water well but drains slowly",
      characteristics: ["High water retention", "Rich in nutrients", "Poor drainage", "Heavy texture"],
      bestFor: ["Rice", "Lettuce", "Cabbage", "Broccoli"],
      improvements: ["Add organic matter", "Improve drainage with sand", "Avoid working when wet"],
      color: "text-amber-600"
    },
    {
      name: "Sandy Soil",
      icon: Droplets,
      description: "Light, well-draining soil with low nutrient retention",
      characteristics: ["Excellent drainage", "Low water retention", "Low nutrients", "Easy to work"],
      bestFor: ["Carrots", "Potatoes", "Radishes", "Tomatoes"],
      improvements: ["Add compost regularly", "Use mulch to retain moisture", "Apply organic fertilizers"],
      color: "text-yellow-600"
    },
    {
      name: "Loam Soil",
      icon: Leaf,
      description: "Ideal balanced soil with good drainage and nutrient retention",
      characteristics: ["Balanced texture", "Good drainage", "High fertility", "Easy to work"],
      bestFor: ["Most crops", "Vegetables", "Fruits", "Grains"],
      improvements: ["Maintain with compost", "Regular mulching", "Crop rotation"],
      color: "text-green-600"
    },
    {
      name: "Silt Soil",
      icon: Droplets,
      description: "Smooth, fertile soil with good moisture retention",
      characteristics: ["Smooth texture", "Good fertility", "Moderate drainage", "Prone to compaction"],
      bestFor: ["Maize", "Wheat", "Soybeans", "Most vegetables"],
      improvements: ["Prevent compaction", "Add organic matter", "Avoid overwatering"],
      color: "text-blue-600"
    },
    {
      name: "Peat Soil",
      icon: Sprout,
      description: "Acidic, organic-rich soil with excellent water retention",
      characteristics: ["High organic matter", "Acidic pH", "Excellent water retention", "Low nutrients"],
      bestFor: ["Blueberries", "Rhododendrons", "Specialized crops"],
      improvements: ["Add lime to reduce acidity", "Supplement with nutrients", "Improve structure"],
      color: "text-purple-600"
    },
    {
      name: "Chalky Soil",
      icon: Mountain,
      description: "Alkaline soil containing calcium carbonate, often stony",
      characteristics: ["Alkaline pH", "Free-draining", "Stony", "Can be shallow"],
      bestFor: ["Beets", "Spinach", "Cabbage", "Lilacs"],
      improvements: ["Add acidic organic matter", "Regular mulching", "Add nitrogen-rich fertilizers"],
      color: "text-gray-600"
    }
  ];

  const soilTests = [
    {
      test: "pH Testing",
      description: "Measures soil acidity/alkalinity (pH 6.0-7.0 is ideal for most crops)",
      frequency: "Annually",
      importance: "Critical for nutrient availability"
    },
    {
      test: "Nutrient Analysis",
      description: "Tests for nitrogen (N), phosphorus (P), and potassium (K) levels",
      frequency: "Every 2-3 years",
      importance: "Determines fertilizer needs"
    },
    {
      test: "Organic Matter Content",
      description: "Measures the percentage of decomposed plant and animal material",
      frequency: "Every 3-4 years",
      importance: "Indicates soil health and fertility"
    },
    {
      test: "Soil Texture",
      description: "Determines the proportion of sand, silt, and clay particles",
      frequency: "Once (doesn't change)",
      importance: "Guides water and nutrient management"
    },
    {
      test: "Micronutrient Testing",
      description: "Tests for iron, zinc, manganese, copper, and other trace elements",
      frequency: "Every 3-5 years",
      importance: "Prevents deficiency-related crop issues"
    }
  ];

  const soilAmendments = [
    {
      amendment: "Compost",
      benefits: ["Improves structure", "Adds nutrients", "Enhances water retention", "Increases beneficial microbes"],
      application: "Apply 2-4 inches annually, work into top 6-8 inches of soil",
      bestFor: "All soil types"
    },
    {
      amendment: "Manure (Well-rotted)",
      benefits: ["High nitrogen content", "Improves fertility", "Adds organic matter", "Feeds soil organisms"],
      application: "Apply in fall or spring, 20-40 tons per acre, must be well-composted",
      bestFor: "Clay and sandy soils"
    },
    {
      amendment: "Lime (Calcium Carbonate)",
      benefits: ["Raises pH", "Adds calcium", "Improves nutrient availability", "Reduces aluminum toxicity"],
      application: "Based on soil test, typically 1-2 tons per acre",
      bestFor: "Acidic soils (pH below 6.0)"
    },
    {
      amendment: "Gypsum (Calcium Sulfate)",
      benefits: ["Improves clay structure", "Adds calcium and sulfur", "Doesn't change pH", "Reduces sodium"],
      application: "1-2 tons per acre, work into soil",
      bestFor: "Clay soils, sodic soils"
    },
    {
      amendment: "Biochar",
      benefits: ["Long-term carbon storage", "Improves water retention", "Reduces fertilizer leaching", "Supports microbes"],
      application: "5-10 tons per acre, mix thoroughly",
      bestFor: "Degraded soils, sandy soils"
    },
    {
      amendment: "Green Manure/Cover Crops",
      benefits: ["Adds nitrogen", "Prevents erosion", "Improves structure", "Suppresses weeds"],
      application: "Plant cover crops, till in before flowering",
      bestFor: "All soil types, between main crops"
    }
  ];

  const conservationPractices = [
    {
      practice: "Contour Farming",
      description: "Planting across slopes following the natural contours of the land",
      benefits: ["Reduces water runoff", "Prevents soil erosion", "Improves water infiltration"],
      icon: Mountain
    },
    {
      practice: "Terracing",
      description: "Creating level platforms on steep slopes",
      benefits: ["Controls erosion on hills", "Increases arable land", "Improves water retention"],
      icon: Mountain
    },
    {
      practice: "Cover Cropping",
      description: "Growing crops specifically to protect and improve soil between main crops",
      benefits: ["Prevents erosion", "Adds organic matter", "Suppresses weeds", "Fixes nitrogen"],
      icon: Sprout
    },
    {
      practice: "Mulching",
      description: "Covering soil with organic or inorganic materials",
      benefits: ["Reduces evaporation", "Controls weeds", "Prevents erosion", "Regulates temperature"],
      icon: Leaf
    },
    {
      practice: "Crop Rotation",
      description: "Systematically planting different crops in sequence",
      benefits: ["Breaks pest cycles", "Balances nutrients", "Improves soil structure", "Increases yields"],
      icon: Sprout
    },
    {
      practice: "No-Till Farming",
      description: "Planting crops without tilling the soil",
      benefits: ["Preserves soil structure", "Reduces erosion", "Increases organic matter", "Saves fuel"],
      icon: ShieldCheck
    }
  ];

  const soilHealthIndicators = [
    { indicator: "Earthworm Population", ideal: "10+ per shovel of soil", importance: "Indicates good structure and organic matter" },
    { indicator: "Soil Color", ideal: "Dark brown to black", importance: "Shows high organic matter content" },
    { indicator: "Water Infiltration", ideal: "1+ inch per hour", importance: "Good structure and porosity" },
    { indicator: "Root Penetration", ideal: "Deep, unrestricted growth", importance: "Indicates lack of compaction" },
    { indicator: "Soil Odor", ideal: "Fresh, earthy smell", importance: "Sign of healthy microbial activity" },
    { indicator: "Crop Performance", ideal: "Vigorous growth, good yields", importance: "Overall soil fertility indicator" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Soil Management Guide
              </h1>
              <p className="text-xl opacity-90">
                Comprehensive information about soil types, testing, amendments, and conservation practices for optimal farm productivity
              </p>
            </div>
          </div>
        </section>

        {/* Soil Types Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Understanding Soil Types</h2>
              <p className="text-muted-foreground text-lg">
                Different soil types have unique characteristics that affect crop selection and management practices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {soilTypes.map((soil) => (
                <Card key={soil.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <soil.icon className={`h-10 w-10 ${soil.color} mb-3`} />
                    <CardTitle>{soil.name}</CardTitle>
                    <CardDescription>{soil.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Characteristics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {soil.characteristics.map((char) => (
                          <Badge key={char} variant="secondary">{char}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Best For:</h4>
                      <p className="text-sm text-muted-foreground">{soil.bestFor.join(", ")}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Improvements:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {soil.improvements.map((imp) => (
                          <li key={imp}>• {imp}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Soil Testing Section */}
        <section className="py-16 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <TestTube className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Soil Testing & Analysis</h2>
              <p className="text-muted-foreground text-lg">
                Regular soil testing is essential for optimal crop production and efficient fertilizer use
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {soilTests.map((test) => (
                <Card key={test.test}>
                  <CardHeader>
                    <CardTitle className="text-xl">{test.test}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Frequency:</span>
                        <Badge>{test.frequency}</Badge>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="font-semibold">Importance:</span>
                        <p className="text-sm text-muted-foreground mt-1">{test.importance}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Where to Test Your Soil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Contact these Kenyan institutions for professional soil testing:</p>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Kenya Agricultural and Livestock Research Organization (KALRO)</strong> - Regional centers across Kenya</li>
                  <li>• <strong>Ministry of Agriculture County Offices</strong> - Available in all 47 counties</li>
                  <li>• <strong>Private Agricultural Labs</strong> - Found in major towns (Nairobi, Nakuru, Eldoret, Mombasa)</li>
                  <li>• <strong>University Labs</strong> - University of Nairobi, Egerton University, Jomo Kenyatta University</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Soil Amendments Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <Leaf className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Soil Amendments & Fertilizers</h2>
              <p className="text-muted-foreground text-lg">
                Improve soil fertility and structure with the right amendments
              </p>
            </div>

            <div className="space-y-6">
              {soilAmendments.map((item) => (
                <Card key={item.amendment}>
                  <CardHeader>
                    <CardTitle className="text-2xl">{item.amendment}</CardTitle>
                    <Badge variant="outline">{item.bestFor}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Benefits:</h4>
                        <ul className="space-y-2">
                          {item.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2">
                              <span className="text-primary mt-1">✓</span>
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Application:</h4>
                        <p className="text-sm text-muted-foreground">{item.application}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Conservation Practices Section */}
        <section className="py-16 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <ShieldCheck className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Soil Conservation Practices</h2>
              <p className="text-muted-foreground text-lg">
                Protect your soil from erosion and degradation with proven conservation methods
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conservationPractices.map((practice) => (
                <Card key={practice.practice} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <practice.icon className="h-10 w-10 text-primary mb-3" />
                    <CardTitle>{practice.practice}</CardTitle>
                    <CardDescription>{practice.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {practice.benefits.map((benefit) => (
                        <li key={benefit} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Soil Health Indicators Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Soil Health Indicators</h2>
              <p className="text-muted-foreground text-lg">
                Monitor these signs to assess your soil's health and productivity
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Indicator</th>
                        <th className="text-left py-3 px-4 font-semibold">Ideal Condition</th>
                        <th className="text-left py-3 px-4 font-semibold">Importance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {soilHealthIndicators.map((item, index) => (
                        <tr key={item.indicator} className={index !== soilHealthIndicators.length - 1 ? "border-b" : ""}>
                          <td className="py-3 px-4 font-medium">{item.indicator}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{item.ideal}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{item.importance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Tips Section */}
        <section className="py-16 bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Quick Soil Management Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Test Before Fertilizing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/90">
                    Always test your soil before adding fertilizers to avoid waste and environmental damage
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Add Organic Matter Annually</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/90">
                    Incorporate compost or manure every year to maintain soil health and fertility
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Prevent Compaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/90">
                    Avoid working soil when wet and use cover crops to maintain soil structure
                  </p>
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

export default Soil;

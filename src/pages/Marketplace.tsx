import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingBag } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import productTomatoes from "@/assets/product-tomatoes.jpg";
import productMaize from "@/assets/product-maize.jpg";
import productWheat from "@/assets/product-wheat.jpg";
import productCabbage from "@/assets/product-cabbage.jpg";
import productMilk from "@/assets/product-milk.jpg";
import productEggs from "@/assets/product-eggs.jpg";
import productManure from "@/assets/product-manure.jpg";
import productTractor from "@/assets/product-tractor.jpg";
import productSprinkler from "@/assets/product-sprinkler.jpg";
import productPlough from "@/assets/product-plough.jpg";
import productBeef from "@/assets/product-beef.jpg";
import productPotatoes from "@/assets/product-potatoes.jpg";

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const products = [
    // Crops
    { id: 1, name: "Fresh Tomatoes", category: "crops", price: 250, unit: "kg", image: productTomatoes, description: "Premium quality organic tomatoes" },
    { id: 2, name: "Maize Corn", category: "crops", price: 4500, unit: "bag (90kg)", image: productMaize, description: "High-yield maize variety" },
    { id: 3, name: "Wheat Grains", category: "crops", price: 5200, unit: "bag (90kg)", image: productWheat, description: "Premium wheat for flour production" },
    { id: 4, name: "Fresh Cabbage", category: "crops", price: 80, unit: "kg", image: productCabbage, description: "Crisp and fresh cabbage heads" },
    { id: 5, name: "Irish Potatoes", category: "crops", price: 120, unit: "kg", image: productPotatoes, description: "Grade A certified potatoes" },
    
    // Livestock Products
    { id: 6, name: "Fresh Dairy Milk", category: "livestock", price: 65, unit: "liter", image: productMilk, description: "Pure cow milk from healthy cattle" },
    { id: 7, name: "Farm Fresh Eggs", category: "livestock", price: 15, unit: "piece", image: productEggs, description: "Free-range chicken eggs" },
    { id: 8, name: "Premium Beef", category: "livestock", price: 650, unit: "kg", image: productBeef, description: "Fresh quality beef cuts" },
    { id: 9, name: "Organic Manure", category: "livestock", price: 800, unit: "bag (50kg)", image: productManure, description: "Rich organic fertilizer from livestock" },
    
    // Equipment
    { id: 10, name: "Farm Tractor", category: "equipment", price: 2850000, unit: "unit", image: productTractor, description: "60HP agricultural tractor" },
    { id: 11, name: "Irrigation Sprinkler", category: "equipment", price: 45000, unit: "set", image: productSprinkler, description: "Professional irrigation system" },
    { id: 12, name: "Heavy Duty Plough", category: "equipment", price: 125000, unit: "unit", image: productPlough, description: "3-disc reversible plough" },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Marketplace
              </h1>
              <p className="text-lg text-muted-foreground">
                Buy and sell agricultural products, livestock, and farming equipment
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, livestock, equipment..."
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="crops">Crops</SelectItem>
                  <SelectItem value="livestock">Livestock Products</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-muted rounded-md mb-4 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-2xl font-bold text-primary mb-1">
                      KSh {product.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">per {product.unit}</p>
                    <Button variant="default" className="w-full">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Become a Seller</h2>
                <p className="text-muted-foreground mb-6">
                  List your agricultural products and reach thousands of buyers
                </p>
                <Button variant="hero" size="lg">
                  Start Selling Today
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Marketplace;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingBag } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Marketplace = () => {
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
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crops">Crops</SelectItem>
                  <SelectItem value="livestock">Livestock</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="seeds">Seeds</SelectItem>
                  <SelectItem value="fertilizers">Fertilizers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Product {item}</CardTitle>
                    <CardDescription>High-quality agricultural product</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-muted rounded-md mb-4"></div>
                    <p className="text-2xl font-bold text-primary mb-4">$99.00</p>
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

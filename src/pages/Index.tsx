import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Sprout, Beef, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-farm.jpg";

const Index = () => {
  const stats = [
    { icon: Users, label: "Farmers Supported", value: "500+" },
    { icon: Sprout, label: "Crop Varieties", value: "30+" },
    { icon: Beef, label: "Livestock Breeds", value: "20+" },
    { icon: TrendingUp, label: "Success Rate", value: "95%" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          </div>
          
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                Empowering Farmers Through Smart Agriculture
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Connecting farmers with the latest techniques, quality products, and a thriving community
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/marketplace">
                  <Button variant="hero" size="lg">
                    Explore Farm Products
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Join Our Community
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.label} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                What We Offer
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive solutions for modern farming
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <Sprout className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Quality Crops</CardTitle>
                  <CardDescription>
                    Access to high-yield seeds, fertilizers, and expert growing techniques for 30+ crop varieties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/crops">
                    <Button variant="outline" className="w-full">
                      View Crops
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <Beef className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Livestock Management</CardTitle>
                  <CardDescription>
                    Premium breeds with veterinary support and comprehensive care guides for healthy animals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/livestock">
                    <Button variant="outline" className="w-full">
                      View Livestock
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Digital Marketplace</CardTitle>
                  <CardDescription>
                    Buy and sell farm products directly, connect with buyers, and grow your agricultural business
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/marketplace">
                    <Button variant="outline" className="w-full">
                      Visit Marketplace
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/90">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of farmers who are already using AgriFusion to grow their agricultural business
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="text-lg px-8">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

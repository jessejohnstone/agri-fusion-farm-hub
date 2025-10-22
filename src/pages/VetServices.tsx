import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Star, Stethoscope, Syringe, HeartPulse, Pill, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const VetServices = () => {
  const [userCounty, setUserCounty] = useState<string | null>(null);
  const [vets, setVets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserCountyAndVets = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Fetch user's county from profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("location")
            .eq("user_id", user.id)
            .single();

          if (profile?.location) {
            setUserCounty(profile.location);
            
            // Fetch vet services for user's county
            const { data: vetData, error } = await supabase
              .from("vet_services")
              .select("*")
              .eq("county", profile.location)
              .eq("available", true)
              .order("rating", { ascending: false });

            if (error) throw error;
            setVets(vetData || []);
          } else {
            toast({
              title: "County not set",
              description: "Please update your profile with your county information.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load veterinary services.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserCountyAndVets();
  }, [toast]);

  const services = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "General Check-ups",
      description: "Comprehensive health examinations for all livestock",
      price: "KES 500 - 2,000",
    },
    {
      icon: <Syringe className="h-8 w-8" />,
      title: "Vaccinations",
      description: "Full vaccination programs for disease prevention",
      price: "KES 300 - 1,500",
    },
    {
      icon: <HeartPulse className="h-8 w-8" />,
      title: "Emergency Care",
      description: "24/7 emergency veterinary services",
      price: "KES 3,000 - 10,000",
    },
    {
      icon: <Pill className="h-8 w-8" />,
      title: "Medication & Treatment",
      description: "Prescription and treatment for various conditions",
      price: "KES 800 - 5,000",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Veterinary Services
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Professional veterinary care for your livestock in {userCounty || "your area"}
              </p>
              {userCounty && (
                <Badge variant="outline" className="text-base">
                  <MapPin className="h-4 w-4 mr-1" />
                  Showing services in {userCounty} County
                </Badge>
              )}
            </div>

            {/* Services Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Our Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service) => (
                  <Card key={service.title} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-center mb-4 text-primary">
                        {service.icon}
                      </div>
                      <CardTitle className="text-center">{service.title}</CardTitle>
                      <CardDescription className="text-center">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center font-semibold text-primary">{service.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Available Vets Section */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Available Veterinarians in {userCounty || "Your County"}
              </h2>
              {vets.length === 0 ? (
                <Card className="max-w-md mx-auto">
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">
                      No veterinary services found in {userCounty || "your county"}. Please check back later or contact us for assistance.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vets.map((vet) => (
                    <Card key={vet.id} className="hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{vet.name}</span>
                          <span className="flex items-center text-sm text-warning">
                            <Star className="h-4 w-4 fill-current mr-1" />
                            {vet.rating}
                          </span>
                        </CardTitle>
                        <CardDescription>{vet.specialty}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{vet.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 text-primary" />
                          <a href={`tel:${vet.phone}`} className="hover:underline">
                            {vet.phone}
                          </a>
                        </div>
                        {vet.email && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4 text-primary" />
                            <a href={`mailto:${vet.email}`} className="hover:underline">
                              {vet.email}
                            </a>
                          </div>
                        )}
                        <div className="text-sm text-muted-foreground">
                          Experience: {vet.years_experience} years
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="default" 
                            className="flex-1"
                            onClick={() => window.location.href = `tel:${vet.phone}`}
                          >
                            <Phone className="mr-2 h-4 w-4" />
                            Call Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VetServices;

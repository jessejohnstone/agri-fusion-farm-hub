import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Star, Stethoscope, Syringe, HeartPulse, Pill } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const VetServices = () => {
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

  const vets = [
    {
      name: "Dr. James Mwangi",
      specialty: "Large Animals (Cattle, Goats)",
      location: "Nairobi, Kenya",
      phone: "+254 712 345 678",
      rating: 4.8,
      experience: "15 years experience",
    },
    {
      name: "Dr. Sarah Kamau",
      specialty: "Poultry & Small Animals",
      location: "Nakuru, Kenya",
      phone: "+254 723 456 789",
      rating: 4.9,
      experience: "12 years experience",
    },
    {
      name: "Dr. Peter Ochieng",
      specialty: "General Veterinary Practice",
      location: "Kisumu, Kenya",
      phone: "+254 734 567 890",
      rating: 4.7,
      experience: "10 years experience",
    },
    {
      name: "Dr. Mary Wanjiru",
      specialty: "Emergency & Critical Care",
      location: "Mombasa, Kenya",
      phone: "+254 745 678 901",
      rating: 4.9,
      experience: "18 years experience",
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
                Veterinary Services
              </h1>
              <p className="text-lg text-muted-foreground">
                Professional veterinary care for your livestock - from routine check-ups to emergency services
              </p>
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
                Available Veterinarians
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vets.map((vet) => (
                  <Card key={vet.name} className="hover:shadow-xl transition-all duration-300">
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
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{vet.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>{vet.phone}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="default" className="flex-1">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Now
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Book Appointment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VetServices;

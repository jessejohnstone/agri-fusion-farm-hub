import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, Loader2, AlertCircle, MapPin, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CropDiagnosis = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const specialists = [
    {
      name: "Dr. James Kamau",
      specialty: "Plant Pathologist",
      location: "Nairobi Region",
      phone: "+254 712 345 678",
      distance: "5 km away",
    },
    {
      name: "Dr. Sarah Njeri",
      specialty: "Agricultural Extension Officer",
      location: "Kiambu County",
      phone: "+254 723 456 789",
      distance: "12 km away",
    },
    {
      name: "AgriVet Consultants",
      specialty: "Veterinary & Crop Services",
      location: "Thika Town",
      phone: "+254 734 567 890",
      distance: "18 km away",
    },
  ];

  const handleImageSelection = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setSelectedImage(imageData);
      setDiagnosis(null);
      
      // Automatically start analysis
      await analyzeImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    setDiagnosis(null);

    try {
      const { data, error } = await supabase.functions.invoke("diagnose-crop", {
        body: { imageData },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setDiagnosis(data.diagnosis);
      toast({
        title: "Analysis Complete",
        description: "Your crop has been analyzed successfully",
      });
    } catch (error) {
      console.error("Error analyzing crop:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze crop. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                AI Crop Health Diagnosis
              </h1>
              <p className="text-lg text-muted-foreground">
                Upload a photo of your crop and get instant AI-powered diagnosis with treatment recommendations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Crop Image</CardTitle>
                  <CardDescription>
                    Take a photo or upload an image of your sick crop for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(e) => e.target.files?.[0] && handleImageSelection(e.target.files[0])}
                      className="hidden"
                    />
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => cameraInputRef.current?.click()}
                      disabled={isAnalyzing}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Take Photo
                    </Button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleImageSelection(e.target.files[0])}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isAnalyzing}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </div>

                  {selectedImage && (
                    <div className="relative">
                      <img
                        src={selectedImage}
                        alt="Selected crop"
                        className="w-full h-64 object-cover rounded-lg border-2 border-border"
                      />
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                          <div className="text-center text-white">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                            <p className="text-sm">Analyzing your crop...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {!selectedImage && (
                    <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        No image selected. Take a photo or upload an image to begin.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Diagnosis & Recommendations</CardTitle>
                  <CardDescription>
                    AI-powered analysis results and treatment suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {diagnosis ? (
                    <div className="prose prose-sm max-w-none">
                      <div className="bg-muted/50 p-4 rounded-lg whitespace-pre-wrap">
                        {diagnosis}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Upload a crop image to see AI-powered diagnosis and treatment recommendations
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Specialists Section */}
            <div className="mt-12 max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Nearby Agricultural Specialists
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {specialists.map((specialist) => (
                  <Card key={specialist.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{specialist.name}</CardTitle>
                      <CardDescription>{specialist.specialty}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{specialist.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-primary" />
                        <a href={`tel:${specialist.phone}`} className="hover:text-primary">
                          {specialist.phone}
                        </a>
                      </div>
                      <p className="text-xs text-muted-foreground">{specialist.distance}</p>
                      <Button variant="outline" className="w-full mt-4">
                        Contact Specialist
                      </Button>
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

export default CropDiagnosis;

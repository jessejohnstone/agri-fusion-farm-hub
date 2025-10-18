import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Wind, Sun, CloudRain, Thermometer } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Weather = () => {
  // Mock weather data - in production, integrate with weather API
  const weatherData = [
    { day: "Today", temp: "28°C", condition: "Sunny", rain: "10%", wind: "15 km/h", humidity: "65%" },
    { day: "Tomorrow", temp: "26°C", condition: "Partly Cloudy", rain: "30%", wind: "18 km/h", humidity: "70%" },
    { day: "Wednesday", temp: "24°C", condition: "Rainy", rain: "80%", wind: "22 km/h", humidity: "85%" },
    { day: "Thursday", temp: "25°C", condition: "Cloudy", rain: "40%", wind: "16 km/h", humidity: "75%" },
    { day: "Friday", temp: "27°C", condition: "Sunny", rain: "15%", wind: "12 km/h", humidity: "60%" },
  ];

  const farmingTips = [
    {
      title: "Planting Recommendation",
      description: "Good conditions for planting maize and beans this week",
      icon: Sun,
    },
    {
      title: "Irrigation Alert",
      description: "Rain expected Wednesday - reduce irrigation schedule",
      icon: Droplets,
    },
    {
      title: "Wind Advisory",
      description: "Strong winds forecasted - secure greenhouses and shade nets",
      icon: Wind,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Weather Forecast
              </h1>
              <p className="text-lg text-muted-foreground">
                Plan your farming activities with accurate weather predictions
              </p>
            </div>

            {/* Current Weather */}
            <Card className="max-w-4xl mx-auto mb-8 bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Sun className="h-20 w-20 mx-auto mb-4 text-secondary" />
                  <h2 className="text-5xl font-bold mb-2">28°C</h2>
                  <p className="text-xl text-muted-foreground mb-4">Sunny & Clear</p>
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    <div>
                      <Droplets className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-sm">Humidity</p>
                      <p className="font-semibold">65%</p>
                    </div>
                    <div>
                      <Wind className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-sm">Wind</p>
                      <p className="font-semibold">15 km/h</p>
                    </div>
                    <div>
                      <CloudRain className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-sm">Rain</p>
                      <p className="font-semibold">10%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5-Day Forecast */}
            <div className="max-w-6xl mx-auto mb-12">
              <h2 className="text-2xl font-bold mb-6">5-Day Forecast</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {weatherData.map((day) => (
                  <Card key={day.day} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{day.day}</CardTitle>
                      <CardDescription>{day.condition}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Thermometer className="h-8 w-8 mx-auto mb-2 text-secondary" />
                      <p className="text-2xl font-bold text-center mb-3">{day.temp}</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rain:</span>
                          <span className="font-medium">{day.rain}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Wind:</span>
                          <span className="font-medium">{day.wind}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Humidity:</span>
                          <span className="font-medium">{day.humidity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Farming Tips */}
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Weather-Based Farming Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {farmingTips.map((tip) => (
                  <Card key={tip.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <tip.icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                      <CardDescription>{tip.description}</CardDescription>
                    </CardHeader>
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

export default Weather;

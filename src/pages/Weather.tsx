import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Wind, Sun, CloudRain, Thermometer, MapPin, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface WeatherData {
  location: string;
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  icon: string;
}

interface ForecastDay {
  day: string;
  temp: string;
  condition: string;
  rain: string;
  wind: string;
  humidity: string;
  icon: string;
}

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState("Current Location");

  const getWeatherIcon = (iconCode: string) => {
    // Map OpenWeather icon codes to lucide-react icons
    if (iconCode.includes('01')) return Sun;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return Cloud;
    if (iconCode.includes('09') || iconCode.includes('10') || iconCode.includes('11')) return CloudRain;
    return Sun;
  };

  const fetchWeather = async (lat?: number, lon?: number, locationName?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-weather`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lat,
            lon,
            location: locationName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const { current: currentData, forecast: forecastData } = await response.json();

      setLocationName(currentData.name || "Current Location");

      setCurrentWeather({
        location: currentData.name,
        temp: Math.round(currentData.main.temp),
        condition: currentData.weather[0].main,
        humidity: currentData.main.humidity,
        wind: Math.round(currentData.wind.speed * 3.6),
        icon: currentData.weather[0].icon,
      });

      // Process forecast data
      const dailyForecasts: ForecastDay[] = [];
      const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'];
      
      for (let i = 0; i < 5; i++) {
        const index = i * 8;
        if (forecastData.list[index]) {
          const item = forecastData.list[index];
          dailyForecasts.push({
            day: days[i],
            temp: `${Math.round(item.main.temp)}°C`,
            condition: item.weather[0].main,
            rain: item.pop ? `${Math.round(item.pop * 100)}%` : '0%',
            wind: `${Math.round(item.wind.speed * 3.6)} km/h`,
            humidity: `${item.main.humidity}%`,
            icon: item.weather[0].icon,
          });
        }
      }

      setForecast(dailyForecasts);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async (locationName: string) => {
    await fetchWeather(undefined, undefined, locationName);
  };

  const loadUserLocation = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("county, location")
          .eq("user_id", user.id)
          .maybeSingle();
        
        if (profile && (profile.county || profile.location)) {
          const locationToUse = profile.location || profile.county;
          setLocationName(locationToUse);
          await fetchWeatherByLocation(locationToUse);
          return;
        }
      }
    } catch (error) {
      console.error("Error loading user location:", error);
    }
    
    // Fallback to geolocation or Nairobi
    getCurrentLocation();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Default to Nairobi, Kenya if geolocation fails
          fetchWeather(-1.2921, 36.8219);
        }
      );
    } else {
      // Default location if geolocation not supported
      fetchWeather(-1.2921, 36.8219);
    }
  };

  useEffect(() => {
    loadUserLocation();
  }, []);

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
              <p className="text-lg text-muted-foreground mb-2">
                Plan your farming activities with accurate weather predictions
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{locationName}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={getCurrentLocation}
                className="mt-4"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Update Location
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : error ? (
              <Card className="max-w-4xl mx-auto mb-8">
                <CardContent className="pt-6">
                  <p className="text-center text-destructive">{error}</p>
                  <div className="flex justify-center mt-4">
                    <Button onClick={getCurrentLocation}>Try Again</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Current Weather */}
                {currentWeather && (
                  <Card className="max-w-4xl mx-auto mb-8 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        {(() => {
                          const IconComponent = getWeatherIcon(currentWeather.icon);
                          return <IconComponent className="h-20 w-20 mx-auto mb-4 text-secondary" />;
                        })()}
                        <h2 className="text-5xl font-bold mb-2">{currentWeather.temp}°C</h2>
                        <p className="text-xl text-muted-foreground mb-4">{currentWeather.condition}</p>
                        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                          <div>
                            <Droplets className="h-5 w-5 mx-auto mb-1 text-primary" />
                            <p className="text-sm">Humidity</p>
                            <p className="font-semibold">{currentWeather.humidity}%</p>
                          </div>
                          <div>
                            <Wind className="h-5 w-5 mx-auto mb-1 text-primary" />
                            <p className="text-sm">Wind</p>
                            <p className="font-semibold">{currentWeather.wind} km/h</p>
                          </div>
                          <div>
                            <CloudRain className="h-5 w-5 mx-auto mb-1 text-primary" />
                            <p className="text-sm">Rain Chance</p>
                            <p className="font-semibold">{forecast[0]?.rain || '0%'}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 5-Day Forecast */}
                <div className="max-w-6xl mx-auto mb-12">
                  <h2 className="text-2xl font-bold mb-6">5-Day Forecast</h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {forecast.map((day) => {
                      const IconComponent = getWeatherIcon(day.icon);
                      return (
                        <Card key={day.day} className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">{day.day}</CardTitle>
                            <CardDescription>{day.condition}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <IconComponent className="h-8 w-8 mx-auto mb-2 text-secondary" />
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
                      );
                    })}
                  </div>
                </div>
              </>
            )}

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

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Sprout, Droplets, Sun, AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const FarmingCalendar = () => {
  const months = [
    {
      name: "January - March",
      season: "Long Rains",
      activities: [
        { crop: "Maize", activity: "Plant early variety", priority: "high" },
        { crop: "Beans", activity: "Direct sow", priority: "high" },
        { crop: "Vegetables", activity: "Plant tomatoes & peppers", priority: "medium" },
      ],
      tips: "Prepare seedbeds before rains. Ensure proper drainage.",
    },
    {
      name: "April - June",
      season: "Long Rains Peak",
      activities: [
        { crop: "Maize", activity: "Top dressing & weeding", priority: "high" },
        { crop: "Beans", activity: "Monitor pests", priority: "medium" },
        { crop: "Sweet Potatoes", activity: "Plant vines", priority: "medium" },
      ],
      tips: "Control weeds early. Watch for fungal diseases in wet conditions.",
    },
    {
      name: "July - September",
      season: "Harvest & Dry Season",
      activities: [
        { crop: "Maize", activity: "Harvest & dry", priority: "high" },
        { crop: "Beans", activity: "Harvest & store", priority: "high" },
        { crop: "Vegetables", activity: "Irrigation required", priority: "medium" },
      ],
      tips: "Store harvested crops properly. Plan for dry season irrigation.",
    },
    {
      name: "October - December",
      season: "Short Rains",
      activities: [
        { crop: "Maize", activity: "Plant short season variety", priority: "high" },
        { crop: "Beans", activity: "Second planting", priority: "high" },
        { crop: "Vegetables", activity: "Plant leafy greens", priority: "medium" },
      ],
      tips: "Take advantage of short rains. Use quick-maturing varieties.",
    },
  ];

  const livestockCalendar = [
    {
      period: "Year-round",
      activity: "Daily milking for dairy cattle",
      icon: Calendar,
    },
    {
      period: "March & October",
      activity: "Optimal breeding season",
      icon: Sprout,
    },
    {
      period: "Dry Season",
      activity: "Supplementary feeding required",
      icon: AlertTriangle,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive";
      case "medium":
        return "bg-secondary";
      default:
        return "bg-muted";
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
                Farming Calendar
              </h1>
              <p className="text-lg text-muted-foreground">
                Plan your agricultural activities based on seasonal patterns and best practices
              </p>
            </div>

            {/* Crop Calendar */}
            <div className="max-w-6xl mx-auto mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sprout className="h-6 w-6 text-primary" />
                Crop Planting Calendar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {months.map((month) => (
                  <Card key={month.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">{month.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {month.season}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Sun className="h-3 w-3" />
                        {month.tips}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {month.activities.map((activity, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{activity.crop}</p>
                            <p className="text-xs text-muted-foreground">{activity.activity}</p>
                          </div>
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 ${getPriorityColor(
                              activity.priority
                            )}`}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Livestock Calendar */}
            <div className="max-w-6xl mx-auto mb-12">
              <h2 className="text-2xl font-bold mb-6">Livestock Management Calendar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {livestockCalendar.map((item) => (
                  <Card key={item.period} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <item.icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-base">{item.period}</CardTitle>
                      <CardDescription>{item.activity}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Reference */}
            <Card className="max-w-6xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle>Quick Planting Reference</CardTitle>
                <CardDescription>Common crops and their optimal planting times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { crop: "Maize", season: "March, October" },
                    { crop: "Beans", season: "March, October" },
                    { crop: "Wheat", season: "September" },
                    { crop: "Tomatoes", season: "March, September" },
                    { crop: "Potatoes", season: "February, August" },
                    { crop: "Cabbage", season: "Year-round" },
                    { crop: "Onions", season: "April, September" },
                    { crop: "Carrots", season: "Year-round" },
                  ].map((item) => (
                    <div key={item.crop} className="p-3 bg-card rounded-lg border">
                      <p className="font-semibold text-sm mb-1">{item.crop}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.season}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FarmingCalendar;

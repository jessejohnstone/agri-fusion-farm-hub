import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Blog = () => {
  const articles = [
    {
      title: "Modern Pest Control Techniques",
      excerpt: "Learn eco-friendly methods to protect your crops without harmful chemicals",
      date: "March 15, 2025",
      author: "Dr. Sarah Johnson",
      category: "Crops",
    },
    {
      title: "Dairy Cattle Health Management",
      excerpt: "Essential tips for maintaining healthy and productive dairy herds",
      date: "March 12, 2025",
      author: "John Smith",
      category: "Livestock",
    },
    {
      title: "Success Story: From 2 to 20 Acres",
      excerpt: "How one farmer scaled their operation using smart farming techniques",
      date: "March 10, 2025",
      author: "Mary Williams",
      category: "Success Stories",
    },
    {
      title: "Soil Health and Crop Rotation",
      excerpt: "Maximize yields through proper soil management and rotation practices",
      date: "March 8, 2025",
      author: "Dr. Michael Brown",
      category: "Crops",
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
                Knowledge Hub
              </h1>
              <p className="text-lg text-muted-foreground">
                Expert insights, success stories, and modern farming techniques
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((article) => (
                <Card key={article.title} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="text-xs font-medium text-secondary mb-2">
                      {article.category}
                    </div>
                    <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                    <CardDescription>{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {article.author}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full group">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

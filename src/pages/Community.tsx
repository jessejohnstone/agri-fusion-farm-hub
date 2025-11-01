import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Share2, Users, Tractor, MapPin, Phone, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [machineryHireListings, setMachineryHireListings] = useState<any[]>([]);
  const [newMachineryHire, setNewMachineryHire] = useState({
    machinery_name: "",
    machinery_type: "",
    description: "",
    hourly_rate: "",
    daily_rate: "",
    location: "",
    county: "",
    contact_phone: "",
  });
  const [isLoadingMachinery, setIsLoadingMachinery] = useState(false);

  const posts = [
    {
      id: 1,
      author: "John Mwangi",
      avatar: "JM",
      time: "2 hours ago",
      title: "Best time to harvest maize?",
      content: "I planted my maize 4 months ago and the kernels are starting to show. When is the optimal time to harvest for maximum yield?",
      likes: 12,
      comments: 8,
      category: "Crops",
    },
    {
      id: 2,
      author: "Mary Wanjiku",
      avatar: "MW",
      time: "5 hours ago",
      title: "Dairy farming tips needed",
      content: "Looking to expand my dairy operation. Any recommendations for high-yield dairy cattle breeds suitable for our climate?",
      likes: 18,
      comments: 15,
      category: "Livestock",
    },
    {
      id: 3,
      author: "Peter Kamau",
      avatar: "PK",
      time: "1 day ago",
      title: "Organic pest control success",
      content: "Just wanted to share my success with neem oil spray for controlling aphids. Works great and it's completely natural!",
      likes: 45,
      comments: 22,
      category: "Tips",
    },
  ];

  useEffect(() => {
    fetchMachineryHireListings();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('machinery-hire-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'machinery_hire'
        },
        (payload) => {
          console.log('Realtime event:', payload);
          
          if (payload.eventType === 'INSERT') {
            setMachineryHireListings((prev) => [payload.new as any, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setMachineryHireListings((prev) =>
              prev.map((listing) =>
                listing.id === (payload.new as any).id ? (payload.new as any) : listing
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setMachineryHireListings((prev) =>
              prev.filter((listing) => listing.id !== (payload.old as any).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMachineryHireListings = async () => {
    setIsLoadingMachinery(true);
    const { data, error } = await supabase
      .from("machinery_hire")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load machinery hire listings",
        variant: "destructive",
      });
    } else {
      setMachineryHireListings(data || []);
    }
    setIsLoadingMachinery(false);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Post Created!",
      description: "Your post has been shared with the community",
    });
    setNewPost({ title: "", content: "" });
  };

  const handleMachineryHireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to list machinery for hire",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const { error } = await supabase.from("machinery_hire").insert({
      user_id: user.id,
      machinery_name: newMachineryHire.machinery_name,
      machinery_type: newMachineryHire.machinery_type,
      description: newMachineryHire.description,
      hourly_rate: parseFloat(newMachineryHire.hourly_rate),
      daily_rate: newMachineryHire.daily_rate ? parseFloat(newMachineryHire.daily_rate) : null,
      location: newMachineryHire.location,
      county: newMachineryHire.county,
      contact_phone: newMachineryHire.contact_phone,
      available: true,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create machinery hire listing",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Listing Created!",
        description: "Your machinery is now available for hire",
      });
      setNewMachineryHire({
        machinery_name: "",
        machinery_type: "",
        description: "",
        hourly_rate: "",
        daily_rate: "",
        location: "",
        county: "",
        contact_phone: "",
      });
      // No need to manually refresh - realtime will handle it
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
                Farmer Community
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect, share knowledge, and learn from fellow farmers
              </p>
            </div>

            <Tabs defaultValue="community" className="max-w-7xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="community" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Community Posts
                </TabsTrigger>
                <TabsTrigger value="machinery" className="gap-2">
                  <Tractor className="h-4 w-4" />
                  Machinery Hire
                </TabsTrigger>
              </TabsList>

              <TabsContent value="community">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Community Stats */}
                  <div className="lg:col-span-1 space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          Community Stats
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Members</span>
                          <span className="font-bold">2,456</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Posts</span>
                          <span className="font-bold">8,932</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Active Today</span>
                          <span className="font-bold">342</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Categories</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {["Crops", "Livestock", "Equipment", "Market Prices", "Tips & Advice"].map(
                          (category) => (
                            <Button
                              key={category}
                              variant="outline"
                              className="w-full justify-start"
                            >
                              {category}
                            </Button>
                          )
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Posts Feed */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* New Post Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Share with the Community</CardTitle>
                        <CardDescription>
                          Ask questions or share your farming experiences
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handlePostSubmit} className="space-y-4">
                          <Input
                            placeholder="Post title..."
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            required
                          />
                          <Textarea
                            placeholder="What's on your mind?"
                            rows={3}
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            required
                          />
                          <Button type="submit" className="w-full">
                            Post to Community
                          </Button>
                        </form>
                      </CardContent>
                    </Card>

                    {/* Posts */}
                    {posts.map((post) => (
                      <Card key={post.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {post.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{post.author}</span>
                                <span className="text-xs text-muted-foreground">{post.time}</span>
                              </div>
                              <span className="text-xs text-secondary font-medium">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <CardTitle className="text-xl mt-3">{post.title}</CardTitle>
                          <CardDescription className="text-base">{post.content}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-6">
                            <Button variant="ghost" size="sm" className="gap-2">
                              <ThumbsUp className="h-4 w-4" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <Share2 className="h-4 w-4" />
                              Share
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="machinery">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Machinery Hire Form */}
                  <div className="lg:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Tractor className="h-5 w-5 text-primary" />
                          List Your Machinery
                        </CardTitle>
                        <CardDescription>
                          Make your equipment available for hire
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleMachineryHireSubmit} className="space-y-4">
                          <Input
                            placeholder="Machinery name..."
                            value={newMachineryHire.machinery_name}
                            onChange={(e) =>
                              setNewMachineryHire({ ...newMachineryHire, machinery_name: e.target.value })
                            }
                            required
                          />
                          <Input
                            placeholder="Type (e.g., Tractor, Harvester)..."
                            value={newMachineryHire.machinery_type}
                            onChange={(e) =>
                              setNewMachineryHire({ ...newMachineryHire, machinery_type: e.target.value })
                            }
                            required
                          />
                          <Textarea
                            placeholder="Description..."
                            rows={3}
                            value={newMachineryHire.description}
                            onChange={(e) =>
                              setNewMachineryHire({ ...newMachineryHire, description: e.target.value })
                            }
                          />
                          <Input
                            type="number"
                            placeholder="Hourly rate (KES)..."
                            value={newMachineryHire.hourly_rate}
                            onChange={(e) =>
                              setNewMachineryHire({ ...newMachineryHire, hourly_rate: e.target.value })
                            }
                            required
                          />
                          <Input
                            type="number"
                            placeholder="Daily rate (KES, optional)..."
                            value={newMachineryHire.daily_rate}
                            onChange={(e) =>
                              setNewMachineryHire({ ...newMachineryHire, daily_rate: e.target.value })
                            }
                          />
                          <Input
                            placeholder="Location..."
                            value={newMachineryHire.location}
                            onChange={(e) =>
                              setNewMachineryHire({ ...newMachineryHire, location: e.target.value })
                            }
                            required
                          />
                          <Input
                            placeholder="County..."
                            value={newMachineryHire.county}
                            onChange={(e) =>
                              setNewMachineryHire({ ...newMachineryHire, county: e.target.value })
                            }
                            required
                          />
                          <Input
                            placeholder="Contact phone..."
                            value={newMachineryHire.contact_phone}
                            onChange={(e) =>
                              setNewMachineryHire({ ...newMachineryHire, contact_phone: e.target.value })
                            }
                          />
                          <Button type="submit" className="w-full">
                            List Machinery
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Machinery Hire Listings */}
                  <div className="lg:col-span-2 space-y-6">
                    {isLoadingMachinery ? (
                      <Card>
                        <CardContent className="py-12 text-center">
                          <p className="text-muted-foreground">Loading machinery listings...</p>
                        </CardContent>
                      </Card>
                    ) : machineryHireListings.length === 0 ? (
                      <Card>
                        <CardContent className="py-12 text-center">
                          <Tractor className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">
                            No machinery available for hire yet. Be the first to list!
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      machineryHireListings.map((listing) => (
                        <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-xl flex items-center gap-2">
                                  {listing.machinery_name}
                                  {listing.available && (
                                    <Badge variant="default" className="text-xs">
                                      Available
                                    </Badge>
                                  )}
                                </CardTitle>
                                <Badge variant="secondary" className="mt-2">
                                  {listing.machinery_type}
                                </Badge>
                              </div>
                            </div>
                            {listing.description && (
                              <CardDescription className="text-base mt-3">
                                {listing.description}
                              </CardDescription>
                            )}
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="h-4 w-4 text-primary" />
                              <span className="font-semibold">KES {listing.hourly_rate}/hour</span>
                              {listing.daily_rate && (
                                <span className="text-muted-foreground">
                                  • KES {listing.daily_rate}/day
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {listing.location}, {listing.county}
                            </div>
                            {listing.contact_phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-primary" />
                                <a
                                  href={`tel:${listing.contact_phone}`}
                                  className="font-medium hover:underline"
                                >
                                  {listing.contact_phone}
                                </a>
                              </div>
                            )}
                            <div className="pt-2">
                              <Button className="w-full">Contact Owner</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Community;

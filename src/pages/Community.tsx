import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Share2, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Community = () => {
  const { toast } = useToast();
  const [newPost, setNewPost] = useState({ title: "", content: "" });

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

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Post Created!",
      description: "Your post has been shared with the community",
    });
    setNewPost({ title: "", content: "" });
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Community;

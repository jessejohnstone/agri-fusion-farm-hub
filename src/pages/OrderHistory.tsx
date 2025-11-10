import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  status: string;
}

interface Order {
  id: string;
  buyer_name: string;
  delivery_address: string;
  delivery_phone: string;
  total_amount: number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<{ orderId: string; productId: string; productName: string } | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items(*)
        `)
        .eq("buyer_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "Failed to load your orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!selectedProduct) return;

    setSubmittingReview(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("product_reviews").insert({
        product_id: selectedProduct.productId,
        buyer_id: user.id,
        order_id: selectedProduct.orderId,
        rating,
        review_text: reviewText,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Review submitted successfully",
      });

      setSelectedProduct(null);
      setRating(5);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setSubmittingReview(false);
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
                Order History
              </h1>
              <p className="text-lg text-muted-foreground">
                View your past orders and leave reviews
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : orders.length === 0 ? (
              <Card className="p-12 text-center">
                <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No orders yet</p>
              </Card>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                          <CardDescription>
                            {new Date(order.created_at).toLocaleDateString()} • {order.order_items?.length || 0} items
                          </CardDescription>
                        </div>
                        <Badge variant={order.status === "pending" ? "secondary" : "default"}>
                          {order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Delivery Details</h4>
                          <p className="text-sm text-muted-foreground">{order.buyer_name}</p>
                          <p className="text-sm text-muted-foreground">{order.delivery_phone}</p>
                          <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Items</h4>
                          <div className="space-y-2">
                            {order.order_items?.map((item) => (
                              <div key={item.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <div className="flex-1">
                                  <p className="font-medium">{item.product_name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Quantity: {item.quantity} @ KSh {item.unit_price.toLocaleString()}
                                  </p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <p className="font-bold text-primary">
                                    KSh {item.subtotal.toLocaleString()}
                                  </p>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedProduct({
                                          orderId: order.id,
                                          productId: item.product_id,
                                          productName: item.product_name,
                                        })}
                                      >
                                        <Star className="mr-2 h-4 w-4" />
                                        Review
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Review Product</DialogTitle>
                                        <DialogDescription>
                                          Share your experience with {selectedProduct?.productName}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div>
                                          <Label>Rating</Label>
                                          <div className="flex gap-2 mt-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                              <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className="focus:outline-none"
                                              >
                                                <Star
                                                  className={`h-6 w-6 ${
                                                    star <= rating
                                                      ? "fill-yellow-400 text-yellow-400"
                                                      : "text-muted-foreground"
                                                  }`}
                                                />
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                        <div>
                                          <Label htmlFor="review">Review (optional)</Label>
                                          <Textarea
                                            id="review"
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                            placeholder="Share your thoughts about this product..."
                                          />
                                        </div>
                                        <Button
                                          onClick={handleSubmitReview}
                                          disabled={submittingReview}
                                          className="w-full"
                                        >
                                          Submit Review
                                        </Button>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">Total Amount</span>
                            <span className="text-xl font-bold text-primary">
                              KSh {order.total_amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OrderHistory;

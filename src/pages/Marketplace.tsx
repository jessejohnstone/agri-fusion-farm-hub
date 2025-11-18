import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingBag, ShoppingCart, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  unit: string;
  image_url: string | null;
  stock_quantity: number;
  available: boolean;
  seller_id: string;
  rating?: number;
  review_count?: number;
}

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("marketplace_products")
        .select("*")
        .eq("available", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch ratings for each product
      const productsWithRatings = await Promise.all(
        (data || []).map(async (product) => {
          const { data: reviews } = await supabase
            .from("product_reviews")
            .select("rating")
            .eq("product_id", product.id);

          const rating = reviews && reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

          return {
            ...product,
            rating,
            review_count: reviews?.length || 0,
          };
        })
      );

      setProducts(productsWithRatings);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return categoryMatch && searchMatch;
  });

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setOrderDialogOpen(true);
    setOrderForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      quantity: 1,
      notes: "",
    });
  };

  const handleQuickOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) return;

    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to place an order",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const totalAmount = selectedProduct.price * orderForm.quantity;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          buyer_id: user.id,
          total_amount: totalAmount,
          buyer_name: orderForm.name,
          buyer_email: orderForm.email,
          delivery_phone: orderForm.phone,
          delivery_address: orderForm.address,
          notes: orderForm.notes,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order item
      const { error: itemError } = await supabase
        .from("order_items")
        .insert({
          order_id: order.id,
          product_id: selectedProduct.id,
          seller_id: selectedProduct.seller_id,
          product_name: selectedProduct.name,
          quantity: orderForm.quantity,
          unit_price: selectedProduct.price,
          subtotal: totalAmount,
        });

      if (itemError) throw itemError;

      toast({
        title: "Order placed successfully!",
        description: "Your order has been received and is being processed",
      });

      setOrderDialogOpen(false);
      setSelectedProduct(null);
    } catch (error: any) {
      toast({
        title: "Error placing order",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
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
                Marketplace
              </h1>
              <p className="text-lg text-muted-foreground">
                Buy and sell agricultural products, livestock, and farming equipment
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, livestock, equipment..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="relative"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart
                {cartItemCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="crops">Crops</SelectItem>
                  <SelectItem value="livestock">Livestock Products</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No products found</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square bg-muted rounded-md mb-4 overflow-hidden">
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {product.rating && product.rating > 0 ? (
                          <>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                            <span className="text-sm text-muted-foreground">({product.review_count})</span>
                          </>
                        ) : (
                          <span className="text-sm text-muted-foreground">No reviews yet</span>
                        )}
                      </div>
                      <p className="text-2xl font-bold text-primary mb-1">
                        KSh {product.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">per {product.unit}</p>
                      {product.stock_quantity > 0 ? (
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => addToCart(product.id)}
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                          <Button 
                            variant="default" 
                            className="flex-1"
                            onClick={() => handleBuyNow(product)}
                          >
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Buy Now
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline" className="w-full" disabled>
                          Out of Stock
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Become a Seller</h2>
                <p className="text-muted-foreground mb-6">
                  List your agricultural products and reach thousands of buyers
                </p>
                <Button variant="hero" size="lg">
                  Start Selling Today
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quick Order</DialogTitle>
            <DialogDescription>
              Complete the form below to place your order for {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleQuickOrder} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="order-name">Full Name *</Label>
              <Input
                id="order-name"
                required
                value={orderForm.name}
                onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-email">Email *</Label>
              <Input
                id="order-email"
                type="email"
                required
                value={orderForm.email}
                onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-phone">Phone Number *</Label>
              <Input
                id="order-phone"
                type="tel"
                required
                value={orderForm.phone}
                onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                placeholder="+254..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-address">Delivery Address *</Label>
              <Textarea
                id="order-address"
                required
                value={orderForm.address}
                onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                placeholder="Enter your delivery address"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-quantity">Quantity *</Label>
              <Input
                id="order-quantity"
                type="number"
                min="1"
                max={selectedProduct?.stock_quantity || 1}
                required
                value={orderForm.quantity}
                onChange={(e) => setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-notes">Additional Notes (Optional)</Label>
              <Textarea
                id="order-notes"
                value={orderForm.notes}
                onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                placeholder="Any special instructions..."
                rows={2}
              />
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  KSh {((selectedProduct?.price || 0) * orderForm.quantity).toLocaleString()}
                </span>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Marketplace;

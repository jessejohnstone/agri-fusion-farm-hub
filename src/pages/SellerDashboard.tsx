import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Plus, ShoppingBag, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  unit: string;
  stock_quantity: number;
  available: boolean;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  status: string;
  orders: {
    buyer_name: string;
    delivery_address: string;
    delivery_phone: string;
    created_at: string;
  };
}

const SellerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const { toast } = useToast();

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "crops",
    price: "",
    unit: "kg",
    stock_quantity: "",
  });

  useEffect(() => {
    fetchSellerData();
  }, []);

  const fetchSellerData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch seller's products
      const { data: productsData, error: productsError } = await supabase
        .from("marketplace_products")
        .select("*")
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });

      if (productsError) throw productsError;
      setProducts(productsData || []);

      // Fetch orders for seller's products
      const { data: ordersData, error: ordersError } = await supabase
        .from("order_items")
        .select(`
          *,
          orders(buyer_name, delivery_address, delivery_phone, created_at)
        `)
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);
    } catch (error) {
      console.error("Error fetching seller data:", error);
      toast({
        title: "Error",
        description: "Failed to load your dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to add products",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("marketplace_products").insert({
        seller_id: user.id,
        name: newProduct.name,
        description: newProduct.description,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        unit: newProduct.unit,
        stock_quantity: parseInt(newProduct.stock_quantity),
        available: true,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product added successfully",
      });

      setShowAddProduct(false);
      setNewProduct({
        name: "",
        description: "",
        category: "crops",
        price: "",
        unit: "kg",
        stock_quantity: "",
      });
      fetchSellerData();
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    }
  };

  const toggleProductAvailability = async (productId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("marketplace_products")
        .update({ available: !currentStatus })
        .eq("id", productId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Product ${!currentStatus ? "enabled" : "disabled"}`,
      });
      fetchSellerData();
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.subtotal.toString()), 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Seller Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage your products and view orders
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{products.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{pendingOrders}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">KSh {totalRevenue.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="products" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                  </TabsList>

                  <TabsContent value="products">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Your Products</CardTitle>
                          <Button onClick={() => setShowAddProduct(!showAddProduct)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {showAddProduct && (
                          <form onSubmit={handleAddProduct} className="mb-6 p-4 border rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                  id="name"
                                  required
                                  value={newProduct.name}
                                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="category">Category</Label>
                                <Select
                                  value={newProduct.category}
                                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="crops">Crops</SelectItem>
                                    <SelectItem value="livestock">Livestock Products</SelectItem>
                                    <SelectItem value="equipment">Equipment</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="price">Price (KSh)</Label>
                                <Input
                                  id="price"
                                  type="number"
                                  step="0.01"
                                  required
                                  value={newProduct.price}
                                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="unit">Unit</Label>
                                <Input
                                  id="unit"
                                  required
                                  value={newProduct.unit}
                                  onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                                  placeholder="e.g., kg, litre, piece"
                                />
                              </div>
                              <div>
                                <Label htmlFor="stock">Stock Quantity</Label>
                                <Input
                                  id="stock"
                                  type="number"
                                  required
                                  value={newProduct.stock_quantity}
                                  onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: e.target.value })}
                                />
                              </div>
                              <div className="md:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  value={newProduct.description}
                                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button type="submit">Add Product</Button>
                              <Button type="button" variant="outline" onClick={() => setShowAddProduct(false)}>
                                Cancel
                              </Button>
                            </div>
                          </form>
                        )}

                        <div className="space-y-4">
                          {products.map((product) => (
                            <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex-1">
                                <h4 className="font-semibold">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">{product.description}</p>
                                <div className="flex gap-2 mt-2">
                                  <Badge variant="outline">{product.category}</Badge>
                                  <Badge variant="outline">Stock: {product.stock_quantity}</Badge>
                                  <Badge variant={product.available ? "default" : "destructive"}>
                                    {product.available ? "Available" : "Disabled"}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-lg font-bold text-primary">KSh {product.price.toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground">per {product.unit}</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => toggleProductAvailability(product.id, product.available)}
                                >
                                  {product.available ? "Disable" : "Enable"}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="orders">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Orders containing your products</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <div key={order.id} className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-semibold">{order.product_name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Buyer: {order.orders.buyer_name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Phone: {order.orders.delivery_phone}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Address: {order.orders.delivery_address}
                                  </p>
                                </div>
                                <Badge variant={order.status === "pending" ? "secondary" : "default"}>
                                  {order.status}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <p className="text-sm">
                                  Quantity: {order.quantity} @ KSh {order.unit_price.toLocaleString()}
                                </p>
                                <p className="font-bold text-primary">
                                  KSh {order.subtotal.toLocaleString()}
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(order.orders.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SellerDashboard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Upload, Loader2, Trash2 } from "lucide-react";

const EquipmentUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userCounty, setUserCounty] = useState<string>("");
  const [myEquipment, setMyEquipment] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    fetchUserData();
    fetchMyEquipment();
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("location")
        .eq("user_id", user.id)
        .single();
      
      if (profile?.location) {
        setUserCounty(profile.location);
      }
    }
  };

  const fetchMyEquipment = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("farm_equipment_uploads")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setMyEquipment(data);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File, userId: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Math.random()}.${fileExt}`;
    
    const { error: uploadError, data } = await supabase.storage
      .from('equipment-images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('equipment-images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      if (!imageFile) {
        toast({
          title: "Image required",
          description: "Please select an image of your equipment",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setUploading(true);
      const imageUrl = await uploadImage(imageFile, user.id);
      setUploading(false);

      const formData = new FormData(e.currentTarget);
      const equipmentData = {
        user_id: user.id,
        equipment_name: formData.get("equipment_name") as string,
        equipment_type: formData.get("equipment_type") as string,
        description: formData.get("description") as string,
        county: userCounty,
        price: parseFloat(formData.get("price") as string) || null,
        contact_phone: formData.get("contact_phone") as string,
        image_url: imageUrl,
      };

      const { error } = await supabase
        .from("farm_equipment_uploads")
        .insert([equipmentData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your equipment has been listed successfully.",
      });

      // Reset form
      e.currentTarget.reset();
      setImageFile(null);
      setImagePreview("");
      fetchMyEquipment();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from("farm_equipment_uploads")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      // Delete image from storage
      const filePath = imageUrl.split('/equipment-images/')[1];
      if (filePath) {
        await supabase.storage
          .from('equipment-images')
          .remove([filePath]);
      }

      toast({
        title: "Deleted",
        description: "Equipment listing removed successfully.",
      });

      fetchMyEquipment();
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Upload Farm Equipment</h1>
            <p className="text-muted-foreground">
              Share your farm equipment with farmers in {userCounty || "your area"}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>List Your Equipment</CardTitle>
              <CardDescription>
                Fill in the details below to list your farm equipment for sale or rent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="equipment_name">Equipment Name *</Label>
                  <Input
                    id="equipment_name"
                    name="equipment_name"
                    placeholder="e.g., John Deere Tractor"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equipment_type">Equipment Type *</Label>
                  <select
                    id="equipment_type"
                    name="equipment_type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Plowing">Plowing</option>
                    <option value="Planting">Planting</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Harvesting">Harvesting</option>
                    <option value="Livestock">Livestock</option>
                    <option value="Crop Protection">Crop Protection</option>
                    <option value="Post-Harvest">Post-Harvest</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the condition, age, and features of your equipment..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (KES) - Optional</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="50000"
                    min="0"
                    step="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Contact Phone *</Label>
                  <Input
                    id="contact_phone"
                    name="contact_phone"
                    type="tel"
                    placeholder="+254-712-345-678"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Equipment Photo *</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-md rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={loading || uploading}>
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading image...
                    </>
                  ) : loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Equipment
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {myEquipment.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">My Equipment Listings</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {myEquipment.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <img
                        src={item.image_url}
                        alt={item.equipment_name}
                        className="w-full h-48 object-cover rounded-lg mb-2"
                      />
                      <CardTitle>{item.equipment_name}</CardTitle>
                      <CardDescription>{item.equipment_type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.description}
                      </p>
                      {item.price && (
                        <p className="font-semibold text-lg mb-2">
                          KES {item.price.toLocaleString()}
                        </p>
                      )}
                      <p className="text-sm mb-2">📞 {item.contact_phone}</p>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id, item.image_url)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EquipmentUpload;

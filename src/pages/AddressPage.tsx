import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ShopHeader from '@/components/shop/ShopHeader';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

const AddressPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    pincode: '',
    city: '',
    state: '',
    houseNo: '',
    roadArea: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = () => {
    // Navigate to order summary with product and address info
    const addressQuery = encodeURIComponent(JSON.stringify(formData));
    navigate(`/order-summary?productId=${productId}&address=${addressQuery}`);
  };

  const isFormValid =
    formData.fullName &&
    formData.mobile &&
    formData.pincode &&
    formData.city &&
    formData.state &&
    formData.houseNo;

  return (
    <div className="min-h-screen bg-background">
      <ShopHeader />
      <CheckoutSteps currentStep={1} />

      <main className="pb-28">
        {/* Header */}
        <div className="container py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Add delivery address
          </button>
        </div>

        {/* Form */}
        <div className="container">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-sm text-muted-foreground">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="mobile" className="text-sm text-muted-foreground">Mobile number</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Mobile number"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="pincode" className="text-sm text-muted-foreground">Pincode</Label>
              <Input
                id="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="text-sm text-muted-foreground">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-sm text-muted-foreground">State</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleInputChange('state', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="houseNo" className="text-sm text-muted-foreground">House No., Building Name</Label>
              <Input
                id="houseNo"
                placeholder="House No., Building Name"
                value={formData.houseNo}
                onChange={(e) => handleInputChange('houseNo', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="roadArea" className="text-sm text-muted-foreground">Road name, Area, Colony</Label>
              <Input
                id="roadArea"
                placeholder="Road name, Area, Colony"
                value={formData.roadArea}
                onChange={(e) => handleInputChange('roadArea', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container">
          <Button
            variant="gradient"
            size="xl"
            className="w-full"
            disabled={!isFormValid}
            onClick={handleSaveAddress}
          >
            Save Address
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;

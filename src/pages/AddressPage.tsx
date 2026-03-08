import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
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
import { Loader2 } from 'lucide-react';

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
  const [pincodeLoading, setPincodeLoading] = useState(false);

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

  const handlePincodeChange = async (value: string) => {
    // Only allow digits, max 6
    const cleaned = value.replace(/\D/g, '').slice(0, 6);
    handleInputChange('pincode', cleaned);

    if (cleaned.length === 6) {
      setPincodeLoading(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${cleaned}`);
        const data = await res.json();
        if (data?.[0]?.Status === 'Success' && data[0].PostOffice?.length > 0) {
          const po = data[0].PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            pincode: cleaned,
            city: po.District || po.Name || '',
            state: po.State || '',
          }));
        }
      } catch {
        // silently fail, user can fill manually
      } finally {
        setPincodeLoading(false);
      }
    }
  };

  const handleSaveAddress = () => {
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
      <CheckoutHeader title="Add delivery address" />
      <CheckoutSteps currentStep={1} />

      <main className="pb-28">

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
              <div className="relative">
                <Input
                  id="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  className="mt-1"
                  inputMode="numeric"
                  maxLength={6}
                />
                {pincodeLoading && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground mt-0.5" />
                )}
              </div>
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

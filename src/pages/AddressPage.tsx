import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import { Button } from '@/components/ui/button';
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
        // silently fail
      } finally {
        setPincodeLoading(false);
      }
    }
  };

  const handleSaveAddress = () => {
    const addressQuery = encodeURIComponent(JSON.stringify(formData));
    navigate(`/order-summary?productId=${productId}&address=${addressQuery}`);
  };

  const isFormValid = true;

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader title="Add delivery address" />
      <CheckoutSteps currentStep={1} />

      <main className="pb-28 px-4 pt-4">
        <div className="space-y-4">
          {/* Full Name */}
          <div className="border border-border bg-card">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>

          {/* Mobile */}
          <div className="border border-border bg-card">
            <input
              type="tel"
              placeholder="Mobile number"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              className="w-full bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>

          {/* Pincode */}
          <div className="border border-border bg-card relative">
            <input
              type="text"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) => handlePincodeChange(e.target.value)}
              inputMode="numeric"
              maxLength={6}
              className="w-full bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {pincodeLoading && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>

          {/* City & State */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card">
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            <Select
              value={formData.state}
              onValueChange={(value) => handleInputChange('state', value)}
            >
              <SelectTrigger className="h-auto py-4 px-4 rounded-lg border-border bg-card text-sm">
                <SelectValue placeholder="State" />
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

          {/* House No */}
          <div className="rounded-lg border border-border bg-card">
            <input
              type="text"
              placeholder="House No., Building Name"
              value={formData.houseNo}
              onChange={(e) => handleInputChange('houseNo', e.target.value)}
              className="w-full bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>

          {/* Road Area */}
          <div className="rounded-lg border border-border bg-card">
            <input
              type="text"
              placeholder="Road name, Area, Colony"
              value={formData.roadArea}
              onChange={(e) => handleInputChange('roadArea', e.target.value)}
              className="w-full bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
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

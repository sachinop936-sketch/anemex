import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import { Loader2, ChevronDown } from 'lucide-react';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';

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
  const [stateOpen, setStateOpen] = useState(false);

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
    console.log('Address data:', formData);
    const addressQuery = encodeURIComponent(JSON.stringify(formData));
    navigate(`/order-summary?productId=${productId}&address=${addressQuery}`);
  };

  return (
    <div className="min-h-screen bg-[hsl(220,20%,96%)] flex flex-col">
      <CheckoutHeader title="Add delivery address" />

      {/* Checkout Steps */}
      <CheckoutSteps currentStep={1} />

      {/* Form Card */}
      <div className="flex-1 px-4 py-4 pb-28">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-base font-bold text-[hsl(0,0%,13%)] mb-5">Delivery Details</h2>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full h-14 px-4 rounded-xl border border-[hsl(220,13%,85%)] bg-white text-base text-[hsl(0,0%,13%)] placeholder:text-[hsl(220,10%,62%)] focus:outline-none focus:border-[hsl(217,89%,55%)] transition-colors"
              />
            </div>

            {/* Mobile */}
            <div>
              <input
                type="tel"
                placeholder="Mobile number"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                className="w-full h-14 px-4 rounded-xl border border-[hsl(220,13%,85%)] bg-white text-base text-[hsl(0,0%,13%)] placeholder:text-[hsl(220,10%,62%)] focus:outline-none focus:border-[hsl(217,89%,55%)] transition-colors"
              />
            </div>

            {/* Pincode */}
            <div className="relative">
              <input
                type="text"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={(e) => handlePincodeChange(e.target.value)}
                inputMode="numeric"
                maxLength={6}
                className="w-full h-14 px-4 rounded-xl border border-[hsl(220,13%,85%)] bg-white text-base text-[hsl(0,0%,13%)] placeholder:text-[hsl(220,10%,62%)] focus:outline-none focus:border-[hsl(217,89%,55%)] transition-colors"
              />
              {pincodeLoading && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-[hsl(220,10%,62%)]" />
              )}
            </div>

            {/* City + State Row */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full h-14 px-4 rounded-xl border border-[hsl(220,13%,85%)] bg-white text-base text-[hsl(0,0%,13%)] placeholder:text-[hsl(220,10%,62%)] focus:outline-none focus:border-[hsl(217,89%,55%)] transition-colors"
              />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setStateOpen(!stateOpen)}
                  className="w-full h-14 px-4 rounded-xl border border-[hsl(220,13%,85%)] bg-white text-left flex items-center justify-between focus:outline-none focus:border-[hsl(217,89%,55%)] transition-colors"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-[hsl(220,10%,62%)] leading-tight">State</span>
                    <span className={`text-sm truncate ${formData.state ? 'text-[hsl(0,0%,13%)]' : 'text-[hsl(220,10%,62%)]'}`}>
                      {formData.state || 'Select'}
                    </span>
                  </div>
                  <ChevronDown className="h-5 w-5 text-[hsl(220,10%,62%)] shrink-0 ml-1" />
                </button>

                {stateOpen && (
                  <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-white border border-[hsl(220,13%,85%)] rounded-xl shadow-lg max-h-52 overflow-y-auto">
                    {indianStates.map((state) => (
                      <button
                        key={state}
                        type="button"
                        onClick={() => {
                          handleInputChange('state', state);
                          setStateOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[hsl(220,20%,96%)] transition-colors ${
                          formData.state === state ? 'bg-[hsl(217,89%,95%)] text-[hsl(217,89%,55%)] font-medium' : 'text-[hsl(0,0%,13%)]'
                        }`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* House No */}
            <div>
              <input
                type="text"
                placeholder="House No., Building Name"
                value={formData.houseNo}
                onChange={(e) => handleInputChange('houseNo', e.target.value)}
                className="w-full h-14 px-4 rounded-xl border border-[hsl(220,13%,85%)] bg-white text-base text-[hsl(0,0%,13%)] placeholder:text-[hsl(220,10%,62%)] focus:outline-none focus:border-[hsl(217,89%,55%)] transition-colors"
              />
            </div>

            {/* Road Area */}
            <div>
              <input
                type="text"
                placeholder="Road name, Area, Colony"
                value={formData.roadArea}
                onChange={(e) => handleInputChange('roadArea', e.target.value)}
                className="w-full h-14 px-4 rounded-xl border border-[hsl(220,13%,85%)] bg-white text-base text-[hsl(0,0%,13%)] placeholder:text-[hsl(220,10%,62%)] focus:outline-none focus:border-[hsl(217,89%,55%)] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[hsl(220,13%,90%)] p-4 safe-bottom">
        <button
          onClick={handleSaveAddress}
          className="w-full h-14 rounded-2xl bg-[hsl(40,100%,55%)] hover:bg-[hsl(40,100%,50%)] text-[hsl(0,0%,10%)] font-bold text-base transition-colors active:scale-[0.98]"
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default AddressPage;

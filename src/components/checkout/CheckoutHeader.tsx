import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckoutHeaderProps {
  title: string;
}

const CheckoutHeader = ({ title }: CheckoutHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-[hsl(217,89%,50%)] to-[hsl(217,89%,60%)] text-white px-4 py-4 flex items-center gap-3">
      <button onClick={() => navigate(-1)} className="p-0">
        <ArrowLeft className="h-6 w-6 text-white" />
      </button>
      <h1 className="text-lg font-bold">{title}</h1>
    </div>
  );
};

export default CheckoutHeader;

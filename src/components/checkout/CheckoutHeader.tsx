import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckoutHeaderProps {
  title: string;
}

const CheckoutHeader = ({ title }: CheckoutHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: 'linear-gradient(135deg, hsl(217, 89%, 50%), hsl(217, 89%, 60%))' }}>
      <div className="container flex items-center gap-3 h-14">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="text-base font-bold text-white">{title}</h1>
      </div>
    </header>
  );
};

export default CheckoutHeader;

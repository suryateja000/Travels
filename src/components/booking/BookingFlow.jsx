import { useState } from 'react';
import ProgressBar        from './ProgressBar';
import BookingSearch      from './BookingSearch';
import BusList            from './BusList';
import PassengerDetails   from './PassengerDetails';
import PaymentPage        from './PaymentPage';
import BookingConfirmed   from './BookingConfirmed';

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  
  // We use a single object to accumulate all booking data as the user progresses
  const [bookingData, setBookingData] = useState(null);

  // STEP 0 -> 1: User completes search
  const handleSearch = (searchParams) => {
    // searchParams = { from: '...', to: '...', date: '...' }
    setBookingData({ searchParams });
    setStep(1);
  };

  // STEP 1 -> 2: User selects bus and seats
  const handleBusCheckout = (dataFromBusList) => {
    // dataFromBusList = { searchParams, bus, seats, totalFare, boarding }
    if (!dataFromBusList) { 
      setStep(0); 
      return; 
    }
    setBookingData(dataFromBusList);
    setStep(2);
  };

  // STEP 2 -> 3: User enters passenger details
  const handlePassengerConfirm = (dataFromPassengerDetails) => {
    // dataFromPassengerDetails = { ...previousData, passengerInfo: { name, age, gender... } }
    setBookingData(dataFromPassengerDetails);
    setStep(3);
  };

  // STEP 3 -> 4: User completes payment
  const handlePaymentConfirm = (paymentResult) => {
    // Add payment confirmation/transaction ID to the final booking data
    setBookingData(prevData => ({ ...prevData, paymentResult }));
    setStep(4);
  };

  // Reset Flow
  const handleReset = () => {
    setBookingData(null);
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#111827] font-sans selection:bg-[#0033FF] selection:text-white">
      {/* Optional Progress Bar (Make sure to pass currentStep if you uncomment) */}
      {/* {step > 0 && step < 4 && <ProgressBar currentStep={step} />} */}
      
      <div className="animate-in fade-in duration-700 ease-out">
        
        {step === 0 && (
          <BookingSearch 
            onSearch={handleSearch} 
          />
        )}

        {step === 1 && (
          <BusList
            searchParams={bookingData?.searchParams}
            onCheckout={handleBusCheckout}
            onBack={() => setStep(0)} // Optional: If you add a back button to BusList
          />
        )}

        {step === 2 && (
          <PassengerDetails
            bookingData={bookingData}
            onConfirm={handlePassengerConfirm}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <PaymentPage
            bookingData={bookingData}
            onConfirm={handlePaymentConfirm}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <BookingConfirmed
            bookingData={bookingData}
            onReset={handleReset}
          />
        )}
        
      </div>
    </div>
  );
}
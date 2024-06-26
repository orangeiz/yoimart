
import { useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import FormError from '../forms/form-error';
import FormSuccess from '../forms/form-success';
interface SendOTPProps {
  email: string;
  phone: string;
  purpose: string;
  onOtpSent: (sent: boolean) => void;
  onResendOTP: () => void;
}

 export const SendOTP = ({ email, phone, purpose, onOtpSent, onResendOTP }: SendOTPProps) => {
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  const sendOtp = async () => {
    setFormError('');
    try {
      await axios.post('/api/send-otp', { email, phone, purpose });
      setFormSuccess('OTP has been sent');
      onOtpSent(true);
    } catch (error: any) {
      setFormError(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <Button onClick={sendOtp}>Send OTP</Button>
      <Button onClick={onResendOTP}>Resend OTP</Button>
      <div className="py-5">
        {formError && <FormError message={formError} />}
        {formSuccess && <FormSuccess message={formSuccess} />}
      </div>
    </div>
  );
};

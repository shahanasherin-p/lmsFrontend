import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { captureAndFinalizePaymentAPI } from '@/services/allAPI';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const PaymentReturn = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
        const capturePayment=async() =>{
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

        const response = await captureAndFinalizePaymentAPI(
          paymentId,
          payerId,
          orderId
        );

        if (response?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/student-courses";
        }
      }

      capturePayment();
    }
  }, [payerId, paymentId]);

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Processing payment... Please wait</CardTitle>
      </CardHeader>
    </Card>
    </>
  )
}

export default PaymentReturn
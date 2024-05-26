"use client";
import { useState } from "react";
import ClientInfoForm from "./ClientInfoForm";
import PaymentMethodForm from "./PaymentMethodForm";

const CheckoutController = () => {
  const [stepOne, setStepOne] = useState(true);
  const [formData, setFormData] = useState(null);

  return (
    <div className="w-full">
      {stepOne && (
        <ClientInfoForm
          onUpdateStep={setStepOne}
          onCollectFormData={setFormData}
          stepOne={stepOne}
        />
      )}
      {!stepOne && (
        <PaymentMethodForm
          onUpdateStep={setStepOne}
          stepOne={stepOne}
          clientData={formData}
        />
      )}
    </div>
  );
};

export default CheckoutController;

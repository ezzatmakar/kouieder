"use client"
import { INPUT_CLASSES, LABEL_CLASSES } from "@/app/commonUIClasses";
import { forgotPassword } from "@/app/utils/account";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Button from "../Button";

type ForgotPasswordResponse = {
    status: string;
    msg: string;
    reset_key?: string;
};

export default function ForgotForm() {
    const t = useTranslations();
    const [isSend, setIsSend] = useState(false);
    const [formData, setFormData] = useState({
        emailAddress: ''
    });
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const [errors, setErrors] = useState({
        emailAddress: ''
    });
    const isValidEmail = (email: any) => {
        const trimmedEmail = email.trim();
        if (trimmedEmail === '') {
            return false;
        }
        const parts = trimmedEmail.split('@');
        if (parts.length !== 2) {
            return false;
        }
        const [localPart, domainPart] = parts;
        if (localPart === '' || domainPart === '') {
            return false;
        }
        if (!domainPart.includes('.')) {
            return false;
        }
        return true;
    };
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            emailAddress: '',
        }
        if (formData.emailAddress.trim() === '') {
            newErrors.emailAddress = t('email_address_required');
            isValid = false;
        } else if (!isValidEmail(formData.emailAddress)) {
            newErrors.emailAddress = t('email_address_format');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await forgotPassword(formData.emailAddress) as ForgotPasswordResponse;
                if (response && response.status === "error") {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        emailAddress: response.msg,
                    }));
                } else if (response && response.status === "success") {
                    console.log("Password reset email sent successfully");
                    console.log("Reset Key:", response.reset_key);
                    setIsSend(true);
                }
            } catch (error) {
                console.log("An error occurred while calling forgotPassword API:", error);
            }
        }
    };

    return (
        <div>
            {isSend ?
                <p className="text-base text-gray-900">{t('common.forgot_email_sent')}</p>
                :
                <form onSubmit={handleSubmit}>
                    <p className={LABEL_CLASSES}>{t('common.enter_your_email')}</p>
                    <div className="mb-6">
                        <input
                            type="email"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            required
                            className={`${INPUT_CLASSES} ${errors.emailAddress && 'border-red-500'}`}
                        />
                        {errors.emailAddress && <p className="mt-1 text-xs text-red-500">{errors.emailAddress === 'This E-mail is not registered' ? t('fields.email_not_registered') : errors.emailAddress}</p>}
                    </div>
                    <div className="mb-10">
                        <Button
                            name={t('common.forgot_btn')}
                            width="full"
                            extraclass="mt-5 leading-5"
                            type="submit"
                        />
                    </div>
                </form>
            }
        </div>
    )
}

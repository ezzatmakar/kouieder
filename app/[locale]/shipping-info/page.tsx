export const runtime = 'edge';
import ShippingInfoSection from "../components/corporate/ShippingInfoSection";

export default function ShippingInfo() {
    return (
        <>
            <div className="flex flex-col items-center space-y-2">
                <ShippingInfoSection />
            </div>
        </>
    )

}
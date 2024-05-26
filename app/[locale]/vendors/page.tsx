export const runtime = 'edge';
import VendorSection from "../components/corporate/VendorSection";

export default function Export() {


    return (
        <div className="flex flex-col items-center space-y-2">
            <VendorSection />
        </div>
    );
}
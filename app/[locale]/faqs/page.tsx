export const runtime = 'edge';
import FaqsSection from "../components/corporate/FaqsSection";

export default function Faqs() {


    return (
        <div className="flex flex-col items-center space-y-2">
            <FaqsSection />
        </div>
    );
}
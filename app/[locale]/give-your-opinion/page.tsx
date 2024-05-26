export const runtime = 'edge';
import OpinionSection from "../components/corporate/OpinionSection";

export default function GiveOpinion() {
    return (
        <div className="flex flex-col items-center space-y-2">
            <OpinionSection />
        </div>
    );
}
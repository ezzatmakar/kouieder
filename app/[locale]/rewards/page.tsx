export const runtime = 'edge';
import RewardsSection from "../components/corporate/RewardsSection";

export default function Export() {


    return (
        <div className="flex flex-col items-center space-y-2">
            <RewardsSection />
        </div>
    );
}
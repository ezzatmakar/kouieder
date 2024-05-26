export const runtime = 'edge';

import BlogList from "../components/BlogList";

export default function blog() {


    return (
        <div className="flex flex-col items-center space-y-2">
            <BlogList />
        </div>
    );
}
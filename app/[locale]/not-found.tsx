import { Link } from "@/navigation";

export default function NotFound() {
  return (
    <div className="global">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link prefetch={false} href="/">Return Home</Link>
    </div>
  );
}

import ListLoader from "../../components/ListLoader";

export default function Loading() {
  return (
    <div className="single-catgeory mt-2">
    <div className="overflow-hidden bg-white">
      <main className="mx-auto px-3 2xl:container sm:px-6 lg:px-8">
        <div className="pt-2 md:pt-5">
          <ListLoader />
        </div>
      </main>
    </div>
    </div>
  );
}

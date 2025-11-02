export default function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-gray-200 p-6 animate-pulse">
      <div className="h-5 w-40 rounded bg-gray-200" />
      <div className="mx-auto my-6 h-32 w-32 rounded-full bg-gray-200" />
      <div className="mx-auto h-8 w-24 rounded bg-gray-200" />
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="h-10 rounded bg-gray-100" />
        <div className="h-10 rounded bg-gray-100" />
        <div className="h-10 rounded bg-gray-100" />
      </div>
    </div>
  );
}



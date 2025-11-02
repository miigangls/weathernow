export default function PageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 w-64 rounded bg-gray-200" />
      <div className="h-10 w-full max-w-md rounded bg-gray-200" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-white ring-1 ring-gray-200 p-6">
            <div className="h-5 w-40 rounded bg-gray-200" />
            <div className="mx-auto my-6 h-32 w-32 rounded-full bg-gray-200" />
            <div className="mx-auto h-8 w-24 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}



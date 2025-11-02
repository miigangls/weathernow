export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-600">
      <div className="text-lg font-medium">{title}</div>
      {description ? <div className="mt-1 text-sm">{description}</div> : null}
    </div>
  );
}

export default EmptyState;



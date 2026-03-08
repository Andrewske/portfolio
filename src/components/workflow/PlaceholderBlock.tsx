interface PlaceholderBlockProps {
  label: string;
}

export default function PlaceholderBlock({ label }: PlaceholderBlockProps) {
  return (
    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 bg-gray-900/20">
      <p className="text-gray-500 text-sm text-center italic">
        {label}
      </p>
    </div>
  );
}

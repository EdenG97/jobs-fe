export default function JobContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-2 text-gray-700 rounded-md mt-4 p-3 shadow-xl">
      {children}
    </div>
  );
}

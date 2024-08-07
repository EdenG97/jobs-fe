import { FormEvent } from "react";

export default function FormWrapper({
  onSubmit,
  title,
  children,
}: {
  onSubmit?: (event: FormEvent) => void;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="border-2 border-gray-400 shadow-xl rounded-md w-[350px]">
        <div className="p-4">
          <h2 className="font-bold text-2xl mb-4">{title}</h2>
          {children}
        </div>
      </form>
    </div>
  );
}

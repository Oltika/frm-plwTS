
import { Languages } from "lucide-react";

export function Header() {
  return (
    <div className="w-full bg-white shadow-sm py-4 px-6 mb-8">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Languages className="h-6 w-6 text-red-600" />
          <h2 className="font-bold text-xl">SpanishCards</h2>
        </div>

      </div>
    </div>
  );
}

import { Search } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between glass animate-fade-in">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="h-10 w-10 rounded-full bg-accent" />
    </header>
  );
};
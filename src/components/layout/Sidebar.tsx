import { Home, LineChart, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="w-20 min-h-screen flex flex-col items-center py-8 glass">
      <div className="w-12 h-12 rounded-xl bg-blue-500 mb-8" />
      
      <nav className="flex-1 flex flex-col items-center gap-4">
        <Link to="/" className="p-3 rounded-xl bg-accent text-white">
          <Home className="h-6 w-6" />
        </Link>
        <Link to="/analytics" className="p-3 rounded-xl hover:bg-accent/50 transition-colors">
          <LineChart className="h-6 w-6" />
        </Link>
        <Link to="/settings" className="p-3 rounded-xl hover:bg-accent/50 transition-colors">
          <Settings className="h-6 w-6" />
        </Link>
      </nav>
      
      <button className="p-3 rounded-xl hover:bg-accent/50 transition-colors mt-auto">
        <LogOut className="h-6 w-6" />
      </button>
    </aside>
  );
};
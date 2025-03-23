
import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, User, MessageSquare, Settings } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavigation = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {!hideNavigation && (
        <nav className="glass-dark fixed bottom-0 left-0 right-0 flex items-center justify-around py-4 px-2 z-50 animate-slide-up">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-16 p-2 rounded-full transition-all duration-300 ${
                path === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon 
                size={path === item.path ? 24 : 20} 
                className={`transition-all duration-300 ${
                  path === item.path ? "animate-pulse-subtle" : ""
                }`} 
              />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Layout;

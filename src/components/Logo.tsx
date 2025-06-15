
import { Zap } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-amber-500 rounded-lg flex items-center justify-center shadow-lg border-2 border-white/20">
          <Zap className="h-7 w-7 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center border border-white/30">
          <span className="text-xs font-bold text-white">B</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xl bg-gradient-to-r from-purple-700 to-amber-600 bg-clip-text text-transparent">
          BZ Kings SEO
        </span>
        <span className="text-xs text-white/70 -mt-1">Premium SEO Tools</span>
      </div>
    </div>
  );
};

export default Logo;

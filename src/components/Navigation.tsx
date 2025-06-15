
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Menu, X, Zap, Search, Star, Shield, Download } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-amber-500 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-700 to-amber-600 bg-clip-text text-transparent">
              BZ Kings
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Apps & Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/app-hub"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Download className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="font-medium">AI App Hub</div>
                            <div className="text-sm text-gray-600">Download free & premium AI apps</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/keyword-research"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Search className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="font-medium">Keyword Research</div>
                            <div className="text-sm text-gray-600">SEO keyword analysis tool</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Support</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[300px]">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/reviews"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Star className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="font-medium">Reviews</div>
                            <div className="text-sm text-gray-600">Customer feedback</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/disclaimer"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Shield className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="font-medium">Terms & Disclaimer</div>
                            <div className="text-sm text-gray-600">Legal information</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="gradient-primary text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100">
            <div className="space-y-4">
              <Link
                to="/app-hub"
                className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AI App Hub
              </Link>
              <Link
                to="/keyword-research"
                className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Keyword Research
              </Link>
              <Link
                to="/reviews"
                className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                to="/disclaimer"
                className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Terms & Disclaimer
              </Link>
              <div className="flex flex-col gap-2 px-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-purple-300 text-purple-700">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full gradient-primary text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;

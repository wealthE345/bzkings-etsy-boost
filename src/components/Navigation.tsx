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
import { Menu, X, Search, Star, Shield, Download, Smartphone, Users, Home, LogOut, User } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/20 backdrop-blur-sm border-b border-purple-100/30 sticky top-0 z-50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="flex items-center gap-2 px-4 py-2 text-white hover:text-purple-300 transition-colors">
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white">SEO Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px] bg-white/95 backdrop-blur-sm">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/app-hub"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Download className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="font-medium">SEO App Hub</div>
                            <div className="text-sm text-gray-600">Premium SEO & Mobile Apps</div>
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
                            <div className="text-sm text-gray-600">Advanced keyword analysis with real data</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/backlink-generator"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Shield className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="font-medium">Backlink Generator</div>
                            <div className="text-sm text-gray-600">Generate 2000+ organic backlinks from 50+ domains</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white">Premium Apps</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[350px] bg-white/95 backdrop-blur-sm">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/app-hub?tab=mobile"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Smartphone className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="font-medium">Mobile SEO Apps</div>
                            <div className="text-sm text-gray-600">Professional mobile applications</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/about" className="flex items-center gap-2 px-4 py-2 text-white hover:text-purple-300 transition-colors">
                    <Users className="h-4 w-4" />
                    About Us
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white">Support</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[300px] bg-white/95 backdrop-blur-sm">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/reviews"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Star className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="font-medium">Customer Reviews</div>
                            <div className="text-sm text-gray-600">See what our users say</div>
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
                            <div className="text-sm text-gray-600">Legal information & policies</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              {!loading && (
                user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white">
                      <User className="h-4 w-4" />
                      <span className="text-sm">Welcome back!</span>
                    </div>
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 glass-effect"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 glass-effect">
                        Log In
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="gradient-primary text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="space-y-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                to="/app-hub"
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Download className="h-4 w-4" />
                SEO App Hub
              </Link>
              <Link
                to="/keyword-research"
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                Keyword Research
              </Link>
              <Link
                to="/backlink-generator"
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="h-4 w-4" />
                Backlink Generator
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="h-4 w-4" />
                About Us
              </Link>
              <Link
                to="/reviews"
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Star className="h-4 w-4" />
                Reviews
              </Link>
              <Link
                to="/disclaimer"
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="h-4 w-4" />
                Terms & Disclaimer
              </Link>
              <div className="flex flex-col gap-2 px-4">
                {!loading && (
                  user ? (
                    <Button
                      variant="outline"
                      className="w-full border-white/30 text-white"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full border-white/30 text-white">
                          Log In
                        </Button>
                      </Link>
                      <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full gradient-primary text-white">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;

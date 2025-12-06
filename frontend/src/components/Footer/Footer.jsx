import Container from "../Container/Container";
import { Facebook, Twitter, Github, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-600 bg-white mt-12 dark:bg-gray-950/10 dark:text-white">
      <Container>
        <div className="py-10">
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            {/* Brand */}
            <div>
              <h2 className="text-xl font-bold">Martivo</h2>
              <p className="text-sm text-muted-foreground mt-2">
                The best products, at the best prices.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-6 text-sm font-medium">
              <a href="#" className="hover:text-primary">
                Home
              </a>
              <a href="#" className="hover:text-primary">
                Products
              </a>
              <a href="#" className="hover:text-primary">
                About
              </a>
              <a href="#" className="hover:text-primary">
                Contact
              </a>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Martivo. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coffee, MapPin, Github } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/40 ">
      <div className="container py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mx-4">
          <div className="flex items-center gap-2 ">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-bold">LaluanBasMY</span>
          </div>
          <div className="flex justify-center text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Azuan Alias. {t("footer.rights")}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link
              href="https://github.com/azuanalias92/LaluanBasMy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>

            <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
              <Link href="https://www.buymeacoffee.com/azuanalias" target="_blank" rel="noopener noreferrer">
                <Coffee className="h-4 w-4" />
                <span>{t("footer.buyMeCoffee")}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

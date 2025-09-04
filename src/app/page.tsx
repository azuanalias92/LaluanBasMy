"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Users, ArrowRight } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const features = [
    {
      icon: MapPin,
      title: "Interactive Maps",
      description: "Explore bus routes with detailed interactive maps powered by Mapbox GL",
    },
    {
      icon: Navigation,
      title: "Route Planning",
      description: "Find the best routes and connections for your journey across Alor Setar",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get live information about bus schedules and route changes",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built for the community with user feedback and local insights",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-24 sm:py-32">
        <div className="container relative">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">
              {t("home.badge")}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{t("home.title")}</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{t("home.subtitle")}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/map">
                  <MapPin className="mr-2 h-4 w-4" />
                  {t("home.exploreMap")}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">
                  {t("home.learnMore")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("home.features.title")}</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{t("home.features.subtitle")}</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-4 gap-y-4 lg:max-w-none lg:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="flex flex-col m-4">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{t(`home.feature${index + 1}.title`)}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{t(`home.feature${index + 1}.description`)}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Apps Banner */}
      <section className="py-16 bg-primary/5 border-y border-primary/10 px-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">{t("home.apps.banner.title")}</h2>
              <p className="text-muted-foreground max-w-md">{t("home.apps.banner.subtitle")}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-[120px] h-[240px] rounded-3xl border-8 border-muted-foreground/20 bg-background shadow-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="h-1 w-16 rounded-full bg-muted-foreground/20"></div>
                </div>
              </div>
              <div className="relative w-[120px] h-[240px] rounded-3xl border-8 border-muted-foreground/20 bg-background shadow-lg overflow-hidden rotate-6 translate-y-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Navigation className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="h-1 w-16 rounded-full bg-muted-foreground/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-24 sm:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("home.cta.title")}</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{t("home.cta.subtitle")}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/map">
                  <MapPin className="mr-2 h-4 w-4" />
                  {t("home.cta.button")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

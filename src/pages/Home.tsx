import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import HomeLandingContent from "@/components/home/HomeLandingContent";
import { cn } from "@/lib/utils";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "",
      subtitle: "",
      image: "/images/banner2.jpg",
      isStaticImage: true,
      link: "/user/courses",
    },
    {
      title: "掌握前沿 AI 技术",
      subtitle: "从理论基础到工程落地，全面提升 AI 核心竞争力",
      image: "/images/banner1.jpg",
      isStaticImage: false,
      badge: "全新版本发布",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="flex min-h-full flex-col bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section - Light Luxury Style */}
      <div className="relative w-full aspect-[1024/346] min-h-[250px] max-h-[580px] overflow-hidden bg-[#eff6ff]">
        {slides.map((slide, index) => {
          const isCurrent = index === currentSlide;

          if (slide.isStaticImage) {
            return (
              <Link
                key={index}
                to={slide.link || "/user/courses"}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000 ease-in-out block cursor-pointer",
                  isCurrent ? "opacity-100 z-10" : "opacity-0 z-0",
                )}
              >
                <img
                  src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}${slide.image}`}
                  alt="智联未来 云启成长"
                  className="w-full h-full object-cover object-left md:object-center transition-all duration-500"
                />
              </Link>
            );
          }

          return (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                isCurrent ? "opacity-100 z-10" : "opacity-0 z-0",
              )}
            >
              <img
                src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}${slide.image}`}
                alt={slide.title}
                className="w-full h-full object-cover object-right md:object-center transition-all duration-500"
              />
              {/* Elegant Light Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#eff6ff]/90 via-[#eff6ff]/65 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-5xl">
                {slide.badge && (
                  <div className="overflow-hidden mb-4 animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-200 text-[#3b82f6] text-sm font-medium tracking-wide">
                      {slide.badge}
                    </span>
                  </div>
                )}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.15] animate-fade-in-up animation-delay-100">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-xl text-slate-600 font-light max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
                  {slide.subtitle}
                </p>
                <div className="mt-8 flex items-center gap-4 animate-fade-in-up animation-delay-300">
                  <Link to="/user/ai/assistant" className="h-12 px-6 sm:h-14 sm:px-8 inline-flex items-center justify-center rounded-full bg-slate-900 text-white text-sm sm:text-base font-medium hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                    开始学习 <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                  <Link to="/login" className="h-12 px-6 sm:h-14 sm:px-8 inline-flex items-center justify-center rounded-full bg-white text-slate-900 text-sm sm:text-base font-medium border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
                    了解更多
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Elegant Controls */}
        <div className="absolute bottom-6 md:bottom-12 right-6 md:right-16 lg:right-24 z-20 flex items-center gap-8">
          {/* Indicators */}
          <div className="hidden md:flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  index === currentSlide ? "w-12 bg-slate-900" : "w-4 bg-slate-900/20 hover:bg-slate-900/40",
                )}
              />
            ))}
          </div>
          {/* Arrows */}
          <div className="flex gap-3">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-lg transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-lg transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <HomeLandingContent />
    </div>
  );
}

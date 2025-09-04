"use client";

import React, { useState, useEffect } from "react";
import { Share2, Facebook, Twitter, MessageCircle, Send, Copy, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface SocialShareWidgetProps {
  title?: string;
  description?: string;
}

export default function SocialShareWidget({ title, description }: SocialShareWidgetProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const shareTitle = title || t("social.share.title");
  const shareDescription = description || t("social.share.description");
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };

  const handleShare = (platform: string) => {
    if (platform === "native" && typeof window !== "undefined" && "share" in navigator) {
      navigator
        .share({
          title: shareTitle,
          text: shareDescription,
          url: currentUrl,
        })
        .catch(console.error);
    } else if (platform === "copy") {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          setShowCopySuccess(true);
          setTimeout(() => setShowCopySuccess(false), 2000);
        })
        .catch(console.error);
    } else {
      window.open(shareLinks[platform as keyof typeof shareLinks], "_blank", "width=600,height=400");
    }
  };

  return (
    <>
      {/* Floating Share Button */}
      <div className="fixed right-6 bottom-1/25 transform -translate-y-1/2 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label={t("social.share.button")}
        >
          {isOpen ? <X size={20} /> : <Share2 size={20} />}
        </button>
      </div>

      {/* Share Options Panel */}
      {isOpen && (
        <div className="fixed right-4 bottom-0 transform -translate-y-1/4 z-40 mr-16">
          <div className="bg-secondary text-black rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 min-w-[200px]">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t("share.title")}</h3>

            <div className="space-y-2">
              {/* Native Share (if supported) */}
              {typeof window !== "undefined" && "share" in navigator && (
                <button
                  onClick={() => handleShare("native")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <Share2 size={16} />
                  {t("share.native")}
                </button>
              )}

              {/* Facebook */}
              <button
                onClick={() => handleShare("facebook")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
              >
                <Facebook size={16} className="text-blue-600" />
                Facebook
              </button>

              {/* Twitter */}
              <button
                onClick={() => handleShare("twitter")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
              >
                <Twitter size={16} className="text-blue-400" />
                Twitter
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => handleShare("whatsapp")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors"
              >
                <MessageCircle size={16} className="text-green-600" />
                WhatsApp
              </button>

              {/* Telegram */}
              <button
                onClick={() => handleShare("telegram")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
              >
                <Send size={16} className="text-blue-500" />
                Telegram
              </button>

              {/* Copy Link */}
              <button
                onClick={() => handleShare("copy")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <Copy size={16} className="text-gray-600" />
                {showCopySuccess ? t("share.copied") : t("share.copy")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />}
    </>
  );
}

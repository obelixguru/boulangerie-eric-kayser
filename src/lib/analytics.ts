"use client";

type EventType =
  | "page_view"
  | "add_to_cart"
  | "remove_from_cart"
  | "purchase"
  | "signup"
  | "newsletter_subscribe"
  | "click_collect_start"
  | "contact_form";

interface TrackOptions {
  properties?: Record<string, string | number | boolean>;
}

function getUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

export function track(event: EventType, options?: TrackOptions) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    page: window.location.pathname,
    referrer: document.referrer || "",
    ...getUTMParams(),
    properties: options?.properties || {},
  };

  // Use sendBeacon for reliability (works even on page unload)
  const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", blob);
  } else {
    fetch("/api/track", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => {});
  }
}

// Convenience helpers
export const trackPageView = () => track("page_view");
export const trackAddToCart = (productName: string, price: number) =>
  track("add_to_cart", { properties: { product: productName, price } });
export const trackPurchase = (total: number, items: number) =>
  track("purchase", { properties: { total, items } });
export const trackSignup = () => track("signup");
export const trackNewsletterSubscribe = () => track("newsletter_subscribe");
export const trackClickCollect = () => track("click_collect_start");
export const trackContactForm = () => track("contact_form");

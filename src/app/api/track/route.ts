import { NextResponse } from "next/server";

// First-party analytics event types
type EventType =
  | "page_view"
  | "add_to_cart"
  | "remove_from_cart"
  | "purchase"
  | "signup"
  | "newsletter_subscribe"
  | "click_collect_start"
  | "contact_form";

interface TrackEvent {
  event: EventType;
  page: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  properties?: Record<string, string | number | boolean>;
  timestamp?: string;
}

// In production, events would be stored in Supabase or another database
// For now, we log to console and return success
const events: TrackEvent[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      event,
      page,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      properties,
    } = body as TrackEvent;

    if (!event || !page) {
      return NextResponse.json(
        { error: "Missing required fields: event, page" },
        { status: 400 }
      );
    }

    const validEvents: EventType[] = [
      "page_view",
      "add_to_cart",
      "remove_from_cart",
      "purchase",
      "signup",
      "newsletter_subscribe",
      "click_collect_start",
      "contact_form",
    ];

    if (!validEvents.includes(event)) {
      return NextResponse.json(
        { error: `Invalid event type. Valid: ${validEvents.join(", ")}` },
        { status: 400 }
      );
    }

    const trackEvent: TrackEvent = {
      event,
      page,
      referrer: referrer || "",
      utm_source: utm_source || "",
      utm_medium: utm_medium || "",
      utm_campaign: utm_campaign || "",
      utm_content: utm_content || "",
      properties: properties || {},
      timestamp: new Date().toISOString(),
    };

    // Store event (in-memory for now, Supabase in production)
    events.push(trackEvent);

    // Log for debugging
    console.log(`[analytics] ${event} on ${page}`, JSON.stringify(properties || {}));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// GET endpoint for the analytics dashboard to read events
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Basic auth for dashboard access
  if (secret !== (process.env.ANALYTICS_SECRET || "MOCK_ANALYTICS_SECRET_HERE")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    total: events.length,
    events: events.slice(-100), // Last 100 events
    summary: {
      page_views: events.filter((e) => e.event === "page_view").length,
      add_to_cart: events.filter((e) => e.event === "add_to_cart").length,
      purchases: events.filter((e) => e.event === "purchase").length,
      signups: events.filter((e) => e.event === "signup").length,
      newsletter: events.filter((e) => e.event === "newsletter_subscribe").length,
    },
  });
}

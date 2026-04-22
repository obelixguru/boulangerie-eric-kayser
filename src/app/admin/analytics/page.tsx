import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Analytics — Eric Kayser Admin",
  robots: "noindex, nofollow",
};

// AARRR funnel stages
const FUNNEL_STAGES = [
  { key: "page_views", label: "Acquisition", desc: "Visiteurs uniques", icon: "👁", color: "#D4A574" },
  { key: "signups", label: "Activation", desc: "Inscriptions newsletter", icon: "✉", color: "#B8956A" },
  { key: "add_to_cart", label: "Rétention", desc: "Ajouts au panier", icon: "🛒", color: "#9C7B5A" },
  { key: "purchases", label: "Revenue", desc: "Achats complétés", icon: "💰", color: "#80614A" },
  { key: "newsletter", label: "Referral", desc: "Abonnés actifs", icon: "🔁", color: "#64473A" },
] as const;

interface AnalyticsData {
  total: number;
  summary: Record<string, number>;
  events: Array<{
    event: string;
    page: string;
    timestamp: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    properties?: Record<string, string | number | boolean>;
  }>;
}

async function getAnalytics(secret: string): Promise<AnalyticsData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3001";
    const res = await fetch(`${baseUrl}/api/track?secret=${secret}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function AnalyticsDashboard(props: {
  searchParams: Promise<{ secret?: string }>;
}) {
  const searchParams = await props.searchParams;
  const secret = searchParams.secret || "";

  if (!secret) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-sm shadow-sm p-8 text-center">
          <h1 className="font-serif text-2xl text-[#2C1810] mb-4">Dashboard Analytics</h1>
          <p className="text-[#2C1810]/60 mb-6">
            Accédez au dashboard en ajoutant votre clé secrète dans l&apos;URL :
          </p>
          <code className="bg-[#2C1810]/5 px-3 py-2 rounded text-sm text-[#2C1810]/80 block">
            /admin/analytics?secret=VOTRE_CLE
          </code>
        </div>
      </div>
    );
  }

  const data = await getAnalytics(secret);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <p className="text-[#2C1810]/60">Clé invalide ou erreur de connexion.</p>
      </div>
    );
  }

  const maxVal = Math.max(...FUNNEL_STAGES.map((s) => data.summary[s.key] || 0), 1);

  // Top pages
  const pageCounts: Record<string, number> = {};
  for (const ev of data.events) {
    pageCounts[ev.page] = (pageCounts[ev.page] || 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Top UTM sources
  const sourceCounts: Record<string, number> = {};
  for (const ev of data.events) {
    if (ev.utm_source) {
      sourceCounts[ev.utm_source] = (sourceCounts[ev.utm_source] || 0) + 1;
    }
  }
  const topSources = Object.entries(sourceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Recent events
  const recentEvents = data.events.slice(-10).reverse();

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="bg-[#2C1810] text-[#FAF8F5] py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-3xl">Dashboard Analytics</h1>
          <p className="text-[#FAF8F5]/60 mt-1">Boulangerie Eric Kayser — Louvre Rivoli</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard label="Total Events" value={data.total} />
          <KPICard label="Pages vues" value={data.summary.page_views || 0} />
          <KPICard label="Achats" value={data.summary.purchases || 0} />
          <KPICard
            label="Taux conversion"
            value={
              data.summary.page_views
                ? `${(((data.summary.purchases || 0) / data.summary.page_views) * 100).toFixed(1)}%`
                : "0%"
            }
          />
        </div>

        {/* AARRR Funnel */}
        <section className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="font-serif text-xl text-[#2C1810] mb-6">Funnel AARRR</h2>
          <div className="space-y-4">
            {FUNNEL_STAGES.map((stage) => {
              const val = data.summary[stage.key] || 0;
              const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
              return (
                <div key={stage.key} className="flex items-center gap-4">
                  <div className="w-28 flex-shrink-0">
                    <div className="text-sm font-medium text-[#2C1810]">
                      {stage.icon} {stage.label}
                    </div>
                    <div className="text-xs text-[#2C1810]/50">{stage.desc}</div>
                  </div>
                  <div className="flex-1 bg-[#2C1810]/5 rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full rounded-full flex items-center px-3 text-white text-sm font-medium transition-all"
                      style={{
                        width: `${Math.max(pct, 5)}%`,
                        backgroundColor: stage.color,
                      }}
                    >
                      {val}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Two columns: Top Pages + UTM Sources */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Pages */}
          <section className="bg-white rounded-sm shadow-sm p-6">
            <h2 className="font-serif text-xl text-[#2C1810] mb-4">Pages populaires</h2>
            {topPages.length === 0 ? (
              <p className="text-[#2C1810]/50 text-sm">Aucune donnée encore.</p>
            ) : (
              <ul className="space-y-3">
                {topPages.map(([page, count]) => (
                  <li key={page} className="flex justify-between items-center">
                    <span className="text-sm text-[#2C1810] truncate">{page}</span>
                    <span className="text-sm font-medium text-[#D4A574] ml-2">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* UTM Sources */}
          <section className="bg-white rounded-sm shadow-sm p-6">
            <h2 className="font-serif text-xl text-[#2C1810] mb-4">Sources UTM</h2>
            {topSources.length === 0 ? (
              <p className="text-[#2C1810]/50 text-sm">Aucune source UTM trackée.</p>
            ) : (
              <ul className="space-y-3">
                {topSources.map(([source, count]) => (
                  <li key={source} className="flex justify-between items-center">
                    <span className="text-sm text-[#2C1810]">{source}</span>
                    <span className="text-sm font-medium text-[#D4A574]">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Recent Events */}
        <section className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="font-serif text-xl text-[#2C1810] mb-4">Derniers événements</h2>
          {recentEvents.length === 0 ? (
            <p className="text-[#2C1810]/50 text-sm">Aucun événement enregistré.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2C1810]/10">
                    <th className="text-left py-2 text-[#2C1810]/50 font-medium">Événement</th>
                    <th className="text-left py-2 text-[#2C1810]/50 font-medium">Page</th>
                    <th className="text-left py-2 text-[#2C1810]/50 font-medium">Source</th>
                    <th className="text-left py-2 text-[#2C1810]/50 font-medium">Heure</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.map((ev, i) => (
                    <tr key={i} className="border-b border-[#2C1810]/5">
                      <td className="py-2">
                        <span className="bg-[#D4A574]/10 text-[#D4A574] px-2 py-0.5 rounded text-xs font-medium">
                          {ev.event}
                        </span>
                      </td>
                      <td className="py-2 text-[#2C1810]/70 truncate max-w-32">{ev.page}</td>
                      <td className="py-2 text-[#2C1810]/50">{ev.utm_source || "direct"}</td>
                      <td className="py-2 text-[#2C1810]/50">
                        {ev.timestamp ? new Date(ev.timestamp).toLocaleTimeString("fr-FR") : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function KPICard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-sm shadow-sm p-4">
      <div className="text-xs text-[#2C1810]/50 uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-serif text-[#2C1810] mt-1">{value}</div>
    </div>
  );
}

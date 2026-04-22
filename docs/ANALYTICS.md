# Analytics & Tracking — Boulangerie Eric Kayser Louvre Rivoli

## Architecture

Tracking 100% first-party via `/api/track`. Aucun script tiers (Google Analytics, Meta Pixel) requis. Les données restent sous votre contrôle.

### Composants

| Fichier | Rôle |
|---------|------|
| `src/lib/analytics.ts` | Client-side tracker (sendBeacon) |
| `src/components/page-view-tracker.tsx` | Auto-tracking page views |
| `src/app/api/track/route.ts` | POST: recevoir events / GET: lire events |
| `src/app/admin/analytics/page.tsx` | Dashboard AARRR |

## Events trackés

| Event | Déclencheur | Propriétés |
|-------|-------------|------------|
| `page_view` | Chaque navigation | page, referrer |
| `add_to_cart` | Clic "Commander" boutique | product, price |
| `purchase` | Confirmation paiement | total, items |
| `signup` | Création compte | - |
| `newsletter_subscribe` | Inscription newsletter | - |
| `click_collect_start` | CTA click & collect | - |
| `contact_form` | Soumission formulaire | - |

## Dashboard

Accès : `/admin/analytics?secret=VOTRE_CLE`

Le dashboard affiche :
- **KPIs** : total events, pages vues, achats, taux de conversion
- **Funnel AARRR** : Acquisition → Activation → Rétention → Revenue → Referral
- **Pages populaires** : top 5 pages par volume
- **Sources UTM** : top 5 sources de trafic
- **Derniers événements** : 10 events les plus récents

Variable d'environnement : `ANALYTICS_SECRET` (par défaut `MOCK_ANALYTICS_SECRET_HERE`)

## Conventions UTM

### Format standard

```
?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=CAMPAIGN&utm_content=CONTENT
```

### Sources définies

| Source | Medium | Usage |
|--------|--------|-------|
| `google` | `organic` | Trafic SEO Google |
| `google` | `cpc` | Google Ads |
| `instagram` | `social` | Posts Instagram organiques |
| `instagram` | `paid` | Instagram Ads |
| `facebook` | `social` | Posts Facebook organiques |
| `facebook` | `paid` | Meta Ads |
| `resend` | `email` | Emails transactionnels (welcome, re-engagement) |
| `newsletter` | `email` | Newsletter hebdo |
| `tripadvisor` | `referral` | Avis TripAdvisor |
| `googlemaps` | `referral` | Fiche Google Business |

### Campagnes recommandées

| Campaign | Description |
|----------|-------------|
| `launch-2026` | Lancement du site |
| `summer-2026` | Campagne été/touristes |
| `christmas-2026` | Coffrets cadeaux Noël |
| `b2b-hotels` | Prospection B2B hôtellerie |
| `reengagement-30d` | Re-engagement inactifs 30j |
| `blog-{slug}` | Auto-promotion articles blog |

### Content tags

Utilisez `utm_content` pour différencier les variantes :
- `hero-cta` : CTA principal du hero
- `footer-newsletter` : Formulaire newsletter footer
- `exit-popup` : Pop-up exit intent
- `email-cta-1` / `email-cta-2` : CTA dans les emails
- `social-post-auto` : Posts sociaux automatiques

### Exemples complets

```
# Lancement — Instagram Ads — CTA hero
?utm_source=instagram&utm_medium=paid&utm_campaign=launch-2026&utm_content=hero-cta

# Newsletter — Article blog levain
?utm_source=newsletter&utm_medium=email&utm_campaign=blog-secrets-levain-naturel&utm_content=email-cta-1

# Re-engagement 30j — Email
?utm_source=resend&utm_medium=email&utm_campaign=reengagement-30d&utm_content=email-cta-1

# Google Ads — Baguette Paris
?utm_source=google&utm_medium=cpc&utm_campaign=launch-2026&utm_content=baguette-paris
```

## Tracking côté client

```typescript
import { track, trackAddToCart, trackPurchase } from "@/lib/analytics";

// Track custom event
track("click_collect_start");

// Track add to cart
trackAddToCart("Baguette Tradition", 1.50);

// Track purchase
trackPurchase(15.50, 3);
```

## Mise en production

1. Remplacer `MOCK_ANALYTICS_SECRET_HERE` par un vrai secret dans les variables d'env Vercel
2. Pour persister les events au-delà du cycle de vie du serveur, brancher `/api/track` sur Supabase :
   - Créer table `analytics_events` (event, page, referrer, utm_*, properties, created_at)
   - Remplacer le push en mémoire par un insert Supabase
3. Le dashboard lira alors directement depuis Supabase avec filtrage par date

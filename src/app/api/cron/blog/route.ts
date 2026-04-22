import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { KEYWORD_CLUSTERS, type KeywordCluster } from "@/lib/blog-keywords";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

// Verify cron secret to prevent unauthorized triggers
function verifyCronAuth(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true; // Allow in dev without secret
  return authHeader === `Bearer ${cronSecret}`;
}

// Find which keyword clusters haven't been used yet
async function getUnusedCluster(): Promise<KeywordCluster | null> {
  const existingFiles = await fs.readdir(CONTENT_DIR).catch(() => []);
  const existingSlugs = existingFiles
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));

  const unused = KEYWORD_CLUSTERS.find(
    (cluster) => !existingSlugs.includes(cluster.slug)
  );
  return unused || null;
}

// Generate article content via Gemini API
async function generateArticle(
  cluster: KeywordCluster
): Promise<{ title: string; content: string; excerpt: string }> {
  const apiKey = process.env.GEMINI_API_KEY || "MOCK_GEMINI_API_KEY_HERE";
  const isMock = apiKey === "MOCK_GEMINI_API_KEY_HERE";

  if (isMock) {
    // Return a well-structured mock article for development
    return {
      title: cluster.pillar,
      excerpt: `Découvrez tout sur ${cluster.keywords[0]} — un guide complet par les artisans de la Boulangerie Eric Kayser au Louvre-Rivoli.`,
      content: generateMockContent(cluster),
    };
  }

  const prompt = `Tu es un rédacteur SEO expert pour la Boulangerie Eric Kayser, une boulangerie artisanale premium au Louvre-Rivoli, Paris.

Écris un article de blog SEO de 800-1200 mots en français sur le sujet suivant :
**Titre : ${cluster.pillar}**

Mots-clés à intégrer naturellement : ${cluster.keywords.join(", ")}

Règles :
- Ton chaleureux, sensoriel, expert mais accessible (luxe artisanal)
- Ne jamais dire "premium" ou "haut de gamme" — le prouver par les détails techniques (temps de fermentation, type de farine, température)
- Inclure des sous-titres H2 et H3 avec des mots-clés
- Paragraphes courts (2-3 phrases max)
- Terminer par un CTA vers la boutique en ligne ou le click & collect
- Mentionner l'adresse : 4 Rue de l'Échelle, 75001 Paris (près du Louvre)
- Inclure un appel à l'action pour l'abonnement pain hebdomadaire

Réponds UNIQUEMENT avec le contenu Markdown de l'article (sans frontmatter, sans titre H1).
Commence directement avec le premier paragraphe d'introduction.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error ${response.status}: ${error}`);
    }

    const data = await response.json();
    const generatedText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!generatedText) {
      throw new Error("Empty response from Gemini API");
    }

    // Extract first paragraph as excerpt
    const firstParagraph = generatedText
      .split("\n")
      .find((line: string) => line.trim() && !line.startsWith("#"));
    const excerpt = firstParagraph?.slice(0, 200).trim() + "..." || cluster.pillar;

    return {
      title: cluster.pillar,
      excerpt,
      content: generatedText,
    };
  } catch (error) {
    console.error("Gemini API failed, using mock:", error);
    return {
      title: cluster.pillar,
      excerpt: `Découvrez tout sur ${cluster.keywords[0]} — un guide par Eric Kayser.`,
      content: generateMockContent(cluster),
    };
  }
}

function generateMockContent(cluster: KeywordCluster): string {
  const categoryIntros: Record<string, string> = {
    "savoir-faire": "Chez Eric Kayser, chaque pain raconte une histoire de patience et de savoir-faire transmis depuis des générations.",
    "art-de-vivre": "Paris se vit au rythme de ses boulangeries. Au cœur du 1er arrondissement, une tradition se perpétue.",
    accords: "L'art de la table commence par le choix du pain. Nos boulangers partagent leurs secrets d'accords.",
    recettes: "Quand le pain artisanal rencontre la créativité, chaque repas devient une expérience sensorielle.",
    paris: "Au pied du Louvre, dans le quartier le plus visité de Paris, la Boulangerie Eric Kayser perpétue un art centenaire.",
  };

  return `${categoryIntros[cluster.category] || categoryIntros["savoir-faire"]}

## ${cluster.keywords[0]}

Le ${cluster.keywords[0]} est au cœur de notre métier. Chaque jour, nos boulangers se lèvent avant l'aube pour préparer des pains qui respectent les temps de fermentation longs — 48 à 72 heures pour notre levain naturel, cultivé depuis plus de 20 ans.

Cette patience se retrouve dans chaque mie alvéolée, chaque croûte dorée et croustillante. C'est ce qui distingue un pain artisanal d'un pain industriel.

## Notre engagement qualité

Nous sélectionnons nos farines avec la plus grande rigueur : farine de meule T80, farine de tradition française, blés anciens cultivés en Beauce. Aucun additif, aucun améliorant — juste de la farine, de l'eau, du sel et notre levain.

### ${cluster.keywords[1] || "Un savoir-faire unique"}

${cluster.keywords[1] || "Notre savoir-faire"} s'inscrit dans une tradition boulangère parisienne que nous enrichissons chaque jour. Au 4 Rue de l'Échelle, à deux pas du Palais-Royal et du Louvre, nous accueillons aussi bien les Parisiens pressés que les voyageurs en quête d'authenticité.

## Commandez en ligne

Ne perdez plus de temps dans la file d'attente. Notre service **Click & Collect** vous permet de commander en ligne et de retirer votre commande en boutique, prête en 15 minutes.

Découvrez également notre **abonnement pain hebdomadaire** : du pain frais artisanal livré chaque semaine, sans y penser.

[Commander en Click & Collect →](/boutique)

---

*Boulangerie Eric Kayser — 4 Rue de l'Échelle, 75001 Paris — Ouverte 7j/7*`;
}

// Save article as MDX file
async function saveArticle(
  cluster: KeywordCluster,
  article: { title: string; content: string; excerpt: string }
): Promise<string> {
  const date = new Date().toISOString().split("T")[0];

  const categoryLabels: Record<string, string> = {
    "savoir-faire": "Savoir-Faire",
    "art-de-vivre": "Art de Vivre",
    accords: "Accords",
    recettes: "Recettes",
    paris: "Paris",
  };

  const frontmatter = `---
title: "${article.title}"
date: "${date}"
excerpt: "${article.excerpt.replace(/"/g, '\\"')}"
category: "${categoryLabels[cluster.category] || cluster.category}"
keywords:
${cluster.keywords.map((k) => `  - "${k}"`).join("\n")}
image: "https://images.unsplash.com/photo-1606178634968-108ce73796fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
author: "Eric Kayser"
readingTime: "${Math.ceil(article.content.split(" ").length / 200)} min"
---

${article.content}`;

  const filePath = path.join(CONTENT_DIR, `${cluster.slug}.mdx`);
  await fs.writeFile(filePath, frontmatter, "utf-8");
  return filePath;
}

export async function GET(request: Request) {
  // Auth check
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find next unused keyword cluster
    const cluster = await getUnusedCluster();

    if (!cluster) {
      return NextResponse.json({
        status: "complete",
        message: "All keyword clusters have been used. Add more to blog-keywords.ts.",
      });
    }

    // Generate article via Gemini
    const article = await generateArticle(cluster);

    // Save as MDX
    const filePath = await saveArticle(cluster, article);

    return NextResponse.json({
      status: "published",
      slug: cluster.slug,
      title: article.title,
      category: cluster.category,
      filePath,
      isMock: !process.env.GEMINI_API_KEY,
      message: !process.env.GEMINI_API_KEY
        ? "Article generated with mock content (GEMINI_API_KEY not configured)"
        : "Article generated via Gemini API",
    });
  } catch (error) {
    console.error("Blog cron error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate article",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

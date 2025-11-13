import fs from "fs";
import path from "path";
import { parseStringPromise } from "xml2js";
import TurndownService from "turndown";

interface RSSItem {
  title: string[];
  description: string[];
  link: string[];
  "content:encoded"?: string[];
  pubDate: string[];
  "dc:creator": string[];
  category?: string[];
  "media:content"?: Array<{ $: { url: string } }>;
}

interface RSSChannel {
  item: RSSItem[];
}

interface ParsedRSS {
  rss: {
    channel: RSSChannel[];
  };
}

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

// Add rule to preserve images
turndownService.addRule("image", {
  filter: "img",
  replacement: (_content, node) => {
    const src = node.getAttribute("src") || "";
    const alt = node.getAttribute("alt") || "Image";
    return `![${alt}](${src})`;
  },
});

async function convertRSSToMarkdown() {
  const rssPath = "/tmp/blog_rss.xml";
  const blogsDir = path.join(
    "/Users/mac/WebApps/projects/personal-web-v5/src/content/blogs"
  );

  try {
    // Read RSS file
    console.log("📚 Reading RSS feed...");
    const rssContent = fs.readFileSync(rssPath, "utf-8");

    // Parse XML
    console.log("🔍 Parsing XML...");
    const parsed = (await parseStringPromise(rssContent)) as ParsedRSS;
    const items = parsed.rss.channel[0].item;

    console.log(`✅ Found ${items.length} posts`);
    console.log("🔄 Converting posts...\n");

    // Process each item
    for (const item of items) {
      const title = item.title[0];
      const pubDate = item.pubDate[0];
      const author = item["dc:creator"]?.[0] || "Unknown";
      const link = item.link[0];
      const categories = item.category || [];
      const imageUrl = item["media:content"]?.[0]?.$?.url || null;

      // Get HTML content (prefer full content over description)
      const htmlContent =
        item["content:encoded"]?.[0] || item.description[0] || "";

      // Convert HTML to Markdown
      const markdownContent = turndownService.turndown(htmlContent);

      // Create slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      // Format date for frontmatter
      const date = new Date(pubDate).toISOString().split("T")[0];

      // Create frontmatter
      const frontmatter = `---
title: "${title}"
date: ${date}
author: "${author}"
tags: [${categories.map((cat: string) => `"${cat}"`).join(", ")}]
image: "${imageUrl || ''}"
canonical: "${link}"
---

`;

      // Combine frontmatter and content
      const fullMarkdown = frontmatter + markdownContent;

      // Write to file
      const filename = `${slug}.md`;
      const filepath = path.join(blogsDir, filename);

      fs.writeFileSync(filepath, fullMarkdown, "utf-8");
      console.log(`✅ Created: ${filename}`);
      console.log(`   Title: ${title}`);
      console.log(`   Date: ${date}\n`);
    }

    console.log(`✨ Done! Converted ${items.length} posts to markdown.`);
  } catch (error) {
    console.error("❌ Error converting RSS:", error);
    process.exit(1);
  }
}

convertRSSToMarkdown();

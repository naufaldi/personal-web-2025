import fs from "fs";
import path from "path";

type BlogCategory = "My journey" | "Idea" | "Technical writer" | "Opinions";

const categoryMap: Record<string, BlogCategory> = {
  "how-to-approach-code-optimization-questions-in-interviews-a-frontend-engineer-x27-s-guide":
    "Opinions",
  "understanding-guard-clauses-in-frontend-development-enhancing-code-readability-and-efficiency":
    "Idea",
};

function categorizePost(title: string, description: string): BlogCategory {
  const lowerTitle = title.toLowerCase();

  // Journey/Personal stories
  const journeyKeywords = [
    "journey",
    "laid off",
    "hired",
    "interview",
    "first month",
    "mentorship",
    "freelance",
    "internship",
    "nomad",
    "reflection",
    "my ",
  ];

  // Opinions
  const opinionKeywords = [
    "why i",
    "prefer",
    "should",
    "advantages of",
    "disadvantages",
    "comparison",
    " vs ",
    "best ",
    "tips ",
    "how to approach",
  ];

  // Ideas
  const ideaKeywords = [
    "breaking out",
    "exploring",
    "future of",
    "trends",
    "rfc",
    "open journal",
    "catching up",
    "understanding",
    "passion",
  ];

  // Technical writer
  const technicalKeywords = [
    "guide",
    "tutorial",
    "how to",
    "setup",
    "install",
    "add ",
    "create",
    "building",
    "implementation",
    "fix",
    "debug",
    "react",
    "nextjs",
    "tailwind",
    "css",
    "graphql",
    "state management",
  ];

  if (journeyKeywords.some((k) => lowerTitle.includes(k))) return "My journey";
  if (opinionKeywords.some((k) => lowerTitle.includes(k))) return "Opinions";
  if (ideaKeywords.some((k) => lowerTitle.includes(k))) return "Idea";
  if (technicalKeywords.some((k) => lowerTitle.includes(k))) return "Technical writer";

  return "Technical writer";
}

function fixAndCategorize() {
  const blogsDir = path.join("/Users/mac/WebApps/projects/personal-web-v5/src/content/blogs");
  const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith(".md"));

  console.log("🔧 Fixing and categorizing blog posts...\n");

  const categories = {
    "My journey": 0,
    Idea: 0,
    "Technical writer": 0,
    Opinions: 0,
  };

  for (const file of files) {
    const filepath = path.join(blogsDir, file);
    let content = fs.readFileSync(filepath, "utf-8");

    // Extract frontmatter manually
    const match = content.match(/^---\n([\s\S]*?)\n---\n/);
    if (!match) {
      console.log(`⏭️  Skipped ${file} (no frontmatter)`);
      continue;
    }

    const frontmatterStr = match[1];
    const body = content.replace(/^---\n[\s\S]*?\n---\n/, "");

    // Parse YAML manually
    const lines = frontmatterStr.split("\n");
    const fm: any = {};
    let currentKey = "";

    for (const line of lines) {
      if (line.startsWith("  ")) {
        // Nested value
        const [k, v] = line.trim().split(": ");
        if (!fm[currentKey]) fm[currentKey] = {};
        fm[currentKey][k] = v?.replace(/^"(.*)"$/, "$1");
      } else if (line.includes(":")) {
        const [k, ...rest] = line.split(":");
        const v = rest.join(":").trim();
        currentKey = k.trim();
        fm[currentKey] = v.replace(/^"(.*)"$/, "$1");
      }
    }

    const slug = path.basename(file, ".md");
    const newCategory = categoryMap[slug] || categorizePost(fm.title, fm.description);

    // Build new frontmatter
    const newFrontmatter = `---
title: "${fm.title.replace(/"/g, '\\"')}"
slug: ${fm.slug}
description: "${fm.description.replace(/"/g, '\\"').replace(/\n/g, " ")}"
category: "${newCategory}"
author:
  name: "${fm.author?.name || "Naufaldi Rafif S"}"
  avatar: "${fm.author?.avatar || "https://avatars.githubusercontent.com/naufaldi?v=4"}"
date: ${fm.date}
image: "${fm.image || ""}"
canonical: "${fm.canonical || ""}"
---

`;

    const updated = newFrontmatter + body;
    fs.writeFileSync(filepath, updated, "utf-8");

    categories[newCategory]++;
    console.log(`✅ ${file} -> ${newCategory}`);
  }

  console.log(`\n📊 Final Distribution:`);
  console.log(`   My journey:       ${categories["My journey"]} posts`);
  console.log(`   Idea:             ${categories["Idea"]} posts`);
  console.log(`   Technical writer: ${categories["Technical writer"]} posts`);
  console.log(`   Opinions:         ${categories["Opinions"]} posts`);
  console.log(`   Total:            ${files.length} posts\n`);
  console.log("✨ Done!");
}

fixAndCategorize();

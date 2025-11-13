import fs from "fs";
import path from "path";
import fm from "front-matter";

type BlogCategory =

    | "My journey"
    | "Idea"
    | "Technical writer"
    | "Opinions";

interface BlogFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: BlogCategory;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  image?: string;
  canonical?: string;
}

function categorizePost(
  title: string,
  description: string,
): BlogCategory {
  const lowerTitle =
    title.toLowerCase();
  const lowerDesc =
    description.toLowerCase();

  // Journey/Personal stories - about life experiences, learning, getting hired/fired, career changes
  const journeyKeywords =
    [
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
      "lessons learned",
      "my",
    ];

  // Opinions - thoughts, perspectives, why you prefer/like something
  const opinionKeywords =
    [
      "why i",
      "my opinion",
      "prefer",
      "should",
      "thoughts on",
      "advantages of",
      "disadvantages",
      "comparison",
      "vs",
      "best",
      "worst",
      "tip",
      "guide to stay",
      "how to approach",
    ];

  // Technical writer - tutorials, guides, how-to, technical explanations
  const technicalKeywords =
    [
      "guide",
      "tutorial",
      "how to",
      "setup",
      "install",
      "add",
      "create",
      "building",
      "implementation",
      "fix",
      "debug",
      "prevent",
      "reusable",
      "pattern",
      "react",
      "nextjs",
      "tailwind",
      "css",
      "graphql",
      "state management",
      "component",
      "api",
      "tools",
      "library",
    ];

  // Ideas - concepts, thoughts, new approaches
  const ideaKeywords =
    [
      "breaking out",
      "exploring",
      "future of",
      "trends",
      "emerging",
      "concept",
      "rfc",
      "open journal",
      "catching up",
      "understanding",
      "passion",
    ];

  // Check for journey indicators (personal/career stories)
  if (
    journeyKeywords.some(
      (
        keyword,
      ) =>
        lowerTitle.includes(
          keyword,
        ),
    )
  ) {
    return "My journey";
  }

  // Check for opinion indicators
  if (
    opinionKeywords.some(
      (
        keyword,
      ) =>
        lowerTitle.includes(
          keyword,
        ),
    )
  ) {
    return "Opinions";
  }

  // Check for idea indicators
  if (
    ideaKeywords.some(
      (
        keyword,
      ) =>
        lowerTitle.includes(
          keyword,
        ),
    )
  ) {
    return "Idea";
  }

  // Check for technical indicators (more specific)
  if (
    technicalKeywords.some(
      (
        keyword,
      ) =>
        lowerTitle.includes(
          keyword,
        ),
    )
  ) {
    return "Technical writer";
  }

  // Default based on description
  if (
    lowerDesc.includes(
      "tutorial",
    ) ||
    lowerDesc.includes(
      "how to",
    ) ||
    lowerDesc.includes(
      "guide",
    )
  ) {
    return "Technical writer";
  }

  if (
    lowerDesc.includes(
      "learn",
    ) ||
    lowerDesc.includes(
      "journey",
    )
  ) {
    return "My journey";
  }

  // Default fallback
  return "Technical writer";
}

async function categorizeBlogPosts() {
  const blogsDir =
    path.join(
      "/Users/mac/WebApps/projects/personal-web-v5/src/content/blogs",
    );

  console.log(
    "📚 Analyzing blog posts for categorization...\n",
  );

  const files =
    fs
      .readdirSync(
        blogsDir,
      )
      .filter(
        (
          f,
        ) =>
          f.endsWith(
            ".md",
          ),
      );
  const categories =
    {
      "My journey": 0,
      Idea: 0,
      "Technical writer": 0,
      Opinions: 0,
    };

  for (const file of files) {
    const filepath =
      path.join(
        blogsDir,
        file,
      );
    const content =
      fs.readFileSync(
        filepath,
        "utf-8",
      );

    try {
      const parsed =
        fm<BlogFrontmatter>(
          content,
        );
      const frontmatter =
        parsed.attributes;

      const newCategory =
        categorizePost(
          frontmatter.title,
          frontmatter.description,
        );

      if (
        newCategory !==
        frontmatter.category
      ) {
        // Update frontmatter
        frontmatter.category =
          newCategory;

        // Reconstruct the file with proper YAML formatting
        const escapeYaml =
          (
            str: string,
          ) => {
            return str
              .replace(
                /\\/g,
                "\\\\",
              )
              .replace(
                /"/g,
                '\\"',
              )
              .replace(
                /\n/g,
                " ",
              );
          };

        const updatedYaml = `---
title: "${escapeYaml(frontmatter.title)}"
slug: ${frontmatter.slug}
description: "${escapeYaml(frontmatter.description)}"
category: "${newCategory}"
author:
  name: "${escapeYaml(frontmatter.author.name)}"
  avatar: "${escapeYaml(frontmatter.author.avatar)}"
date: ${frontmatter.date}
image: "${escapeYaml(frontmatter.image || "")}"
canonical: "${escapeYaml(frontmatter.canonical || "")}"
---

`;

        const updatedContent =
          updatedYaml +
          parsed.body;
        fs.writeFileSync(
          filepath,
          updatedContent,
          "utf-8",
        );

        console.log(
          `✅ ${file}`,
        );
        console.log(
          `   Title: ${frontmatter.title}`,
        );
        console.log(
          `   Category: ${newCategory}\n`,
        );
      }

      categories[
        newCategory
      ]++;
    } catch (error) {
      console.error(
        `❌ Error processing ${file}:`,
        error,
      );
    }
  }

  console.log(
    "\n📊 Final Category Distribution:",
  );
  console.log(
    `   My journey:       ${categories["My journey"]} posts`,
  );
  console.log(
    `   Idea:             ${categories["Idea"]} posts`,
  );
  console.log(
    `   Technical writer: ${categories["Technical writer"]} posts`,
  );
  console.log(
    `   Opinions:         ${categories["Opinions"]} posts`,
  );
  console.log(
    `   Total:            ${files.length} posts\n`,
  );

  console.log(
    "✨ Categorization complete!",
  );
}

categorizeBlogPosts().catch(
  (
    error,
  ) => {
    console.error(
      "Fatal error:",
      error,
    );
    process.exit(
      1,
    );
  },
);

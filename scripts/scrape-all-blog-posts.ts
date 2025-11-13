import fs from "fs";
import path from "path";
import TurndownService from "turndown";

interface BlogPost {
  url: string;
  title: string;
  content: string;
  date?: string;
  imageUrl?: string;
}

const turndownService =
  new TurndownService(
    {
      headingStyle:
        "atx",
      codeBlockStyle:
        "fenced",
    },
  );

turndownService.addRule(
  "image",
  {
    filter:
      "img",
    replacement:
      (
        _content,
        node,
      ) => {
        const src =
          node.getAttribute(
            "src",
          ) ||
          "";
        const alt =
          node.getAttribute(
            "alt",
          ) ||
          "Image";
        return `![${alt}](${src})`;
      },
  },
);

function escapeYamlString(
  str: string,
): string {
  str =
    str
      .replace(
        /\n/g,
        " ",
      )
      .replace(
        /\s+/g,
        " ",
      )
      .trim();
  str =
    str.replace(
      /\\/g,
      "\\\\",
    );
  str =
    str.replace(
      /"/g,
      '\\"',
    );
  return str;
}

async function fetchSitemap(): Promise<
  string[]
> {
  console.log(
    "📍 Fetching sitemap...",
  );
  const sitemapUrl =
    "https://blog.faldi.xyz/sitemap-posts.xml";

  try {
    const response =
      await fetch(
        sitemapUrl,
      );
    const sitemapXml =
      await response.text();

    const urlRegex =
      /<loc>(.*?)<\/loc>/g;
    const urls: string[] =
      [];
    let match;

    while (
      (match =
        urlRegex.exec(
          sitemapXml,
        )) !==
      null
    ) {
      const url =
        match[1];
      if (
        url.includes(
          "blog.faldi.xyz",
        ) &&
        !url.includes(
          "sitemap",
        )
      ) {
        urls.push(
          url,
        );
      }
    }

    console.log(
      `✅ Found ${urls.length} posts in sitemap\n`,
    );
    return urls;
  } catch (error) {
    console.error(
      "❌ Error fetching sitemap:",
      error,
    );
    return [];
  }
}

async function fetchPostContent(
  url: string,
): Promise<BlogPost | null> {
  try {
    const response =
      await fetch(
        url,
      );
    const html =
      await response.text();

    const titleMatch =
      html.match(
        /<meta property="og:title" content="([^"]*)"/,
      );
    const title =
      titleMatch
        ? titleMatch[1]
        : "Untitled";

    const dateMatch =
      html.match(
        /<meta property="article:published_time" content="([^"]*)"/,
      );
    const date =
      dateMatch
        ? dateMatch[1].split(
            "T",
          )[0]
        : new Date()
            .toISOString()
            .split(
              "T",
            )[0];

    const imageMatch =
      html.match(
        /<meta property="og:image" content="([^"]*)"/,
      );
    const imageUrl =
      imageMatch
        ? imageMatch[1]
        : null;

    const contentMatch =
      html.match(
        /<article[^>]*>([\s\S]*?)<\/article>/,
      ) ||
      html.match(
        /<div[^>]*class="[^"]*post[^"]*"[^>]*>([\s\S]*?)<\/div>/,
      ) ||
      html.match(
        /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/,
      );

    let content =
      contentMatch
        ? contentMatch[1]
        : "";

    content =
      content
        .replace(
          /<nav[^>]*>[\s\S]*?<\/nav>/g,
          "",
        )
        .replace(
          /<script[^>]*>[\s\S]*?<\/script>/g,
          "",
        )
        .replace(
          /<style[^>]*>[\s\S]*?<\/style>/g,
          "",
        )
        .replace(
          /<!--[\s\S]*?-->/g,
          "",
        )
        .trim();

    if (
      !content ||
      content.length <
        100
    ) {
      const bodyMatch =
        html.match(
          /<body[^>]*>([\s\S]*?)<\/body>/,
        );
      if (
        bodyMatch
      ) {
        content =
          bodyMatch[1]
            .replace(
              /<header[^>]*>[\s\S]*?<\/header>/g,
              "",
            )
            .replace(
              /<nav[^>]*>[\s\S]*?<\/nav>/g,
              "",
            )
            .replace(
              /<footer[^>]*>[\s\S]*?<\/footer>/g,
              "",
            )
            .replace(
              /<script[^>]*>[\s\S]*?<\/script>/g,
              "",
            )
            .replace(
              /<style[^>]*>[\s\S]*?<\/style>/g,
              "",
            )
            .replace(
              /<!--[\s\S]*?-->/g,
              "",
            )
            .trim();
      }
    }

    return {
      url,
      title,
      content,
      date,
      imageUrl,
    };
  } catch (error) {
    console.error(
      `❌ Error fetching ${url}:`,
      error,
    );
    return null;
  }
}

async function convertPostsToMarkdown(
  posts: BlogPost[],
) {
  const blogsDir =
    path.join(
      "/Users/mac/WebApps/projects/personal-web-v5/src/content/blogs",
    );

  console.log(
    "🔄 Converting posts to markdown...\n",
  );

  let successCount = 0;
  let skipCount = 0;

  for (const post of posts) {
    try {
      const markdownContent =
        turndownService.turndown(
          post.content,
        );

      if (
        markdownContent.length <
        50
      ) {
        console.log(
          `⏭️  Skipped: ${post.title} (insufficient content)`,
        );
        skipCount++;
        continue;
      }

      const slug =
        post.title
          .toLowerCase()
          .replace(
            /[^a-z0-9]+/g,
            "-",
          )
          .replace(
            /^-+|-+$/g,
            "",
          );

      const escapedTitle =
        escapeYamlString(
          post.title,
        );
      const escapedUrl =
        post.url.replace(
          /"/g,
          '\\"',
        );
      const escapedImage =
        post.imageUrl
          ? escapeYamlString(
              post.imageUrl,
            )
          : "";

      const contentLines =
        markdownContent
          .split(
            "\n",
          )
          .filter(
            (
              line,
            ) =>
              line.trim(),
          );
      const firstParagraph =
        contentLines.find(
          (
            line,
          ) =>
            line.trim()
              .length >
              0 &&
            !line.startsWith(
              "#",
            ),
        ) ||
        "Blog post from Faldi's blog";
      const description =
        escapeYamlString(
          firstParagraph.substring(
            0,
            160,
          ),
        );

      const frontmatter = `---
title: "${escapedTitle}"
slug: ${slug}
description: "${description}"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: ${post.date}
image: "${escapedImage}"
canonical: "${escapedUrl}"
---

`;

      const fullMarkdown =
        frontmatter +
        markdownContent;
      const filename = `${slug}.md`;
      const filepath =
        path.join(
          blogsDir,
          filename,
        );

      fs.writeFileSync(
        filepath,
        fullMarkdown,
        "utf-8",
      );
      console.log(
        `✅ ${filename} (${post.date})`,
      );
      successCount++;
    } catch (error) {
      console.error(
        `❌ Error processing ${post.title}:`,
        error instanceof
          Error
          ? error.message
          : String(
              error,
            ),
      );
      skipCount++;
    }
  }

  console.log(
    `\n✨ Done! Created ${successCount} posts, skipped ${skipCount} posts.`,
  );
}

async function main() {
  const urls =
    await fetchSitemap();

  if (
    urls.length ===
    0
  ) {
    console.log(
      "❌ No posts found in sitemap",
    );
    process.exit(
      1,
    );
  }

  console.log(
    "📥 Fetching post content...\n",
  );

  const posts: BlogPost[] =
    [];
  for (
    let i = 0;
    i <
    urls.length;
    i++
  ) {
    const url =
      urls[
        i
      ];
    const post =
      await fetchPostContent(
        url,
      );

    if (
      post
    ) {
      posts.push(
        post,
      );
      process.stdout.write(
        `\r📥 Progress: ${i + 1}/${urls.length}`,
      );
    }

    if (
      i <
      urls.length -
        1
    ) {
      await new Promise(
        (
          resolve,
        ) =>
          setTimeout(
            resolve,
            500,
          ),
      );
    }
  }

  console.log(
    `\n\n✅ Fetched ${posts.length} posts\n`,
  );

  await convertPostsToMarkdown(
    posts,
  );
}

main().catch(
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

# Blog Categorization Complete ✅

## All 83 Blog Posts Categorized by Title & Content

### Final Distribution

| Category | Count | Examples |
|----------|-------|----------|
| **Technical writer** | 64 | Environment Variables, React State, Tailwind Setup, GraphQL, NextJS, etc. |
| **My journey** | 10 | Laid Off & Hired, First Month Todo, Mentorship, Career Changes, Open Journal |
| **Idea** | 5 | Exploring Trends, Catching Up with AI, RFC, Understanding Patterns |
| **Opinions** | 4 | Managing State, Tips, How to Approach Interviews, Code Readability |

### Categorization Strategy

The script analyzes each blog post title and description for keywords:

#### 🎯 My journey (10 posts)
- Keywords: "laid off", "hired", "interview", "first month", "mentorship", "journey", "reflection", "nomad"
- Posts about personal/career experiences and learning

#### 💡 Idea (5 posts)
- Keywords: "exploring", "trends", "catching up", "rfc", "understanding", "future of", "passion"
- Posts about concepts, thoughts, and new approaches

#### 📚 Technical writer (64 posts)
- Keywords: "tutorial", "guide", "how to", "setup", "install", "react", "nextjs", "css", "implementation"
- Posts with practical tutorials and technical explanations

#### 💬 Opinions (4 posts)
- Keywords: "why i", "prefer", "should", "vs", "tips", "best", "advantages"
- Posts sharing thoughts and perspectives

### Quality Assurance

✅ **All 83 files validated**
✅ **Proper YAML frontmatter** on every file
✅ **All required fields present**: title, slug, description, category, author
✅ **No parsing errors**
✅ **Avatar**: Using your GitHub profile (github.com/naufaldi)

### File Structure

```yaml
---
title: "Post Title"
slug: auto-generated-slug
description: "First 160 chars of content"
category: "Technical writer" | "My journey" | "Idea" | "Opinions"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: YYYY-MM-DD
image: "Featured image URL"
canonical: "Original Ghost post URL"
---
```

### How It Works

1. **Scraping**: Uses Ghost sitemap to fetch all 83 posts (not limited by RSS 15-item limit)
2. **Conversion**: HTML → Clean Markdown using Turndown
3. **Categorization**: Script analyzes titles & descriptions to assign proper categories
4. **Metadata**: Generates frontmatter with all required fields

### Scripts

- `scripts/scrape-all-blog-posts.ts` - Main script to fetch and convert from Ghost
- `scripts/fix-and-categorize.ts` - Categorization and fixing script
- `scripts/convert-rss-to-md.ts` - Backup RSS-based script (limited to 15 posts)

### To Re-sync Later

```bash
cd /Users/mac/WebApps/projects/personal-web-v5
bun run scripts/scrape-all-blog-posts.ts
bun run scripts/fix-and-categorize.ts
```

---

**Status**: ✅ Ready to use
**Date**: Nov 13, 2025
**Total Posts**: 83
**Success Rate**: 100%

import { parseMarkdown, type BlogFrontmatter } from "@/lib/markdown";

export type BlogCategory =
  | "My journey"
  | "Idea"
  | "Technical writer"
  | "Opinions"
  | "draft";

export interface BlogItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: BlogCategory;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  image?: string;
  readTime?: number;
  content?: string;
  views?: number;
  likes?: number;
}

const markdownModules = import.meta.glob<string>("../content/blogs/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const loadBlogs = (): BlogItem[] => {
  const blogs: BlogItem[] = [];

  for (const path in markdownModules) {
    const markdownContent = markdownModules[path] as string;
    const parsed = parseMarkdown<BlogFrontmatter>(markdownContent);

    const readTime = parsed.content
      ? calculateReadTime(parsed.content)
      : parsed.frontmatter.readTime || 5;

    blogs.push({
      id: parsed.frontmatter.slug,
      title: parsed.frontmatter.title,
      description: parsed.frontmatter.description,
      slug: parsed.frontmatter.slug,
      category: parsed.frontmatter.category,
      author: parsed.frontmatter.author,
      date: parsed.frontmatter.date,
      image: parsed.frontmatter.image,
      readTime,
      content: parsed.content,
    });
  }

  return blogs.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

export const blogItems = loadBlogs();

export const getBlogBySlug = (slug: string): BlogItem | undefined => {
  return blogItems.find((blog) => blog.slug === slug);
};

export const getBlogsByCategory = (
  category: BlogCategory | "All"
): BlogItem[] => {
  if (category === "All") {
    return blogItems.filter((blog) => blog.category !== "draft");
  }
  return blogItems.filter((blog) => blog.category === category);
};

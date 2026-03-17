declare module "*.md" {
  import type { ComponentType } from "react";
  export const frontmatter: Record<string, unknown>;
  const MDXContent: ComponentType<{
    components?: Record<string, unknown>;
  }>;
  export default MDXContent;
}

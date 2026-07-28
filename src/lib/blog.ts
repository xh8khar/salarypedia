import postsData from "@/data/blog-posts.json";

export interface BlogSection {
  h: string;
  /** Body copy. Blank lines separate paragraphs. */
  b: string;
  /** Optional bullet list rendered after the body. */
  list?: string[];
}

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  /** Opening paragraphs, rendered as lead copy above the first heading. */
  intro?: string[];
  /** Short scannable summary shown near the top of the article. */
  takeaways?: string[];
  sections: BlogSection[];
  faq?: BlogFaq[];
  conclusion?: string;
}

export const posts = postsData as BlogPost[];

export function getPost(id: string): BlogPost | undefined {
  return posts.find((p) => p.id === id);
}

/** Splits body copy into paragraphs on blank lines. */
export function paragraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * Read time derived from the actual article body, so it stays honest as posts
 * are expanded rather than relying on the number stored in the JSON.
 */
export function readingTime(post: BlogPost): string {
  const parts = [
    ...(post.intro ?? []),
    ...(post.takeaways ?? []),
    ...post.sections.flatMap((s) => [s.h, s.b, ...(s.list ?? [])]),
    ...(post.faq ?? []).flatMap((f) => [f.q, f.a]),
    post.conclusion ?? "",
  ];
  const words = parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 225))} min read`;
}

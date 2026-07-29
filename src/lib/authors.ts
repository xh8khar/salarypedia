import authorsData from "@/data/authors.json";

export interface Author {
  /** "Person" carries far more E-E-A-T weight than "Organization". */
  type: "Person" | "Organization";
  name: string;
  slug: string;
  jobTitle: string;
  bio: string;
  credentials: string[];
  /** Profile URLs Google can use to corroborate the identity. */
  sameAs: string[];
}

interface AuthorsFile {
  default: string;
  authors: Record<string, Author>;
  reviewPolicy: string;
  lastReviewed: string;
}

const data = authorsData as unknown as AuthorsFile;

export const reviewPolicy = data.reviewPolicy;
export const lastReviewed = data.lastReviewed;

export function getAuthor(slug?: string): Author {
  return data.authors[slug ?? data.default] ?? data.authors[data.default];
}

/**
 * schema.org author node. Person and Organization take the same core fields,
 * but only Person gets jobTitle — Organization uses description instead.
 */
export function authorSchema(author: Author, siteUrl: string) {
  const url = `${siteUrl}/about`;
  return author.type === "Person"
    ? {
        "@type": "Person",
        name: author.name,
        jobTitle: author.jobTitle,
        description: author.bio,
        url,
        ...(author.sameAs.length ? { sameAs: author.sameAs } : {}),
      }
    : {
        "@type": "Organization",
        name: author.name,
        description: author.bio,
        url,
        ...(author.sameAs.length ? { sameAs: author.sameAs } : {}),
      };
}

/** Initials for the avatar badge, capped at two characters. */
export function authorInitials(name: string): string {
  return name
    .replace(/[^A-Za-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

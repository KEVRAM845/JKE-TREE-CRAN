import { PageTransition } from "@/components/motion/PageTransition";

// App Router re-mounts template.tsx on every navigation (unlike layout.tsx),
// so this gives every route change the same subtle fade/rise already used
// for in-page section reveals.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}

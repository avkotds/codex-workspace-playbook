import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codex Workspace Playbook",
  description: "A beginner-friendly guide to connecting projects, knowledge, a Workspace Manager, threads, and sub-agents.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Codex Workspace Playbook", description: "Turn one folder into a working AI team.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Codex Workspace Playbook", description: "Turn one folder into a working AI team.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

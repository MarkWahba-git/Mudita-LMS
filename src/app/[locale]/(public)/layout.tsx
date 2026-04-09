import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HelpProvider } from "@/components/help/help-provider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <HelpProvider />
    </>
  );
}

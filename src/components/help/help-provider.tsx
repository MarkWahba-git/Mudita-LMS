import { getPublishedArticles } from "@/services/help.service";
import { HelpPanel } from "@/components/help/help-panel";

export async function HelpProvider() {
  const articles = await getPublishedArticles();
  return <HelpPanel articles={articles} />;
}

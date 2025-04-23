import { remark } from "remark";
import html from "remark-html";
import sanitizeHtml from "sanitize-html";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  const processedContent = await remark().use(html).process(markdown);
  const rawHtml = processedContent.toString();

  // XSS対策でサニタイズ（スクリプトの埋め込みを防ぐ）
  return sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height"],
    },
  });
}

export function convertHtmlToMarkdown(html: string) {
  const markdown = unified()
    .use(rehypeParse, { fragment: true }) // HTML をパース
    .use(rehypeRemark) // HTML → Markdown 変換
    .use(remarkStringify) // Markdown を文字列化
    .processSync(html)
    .toString();

  return markdown;
}

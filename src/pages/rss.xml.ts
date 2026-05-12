import rss from "@astrojs/rss";
import { getCollection, render } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { siteConfig } from "../shared/siteConfig";
import sanitizeHtml from "sanitize-html";

export async function GET(context: { site: URL }) {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const container = await AstroContainer.create();
  const siteUrl = context.site.toString().replace(/\/$/, "");

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      const rawHtml = await container.renderToString(Content);

      const postUrl = `${siteUrl}/${post.id}/`;
      const absolutised = rawHtml
        .replace(/(src|href)="\/([^/"][^"]*)"/g, `$1="${siteUrl}/$2"`)
        .replace(/(src|href)="\.\/([^"]*)"/g, `$1="${postUrl}$2"`);

      const cleaned = sanitizeHtml(absolutised, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
          "img",
          "figure",
          "figcaption",
          "picture",
          "source",
          "iframe",
        ]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ["src", "alt", "title", "width", "height", "loading"],
          source: ["src", "srcset", "type", "media", "sizes"],
          iframe: [
            "src",
            "width",
            "height",
            "title",
            "allow",
            "allowfullscreen",
            "frameborder",
            "referrerpolicy",
          ],
          "*": ["class", "id", "style"],
        },
        allowedIframeHostnames: [
          "www.youtube.com",
          "www.youtube-nocookie.com",
          "youtube.com",
          "player.vimeo.com",
        ],
      });

      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/${post.id}/`,
        content: cleaned,
      };
    }),
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items,
  });
}

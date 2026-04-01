import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypeFigure from '../../src/plugins/rehype-figure.mjs';

async function process(markdown: string, filePath: string = '') {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeFigure)
    .use(rehypeStringify)
    .process({ value: markdown, history: filePath ? [filePath] : [] });
  return String(result);
}

describe('rehype-figure', () => {
  it('transforms a figure with src into an img wrapped in a link', async () => {
    const input = '<figure src="test.png" alt="a test image">caption text</figure>';
    const output = await process(input, '/project/src/content/blog/2024-01/my-post/index.md');

    expect(output).toContain('<img src="/_figure-images/2024-01/my-post/test.png"');
    expect(output).toContain('alt="a test image"');
    expect(output).toContain('<figcaption>caption text</figcaption>');
    expect(output).toContain('id="content-figure"');
  });

  it('applies width from the figure attribute', async () => {
    const input = '<figure src="img.png" width="50%">cap</figure>';
    const output = await process(input, '/project/src/content/blog/2024-01/post/index.md');

    expect(output).toContain('width: 50%');
  });

  it('defaults width to 100%', async () => {
    const input = '<figure src="img.png">cap</figure>';
    const output = await process(input, '/project/src/content/blog/2024-01/post/index.md');

    expect(output).toContain('width: 100%');
  });

  it('wraps the image in a link that opens in a new tab', async () => {
    const input = '<figure src="photo.jpg">text</figure>';
    const output = await process(input, '/project/src/content/blog/2024-01/post/index.md');

    expect(output).toContain('<a href="/_figure-images/2024-01/post/photo.jpg"');
    expect(output).toContain('target="_blank"');
    expect(output).toContain('rel="noreferrer"');
  });

  it('handles figures without captions', async () => {
    const input = '<figure src="img.png"></figure>';
    const output = await process(input, '/project/src/content/blog/2024-01/post/index.md');

    expect(output).toContain('<img src="/_figure-images/2024-01/post/img.png"');
    expect(output).not.toContain('<figcaption>');
  });

  it('leaves regular figures without src unchanged', async () => {
    const input = '<figure><img src="something.png"><figcaption>hi</figcaption></figure>';
    const output = await process(input, '/project/src/content/blog/2024-01/post/index.md');

    expect(output).not.toContain('content-figure');
    expect(output).toContain('<figure>');
  });

  it('sets lazy loading on the image', async () => {
    const input = '<figure src="img.png">cap</figure>';
    const output = await process(input, '/project/src/content/blog/2024-01/post/index.md');

    expect(output).toContain('loading="lazy"');
  });
});

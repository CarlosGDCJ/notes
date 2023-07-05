import { visit } from 'unist-util-visit';
import relativeImages from 'mdsvex-relative-images';
import slugPlugin from 'rehype-slug';
import remarkHeadings from '@vcarl/remark-headings';
import autolinkHeadings from 'rehype-autolink-headings';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
    extensions: ['.svelte.md', '.md', '.svx'],

    smartypants: {
        dashes: 'oldschool'
    },
    remarkPlugins: [videos, relativeImages, headings],
    rehypePlugins: [
        slugPlugin,
        [
            autolinkHeadings,
            {
                behavior: 'wrap'
            }
        ]
    ]
});
/**
 * Adds support to video files in markdown image links
 */
function videos() {
    const extensions = ['mp4', 'webm'];
    return function transformer(tree) {
        visit(tree, 'image', (node) => {
            if (extensions.some((ext) => node.url.endsWith(ext))) {
                node.type = 'html';
                node.value = `
            <video 
              src="${node.url}"
              autoplay
              muted
              playsinline
              loop
              title="${node.alt}"
            />
          `;
            }
        });
    };
}

/**
 * Parses headings and includes the result in metadata
 */
function headings() {
    return function transformer(tree, vfile) {
        // run remark-headings plugin
        remarkHeadings()(tree, vfile);

        // include the headings data in mdsvex frontmatter
        vfile.data.fm ??= {};
        vfile.data.fm.headings = vfile.data.headings.map((heading) => ({
            ...heading,
            // slugify heading.value
            id: heading.value
                .toLowerCase()
                .replace(/\s/g, '-')
                .replace(/[^a-z0-9-]/g, '')
        }));
    };
}
export default config;

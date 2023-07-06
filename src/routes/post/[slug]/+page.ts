/**
 * Dynamically loads the svelte component for the post (only possible in +page.js)
 * and pass on the data from +page.server.js
 */
export async function load({ data }) {
    // load the markdown file based on slug
    const component = data.post.isIndexFile
        ? // vite requires relative paths and explicit file extensions for dynamic imports
          // see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
          await import(`../../../../posts/${data.post.slug}/index.${data.post.fileExtension}`)
        : await import(`../../../../posts/${data.post.slug}.${data.post.fileExtension}`);

    return {
        post: data.post,
        component: component.default,
        layout: {
            fullWidth: true
        }
    };
}

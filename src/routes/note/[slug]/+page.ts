/**
 * Dynamically loads the svelte component for the note (only possible in +page.js)
 * and pass on the data from +page.server.js
 */
export async function load({ data }) {
    // load the markdown file based on slug
    const component = data.note.isIndexFile
        ? // vite requires relative paths and explicit file extensions for dynamic imports
          // see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
          await import(`../../../../notes/${data.note.slug}/index.${data.note.fileExtension}`)
        : await import(`../../../../notes/${data.note.slug}.${data.note.fileExtension}`);

    return {
        note: data.note,
        component: component.default,
        layout: {
            fullWidth: true
        }
    };
}

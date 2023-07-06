import { browser } from '$app/environment';
import { format } from 'date-fns';
import { parse } from 'node-html-parser';
import readingTime from 'reading-time';

// we require some server-side APIs to parse all metadata
if (browser) {
    throw new Error(`notes can only be imported server-side`);
}

// Get all notes and add metadata
export const notes = Object.entries(
    import.meta.glob(['/notes/**/*.md', '/notes/**/*.svx'], { eager: true })
)
    .map(([filepath, note]) => {
        const html = parse(note.default.render().html);
        const preview = note.metadata.preview
            ? parse(note.metadata.preview)
            : html.querySelector('p');

        const slug = filepath
            .replace(/(\/index)?\.(md|svx)/, '')
            .split('/')
            .pop();

        return {
            ...note.metadata,

            // generate the slug from the file path
            slug: filepath
                .replace(/(\/index)?\.(md|svx)/, '')
                .split('/')
                .pop(),

            // whether or not this file is `my-note.md` or `my-note/index.md`
            // (needed to do correct dynamic import in notes/[slug].svelte)
            isIndexFile: filepath.endsWith('/index.md') || filepath.endsWith('/index.svx'),

            fileExtension: filepath.split('.').pop(),

            // format date as yyyy-MM-dd
            date: note.metadata.date
                ? format(
                      // offset by timezone so that the date is correct
                      addTimezoneOffset(new Date(note.metadata.date)),
                      'yyyy-MM-dd'
                  )
                : undefined,

            preview: {
                html: preview.toString(),
                // text-only preview (i.e no html elements), used for SEO
                text: preview.structuredText ?? preview.toString()
            },

            // get estimated reading time for the note
            readingTime: readingTime(html.structuredText).text
        };
    })
    // sort by date
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    // add references to the next/previous note
    .map((note, index, allNotes) => ({
        ...note,
        next: allNotes[index - 1],
        previous: allNotes[index + 1]
    }));

function addTimezoneOffset(date) {
    const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
    return new Date(new Date(date).getTime() + offsetInMilliseconds);
}

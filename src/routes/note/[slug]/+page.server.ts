import { notes } from '$lib/data/notes';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const { slug } = params;

    // get note with metadata
    const note = notes.find((note) => slug === note.slug);

    if (!note) {
        throw error(404, 'Note not found');
    }

    return {
        note
    };
}

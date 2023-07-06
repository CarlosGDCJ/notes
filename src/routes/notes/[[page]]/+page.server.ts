import { notes } from '$lib/data/notes';
import { paginate } from '$lib/util';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    let page = params.page ? parseInt(params.page) : 1;
    let limit = 10;

    const notesForPage = paginate(notes, { limit, page });

    // if page doesn't exist, 404
    if (notesForPage.length === 0 && page > 1) {
        throw error(404, 'Page not found');
    }

    return {
        notes: notesForPage,
        page,
        limit
    };
}

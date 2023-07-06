import { notes } from '$lib/data/notes';

export async function load() {
    return {
        notes: notes.slice(0, 5)
    };
}

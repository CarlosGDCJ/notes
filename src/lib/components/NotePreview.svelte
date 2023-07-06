<script>
    import Card from './Card.svelte';
    import ArrowRightIcon from './ArrowRightIcon.svelte';
    import { base } from '$app/paths';

    export let note;
</script>

<Card href={`${base}/note/${note.slug}`} data-sveltekit-prefetch>
    <slot slot="eyebrow" name="eyebrow" />
    <slot slot="title">{note.title}</slot>
    <div slot="description" class="prose dark:prose-invert">
        {@html note.preview.html}
    </div>
    <div slot="actions">
        <div class="flex items-center text-teal-500">
            <span class="text-sm font-medium">Read</span>
            <ArrowRightIcon class="w-4 h-4 ml-1" />
        </div>
    </div>
</Card>

<style>
    .prose > :global(p) {
        margin-top: 0;
        margin-bottom: 0;
    }
</style>

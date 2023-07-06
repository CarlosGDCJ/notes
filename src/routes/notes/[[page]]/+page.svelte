<script>
    import { name } from '$lib/info.js';
    import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte';
    import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte';
    import NotesList from '$lib/components/NotesList.svelte';
    import { base } from '$app/paths';

    export let data;

    $: isFirstPage = data.page === 1;
    $: hasNextPage = data.notes[data.notes.length - 1]?.previous;
</script>

<svelte:head>
    <title>{name} | Notes</title>
</svelte:head>

<div class="flex flex-col flex-grow">
    <header class="pt-4">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">All notes</h1>
        <p class="mt-6">All of my written content collected in one place</p>
    </header>

    <div class="mt-16 sm:mt-20">
        <NotesList notes={data.notes} />
    </div>

    <!-- pagination -->
    <div class="flex items-center justify-between pt-16 pb-8">
        {#if !isFirstPage}
            <a href={`${base}/notes/${data.page - 1}`} data-sveltekit-prefetch>
                <ArrowLeftIcon class="w-4 h-4" />
                Previous
            </a>
        {:else}
            <div />
        {/if}

        {#if hasNextPage}
            <a href={`${base}/notes/${data.page + 1}`} data-sveltekit-prefetch
                >Next
                <ArrowRightIcon class="w-4 h-4" />
            </a>
        {/if}
    </div>
</div>

<style>
    a {
        @apply flex items-center gap-2 font-medium text-zinc-700;
    }

    :global(.dark) a {
        @apply text-zinc-300;
    }
</style>

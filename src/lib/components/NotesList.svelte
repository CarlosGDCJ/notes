<script>
    import NotePreview from '$lib/components/NotePreview.svelte';
    import NoteDate from '$lib/components/NoteDate.svelte';

    export let notes;
</script>

<div class="flex flex-col gap-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
    {#each notes as note}
        <article class="grid items-start grid-cols-4 gap-8">
            <NoteDate class="flex-col hidden md:flex text-sm" {note} />

            <div class="col-span-4 md:col-span-3">
                <NotePreview {note}>
                    <slot slot="eyebrow">
                        <NoteDate class="md:hidden" {note} collapsed decorate />
                    </slot>
                </NotePreview>
            </div>
        </article>
    {/each}
</div>

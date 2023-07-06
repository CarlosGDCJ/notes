<script>
    import { website, name, description } from '$lib/info.js';
    import ToC from '$lib/components/ToC.svelte';
    import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte';
    import SocialLinks from '$lib/components/SocialLinks.svelte';
    import { afterNavigate } from '$app/navigation';
    import NoteDate from '$lib/components/NoteDate.svelte';
    import { base } from '$app/paths';

    export let data;

    // generated open-graph image for sharing on social media.
    // see https://og-image.vercel.app/ for more options.
    const ogImage = `https://og-image.vercel.app/**${encodeURIComponent(
        data.note.title
    )}**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`;

    const url = `${website}/${data.note.slug}`;

    // if we came from /notes, we will use history to go back to preserve
    // notes pagination
    let canGoBack = false;
    afterNavigate(({ from }) => {
        if (from && from.url.pathname.startsWith(`${base}/notes`)) {
            canGoBack = true;
        }
    });

    function goBack() {
        if (canGoBack) {
            history.back();
        }
    }
</script>

<svelte:head>
    <title>{data.note.title} - {name}</title>
    <meta name="description" content={data.note.preview.text} />
    <meta name="author" content={name} />

    <!-- Facebook Meta Tags -->
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={data.note.title} />
    <meta property="og:description" content={data.note.preview.text} />
    <meta property="og:image" content={ogImage} />

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content={website} />
    <meta property="twitter:url" content={url} />
    <meta name="twitter:title" content={data.note.title} />
    <meta name="twitter:description" content={data.note.preview.text} />
    <meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="root max-w-2xl mx-auto lg:max-w-none">
    <div class="hidden lg:block pt-8">
        <div class="sticky top-0 w-full flex justify-end pt-11 pr-8">
            <svelte:element
                this={canGoBack ? 'button' : 'a'}
                class="items-center justify-center hidden w-10 h-10 mb-8 transition bg-white rounded-full shadow-md -top-1 -left-16 lg:flex group shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:focus-visible:ring-2 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
                href={canGoBack ? undefined : `${base}/notes`}
                aria-label="Go back to notes"
                on:click={goBack}
                on:keydown={goBack}
            >
                <ArrowLeftIcon
                    class="w-4 h-4 transition stroke-zinc-500 group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
                />
            </svelte:element>
        </div>
    </div>

    <div class="w-full mx-auto overflow-x-hidden">
        <article>
            <header class="flex flex-col">
                <h1
                    class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
                >
                    {data.note.title}
                </h1>
                <NoteDate class="text-sm sm:text-base" note={data.note} decorate collapsed />
            </header>

            <!-- render the note -->
            <div class="prose dark:prose-invert">
                <svelte:component this={data.component} />
            </div>
        </article>

        <!-- bio -->
        <hr />
        <div class="py-8">
            <div class="grid gap-8">
                <div class="flex justify-center order-1 col-span-2 gap-6 md:order-2">
                    <SocialLinks />
                </div>
                <p class="order-3 text-base text-zinc-600 dark:text-zinc-400">
                    {description}
                </p>
            </div>
        </div>
    </div>

    <!-- table of contents -->
    <div class="hidden xl:block pt-10">
        <aside class="sticky hidden w-48 ml-8 xl:block top-8" aria-label="Table of Contents">
            <ToC note={data.note} />
        </aside>
    </div>
</div>

<style lang="postcss">
    .root {
        display: grid;
        grid-template-columns: 1fr;
    }

    @media screen(lg) {
        .root {
            /* 42rem matches max-w-2xl */
            grid-template-columns: 1fr 42rem 1fr;
        }
    }
</style>

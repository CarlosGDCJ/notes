<script>
    import { base } from '$app/paths';
    import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte';
    import PostsList from '$lib/components/PostsList.svelte';
    import SocialLinks from '$lib/components/SocialLinks.svelte';
    import { description, name } from '$lib/info.js';

    export let data;
</script>

<svelte:head>
    <title>{name}</title>
    <meta name="description" content={description} />
</svelte:head>

<div class="flex flex-col flex-grow gap-8 pb-16">
    <!-- bio -->
    <section class="flex flex-col items-center gap-16 pt-8 pb-16">
        <div class="flex flex-col items-center w-full gap-6 rounded-lg">
            <p class="text-base text-zinc-600 dark:text-zinc-400">
                {description}
            </p>
            <div class="flex gap-6">
                <SocialLinks />
            </div>
        </div>
    </section>
    <section class="w-full">
        <div class="flex items-center justify-between gap-4 mb-8">
            <h2 class="text-sm font-medium sm:text-base text-zinc-500 dark:text-zinc-400">
                Recently Published
            </h2>
            <a href="{base}/posts" class="flex items-center gap-1 text-sm font-medium text-teal-500"
                >View All <ArrowRightIcon class="w-4 h-4" /></a
            >
        </div>
        <PostsList posts={data.posts} />
    </section>
</div>

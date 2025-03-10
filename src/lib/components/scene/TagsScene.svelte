<script lang="ts">
	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	import Button from '../Button.svelte';
	import CreateTag from '../CreateTag.svelte';
	import { localTags, tracksByTag } from '$lib/user_data.svelte';
	import Tag from '../Tag.svelte';
	import { type Tag as TagType } from '$lib/user_data.svelte';
	import TrackList from '../TrackList.svelte';

	type View = 'none' | 'createTag' | 'browseContent';
	let view = $state<View>('none');
	function navTo(v: View) {
		console.log('Navigating to', v);
		view = v;
	}
	let selectedTag = $state<TagType['localId'] | null>(null);
    let browseContentTitle = $state<string | null>(null);
	let editMode = $state(false);
	$inspect(selectedTag);
</script>

<div class="container">
	<aside>
		<Button variant="primary" label="Create a tag" onclick={() => navTo('createTag')} />
			<Button variant="secondary" label={editMode? "Finish editing tags" : "Edit tags"} onclick={() => {editMode = !editMode}} />
		<div class="list">
			<h2>Local tags</h2>
			{#each localTags.value as tag}
				<Tag
					mode="display"
                    size="medium"
					{tag}
					onclick={() => {
                        browseContentTitle = tag.name;
						selectedTag = tag.localId;
						navTo('browseContent');
					}}
				/>
			{/each}
		</div>
	</aside>
	<div class="main">
		{#if view === 'createTag'}
			<CreateTag />
		{:else if view === 'browseContent'}
			<h1>{browseContentTitle}</h1>
            {#if selectedTag !== null}
                {@const tracks = tracksByTag(selectedTag).value}
                <p>{tracks.length} tracks</p>
                <div class="track-list-container">
                    <TrackList {editMode} tracks={tracks} />
                </div>
            {/if}
		{:else if view === 'none'}
			<h1>Tags</h1>
			<p>Pick a tag on the left or create a tag to get started.</p>
		{/if}
	</div>
</div>

<style>
	.container {
        width: 100%;
        height: 100%;
        overflow: hidden;
		display: flex;
	}

	aside {
		width: max(200px, 20vw);
        height: 100%;
        overflow: hidden;
		flex: 0 0 auto;
        display: flex;
        flex-direction: column;
		gap: 1rem;
	}

	.list {
		background-color: var(--secondary-800);
		border-radius: 4px;
		padding: 1rem;
        flex: 1 1 auto;
        overflow-y: auto;
	}
	.list > h2 {
		font-size: 1.3rem;
		margin-bottom: 0.5em;
	}

	.main {
		flex: 1 1 auto;
        min-width: 0;
		margin-left: 2rem;

        display: flex;
        flex-direction: column;
	}
    .main > *:not(h1):not(p) {
        flex: 1 1 auto;
        min-height: 0;
        overflow: hidden;
    }
</style>

<script lang="ts">
	import { tagByLocalId, tagsOperation, type Track } from '$lib/user_data.svelte';
	import Tag from './Tag.svelte';

	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	interface Props {
		track: Track;
	}

	let { track }: Props = $props();
	interface EditionState {
		present: string[];
		notPresent: string[];
		notCategorized: string[];
	}
	let editionState = $state<EditionState>({
		present: [],
		notPresent: [],
		notCategorized: []
	});

	$effect(() => {
		editionState.present = [...track.tags];
		editionState.notPresent = tagsOperation.not(track.tags);
		editionState.notCategorized = [];
	});
</script>

{#snippet tagList(tags: string[])}
	{#each tags as t}
		{@const tagObj = tagByLocalId(t).value}
		{#if tagObj !== undefined}
			<Tag editMode tag={tagObj} size="medium" />
		{/if}
	{/each}
{/snippet}

<fieldset>
	<legend>Present:</legend>
    {@render tagList(editionState.present)}
</fieldset>
<fieldset>
	<legend>Not present:</legend>
    {@render tagList(editionState.notPresent)}
</fieldset>
<fieldset>
	<legend>Not categorized:</legend>
    {@render tagList(editionState.notCategorized)}
</fieldset>

<style>
	fieldset {
		border-radius: 8px;
		padding: 1rem;
		margin-bottom: 1rem;
        max-height: 150px;
        overflow-y: scroll;
	}
	legend {
		padding: 0.25em;
		font-weight: bold;
	}
</style>

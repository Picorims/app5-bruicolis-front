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
		onTagListChanged?: (tags: string[]) => void;
	}

	let { track, onTagListChanged }: Props = $props();
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

	function addTag(tag: string) {
		if (editionState.present.includes(tag)) {
			return;
		}
		removeFromArrayIfExists(editionState.notPresent, tag);
		removeFromArrayIfExists(editionState.notCategorized, tag);
		addFromArrayIfNotExists(editionState.present, tag);

		onTagListChanged?.([...editionState.present]);
	}

	function removeTag(tag: string) {
		if (editionState.notPresent.includes(tag)) {
			return;
		}
		removeFromArrayIfExists(editionState.present, tag);
		removeFromArrayIfExists(editionState.notCategorized, tag);
		addFromArrayIfNotExists(editionState.notPresent, tag);
	
		onTagListChanged?.([...editionState.present]);
	}

	function removeFromArrayIfExists<T>(array: T[], v: T) {
		const index = array.indexOf(v);
		if (index !== -1) {
			array.splice(index, 1);
		}
	}
	function addFromArrayIfNotExists<T>(array: T[], v: T) {
		if (!array.includes(v)) {
			array.push(v);
		}
	}
	function commit() {
		track.tags = editionState.present;
	}
</script>

{#snippet tagList(tags: string[], canEditAdd: boolean, canEditRemove: boolean)}
	{#each tags as t}
		{@const tagObj = tagByLocalId(t).value}
		{#if tagObj !== undefined}
			<Tag
				{canEditAdd}
				{canEditRemove}
				tag={tagObj}
				size="medium"
				onAddClick={() => addTag(t)}
				onRemoveClick={() => removeTag(t)}
			/>
		{/if}
	{/each}
{/snippet}

<fieldset>
	<legend>Present:</legend>
	{@render tagList(editionState.present, false, true)}
</fieldset>
<fieldset>
	<legend>Not present:</legend>
	{@render tagList(editionState.notPresent, true, false)}
</fieldset>
<fieldset>
	<legend>Not categorized:</legend>
	{@render tagList(editionState.notCategorized, true, true)}
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

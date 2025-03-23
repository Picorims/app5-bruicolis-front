<script lang="ts">
	import { addLocalTag, localTagExists } from '$lib/user_data.svelte';
	import Button from './Button.svelte';
	import { type Tag as TagType } from '$lib/user_data.svelte';
	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	let previewTag = $state<TagType>({
		name: "",
		color: "#000000",
		localId: '',
		type: 'local'
	});
	import LabeledContainer from './LabeledContainer.svelte';
	import Tag from './Tag.svelte';
	function createTag() {
		if (previewTag.name === '') {
			alert('Please enter a name');
			return;
		}
		if (localTagExists(previewTag.name)) {
			alert('A tag with this name already exists');
			return;
		}
		addLocalTag(previewTag.name, previewTag.color);
		alert('Tag created');
		previewTag.name = '';
		previewTag.color = '#000000';
	}
	$inspect(previewTag);
</script>

<div class="container">
	<h1>Create a tag</h1>
	<LabeledContainer label="Name">
		<input type="text" bind:value={previewTag.name} />
	</LabeledContainer>
	<LabeledContainer label="Color">
		<input type="color" bind:value={previewTag.color} />
	</LabeledContainer>
	<LabeledContainer label="Preview">
		<Tag size="medium" tag={previewTag} />
	</LabeledContainer>
	<Button variant="secondary" label="Create" onclick={createTag} />
</div>

<style>
	.container {
		padding: 1rem;
	}
</style>

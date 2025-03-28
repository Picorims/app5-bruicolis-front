<script lang="ts">
	import {
		removeTagFromTrack,
		tagByLocalId,
		type LocalTag,
		type Track
	} from '$lib/user_data.svelte';
	import { Plus } from 'lucide-svelte';
	import Button from './Button.svelte';
	import Tag from './Tag.svelte';
	import Dialog from './Dialog.svelte';
	import TrackTagEditor from './TrackTagEditor.svelte';

	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	interface Props {
		tracks: Track[];
		editMode: boolean;
	}

	let { tracks, editMode }: Props = $props();
	interface TagState {
		active: boolean;
		track: Track | null;
		tagsToCommit: string[] | null;
	}
	let editTagState = $state<TagState>({
		active: false,
		track: null,
		tagsToCommit: null,
	});

	function tagDialogOnConfirm() {
		if (editTagState.track && editTagState.tagsToCommit) {
			editTagState.track.tags = editTagState.tagsToCommit;
		} else {
			console.warn("Did not expect null track or tag list after tag edition.");
		}
		disableTagEdition();
	}
	function tagDialogOnCancel() {
		disableTagEdition();
	}
	function disableTagEdition() {
		editTagState.active = false;
		editTagState.tagsToCommit = null;
		editTagState.track = null;
	}
	function editTrackTags(track: Track) {
		editTagState.track = track;
		editTagState.tagsToCommit = track.tags;
		editTagState.active = true;
	}
</script>

<div role="list" class="list">
	{#each tracks as track}
		<div class="list-item" role="listitem">
			<div class="meta">
				<span class="title">{track.title}</span>
				<span class="artist">{track.artists.join(', ')}</span>
			</div>
			<div class="tags">
				{#each track.tags as t}
					{@const tag = tagByLocalId(t).value}
					{#if tag !== undefined}
						<Tag
							size="small"
							noMargin
							limitSize
							canEditRemove={editMode}
							{tag}
							onRemoveClick={() => removeTagFromTrack(tag, track)}
						/>
					{/if}
				{/each}
				{#if editMode}
					<Button variant="secondary" iconMode onclick={() => editTrackTags(track)}><Plus /></Button
					>
				{/if}
			</div>
		</div>
	{/each}
</div>

<Dialog
	open={editTagState.active}
	onconfirm={tagDialogOnConfirm}
	oncancel={tagDialogOnCancel}
	title={`Editing tags of: ${editTagState.track?.title}`}
>
	{#if editTagState.track !== null}
		<TrackTagEditor track={editTagState.track} onTagListChanged={(tags) => editTagState.tagsToCommit = tags} />
	{/if}
</Dialog>

<style>
	.list {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		border-radius: 4px;
	}

	.list-item {
		width: 100%;
		overflow: hidden;
		margin-bottom: 0.5em;
		padding: 0.25em;
		font-size: 1rem;
		border-radius: 4px;

		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0 1em;

		transition: background-color 0.1s;
		cursor: pointer;

		background-color: var(--secondary-950);
	}

	.list-item:hover {
		background-color: var(--secondary-800);
	}
	.list-item > * {
		flex: 1 1 auto;
		min-width: 0;
	}

	.meta {
		padding: 0.25em;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.title,
	.artist {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.artist {
		font-size: 0.8rem;
		color: var(--secondary-300);
	}

	.tags {
		/* max-width: 520px; */
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.35em;
	}
</style>

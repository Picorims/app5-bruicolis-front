<script lang="ts">
	import type { Tag as TagType } from '$lib/user_data.svelte';
	import { X } from 'lucide-svelte';

	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	interface Props {
		tag: TagType;
		mode: 'display' | 'edit';
		noMargin?: boolean;
		limitSize?: boolean;
		size: 'small' | 'medium';
		onclick?: () => void;
		onCrossClick?: () => void;
		editMode?: boolean;
	}

	let { tag, mode, noMargin, limitSize, size, onclick, onCrossClick, editMode = false }: Props = $props();
	const MAX_LENGTH = 20;
	let text = $derived(() => {
		let t = tag.name;
		if (limitSize && t.length > MAX_LENGTH) {
			t = t.slice(0, MAX_LENGTH) + '...';
		}
		return t;
	});
</script>

<div
	class="tag"
	class:small={size === 'small'}
	class:medium={size === 'medium'}
	class:noMargin
	style="background-color: color-mix(in srgb, {tag.color}, black 70%); border-color: {tag.color}; cursor: {onclick ===
	undefined
		? 'default'
		: 'pointer'}"
	role={onclick === undefined ? 'none' : 'button'}
	{onclick}
>
	<span class="text">
		{text()}
	</span>
	{#if editMode}
		<button class="cross-btn" onclick={onCrossClick}><X/></button>
	{/if}
</div>

<style>
	.tag {
		font-size: 1rem;
		font-weight: 700;
		text-shadow: 0 0 2px black;
		padding: 0.25em 0.5em;
		margin-right: 0.65em;
		margin-bottom: 0.65em;
		border-radius: 4px;
		border-bottom: 2px solid;

		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
	}

	.tag.noMargin {
		margin-right: 0;
		margin-bottom: 0;
	}
	.tag.small {
		font-size: 0.8rem;
	}
    .text {
        opacity: 0.8;
    }
	.cross-btn {
		width: 1em;
		height: 1em;
		border: none;
		background-color: transparent;
		color: white;
		opacity: 0.8;
		cursor: pointer;
		position: relative;
	}
	.cross-btn > :global(svg) {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.cross-btn:hover {
		opacity: 1;
		background-color: var(--background-50);
		color: black;
		border-radius: 2px;
	}
</style>

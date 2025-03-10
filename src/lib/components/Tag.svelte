<script lang="ts">
	import type { Tag as TagType } from '$lib/user_data.svelte';

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
	}

	let { tag, mode, noMargin, limitSize, size, onclick }: Props = $props();
	const MAX_LENGTH = 16;
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
</div>

<style>
	.tag {
		font-size: 1rem;
		font-weight: 700;
		text-shadow: 0 0 2px black;
		display: inline-block;
		padding: 0.25em 0.5em;
		margin-right: 0.65em;
		margin-bottom: 0.65em;
		border-radius: 4px;
		border-bottom: 2px solid;
	}

	.tag.noMargin {
		margin-right: 0;
		margin-bottom: 0;
	}
	.tag.small {
		font-size: 0.7rem;
	}
    .text {
        opacity: 0.8;
    }
</style>

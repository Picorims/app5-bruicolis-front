<script lang="ts">
	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	import { Icon as IconType } from 'lucide-svelte';
	import type { Component } from 'svelte';
	interface Props {
		title: string;
		Icon: typeof IconType;
		onclick: () => void;
		focused: boolean;
	}

	let { title, Icon, onclick, focused }: Props = $props();
</script>

<div
	class="container"
	role="button"
	tabindex="0"
	{onclick}
	onkeydown={(e) => {
		if (e.key === 'Enter') onclick();
	}}
	class:focused
>
	<Icon />
	<span class="title">{title}</span>
</div>

<style>
	.container {
		padding: 0.5em 1em;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.container:hover {
		background-color: var(--secondary);
		color: var(--text);
		cursor: pointer;
	}
	.container.focused {
		color: var(--primary);
	}
	.title {
		font-size: 1.2rem;
		margin-left: 0.25em;
		font-weight: 900;
	}
</style>

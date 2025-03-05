<script lang="ts">
	import type { Component } from 'svelte';
	import type { Scene } from './Nav.svelte';
	import AboutScene from './scene/AboutScene.svelte';
	import HomeScene from './scene/HomeScene.svelte';
	import SearchScene from './scene/SearchScene.svelte';
	import TagsScene from './scene/TagsScene.svelte';

	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	interface Props {
		scene: Scene;
	}

	let { scene }: Props = $props();

    let scenes: Record<Scene, Component> = {
        about: AboutScene,
        home: HomeScene,
        search: SearchScene,
        tags: TagsScene,
    }
</script>

<div class="container">
	{@render sceneSnippet(scene)}
</div>

{#snippet sceneSnippet(scene: Scene)}
    {@const SceneComponent = scenes[scene]}
    <SceneComponent></SceneComponent>
{/snippet}

<style>
	.container {
		flex: 1 1 auto;
		padding: 2em;
	}
</style>

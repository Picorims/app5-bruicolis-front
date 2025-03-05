<script module>
	export type Scene = 'home' | 'search' | 'tags' | 'about';
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import NavItem from './NavItem.svelte';
	import { House, Search, Tag, CircleHelp } from 'lucide-svelte';

	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	interface Props {
        defaultScene: Scene;
        onNav: (scene: Scene) => void;
    }

    let { onNav, defaultScene }: Props = $props(); 

	let focused: Scene = $state(defaultScene);
    
	function navTo(scene: Scene) {
        focused = scene;
        onNav(scene);
	}
    onMount(() => {
        navTo(defaultScene);
    });
</script>

<div class="container">
	<NavItem title="Home" Icon={House} focused={focused === 'home'} onclick={() => navTo('home')}
	></NavItem>
	<NavItem
		title="Search"
		Icon={Search}
		focused={focused === 'search'}
		onclick={() => navTo('search')}
	></NavItem>
	<NavItem title="Tags" Icon={Tag} focused={focused === 'tags'} onclick={() => navTo('tags')}
	></NavItem>
	<NavItem
		title="About"
		Icon={CircleHelp}
		focused={focused === 'about'}
		onclick={() => navTo('about')}
	></NavItem>
</div>

<style>
	.container {
		width: 100%;
		background-color: var(--secondary-900);
		flex: 0 0 auto;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>

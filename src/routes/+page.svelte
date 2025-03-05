<script lang="ts">
    /*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	import Content from "$lib/components/Content.svelte";
import Header from "$lib/components/Header.svelte";
	import Nav, { type Scene } from "$lib/components/Nav.svelte";

    let defaultScene: Scene = "home";
    let scene: Scene = $state(defaultScene);
</script>

<div class="page-container">
    <Header></Header>
    <Content {scene}></Content>
    <Nav {defaultScene} onNav={(s) => scene = s}></Nav>
</div>

<style>
    .page-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
<script lang="ts">
	import type { Component } from 'svelte';
	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	import Button from '../Button.svelte';
	import CreateTag from '../CreateTag.svelte';
    type View = "createTag" | "browseContent";
    let view: View = $state("createTag");
    function navTo(v: View) {
        view === v;
    }
</script>


<div class="container">
    <aside>
        <Button variant="primary" label="Create a tag" onclick={() => navTo("createTag")} />
            <div class="list"></div>
    </aside>
    <div class="main">
        {#if view === "createTag"}
            <CreateTag />
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
    }

    aside {
        width: max(200px, 20vw);
        flex: 0 0 auto;
    }
    
    .list {
        background-color: var(--secondary-800);
        border-radius: 4px;
        padding: 1rem;
        margin-top: 1rem;
    }
    .main {
        flex: 1 1 auto;
        width: 100%;
        margin-left: 2rem;
    }
</style>
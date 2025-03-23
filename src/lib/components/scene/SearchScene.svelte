<script lang="ts">
	import Button from "../Button.svelte";
    /*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	import LabeledContainer from "../LabeledContainer.svelte";

    // enums are not supported in svelte components
    const QUERY_KIND: {
        ARTIST: 'artist',
        ALBUM: 'album',
        SONG: 'song',
        TAG: 'tag',
    } = {
        ARTIST: 'artist',
        ALBUM: 'album',
        SONG: 'song',
        TAG: 'tag',
    }
    // keyof typeof QUERY_KIND = the key of the object
    // object[key] = value
    type QueryKind = typeof QUERY_KIND[keyof typeof QUERY_KIND];

    let query: {
        searchQuery: string,
        kind: QueryKind,
    } = $state({
        searchQuery: '',
        kind: QUERY_KIND.SONG,
    })

    function search() {
        console.log($state.snapshot(query));
    }
</script>

<div class="query-container">
    <LabeledContainer label="Search">
        <input type="text" bind:value={query.searchQuery} />
    </LabeledContainer>
    <LabeledContainer label="Kind">
        <select bind:value={query.kind}>
            {#each Object.values(QUERY_KIND) as kind}
                <option value={kind}>{kind}</option>
            {/each}
        </select>
    </LabeledContainer>
    <Button variant="primary" label="Search" onclick={search} />
</div>

<style>
    .query-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    .query-container > :global(*:not(button)) {
        flex: 1;
        width: 100%;
    }
</style>
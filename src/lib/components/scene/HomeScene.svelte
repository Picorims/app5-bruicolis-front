<script lang="ts">
	import typia from 'typia';
	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	import Button from '../Button.svelte';
	import { importUserData, type UserData } from '$lib/user_data.svelte';
    import * as APIManager from '../../../API/APIManager';
	import { Song } from '../../../models/Song';

	function importData() {
		console.log('Importing data');

		// open file picker
		const input = document.getElementById('file-input') as HTMLInputElement;
        if (input === null) {
            throw new Error('Input not found');
        }
		const event = new MouseEvent('click');
		input.dispatchEvent(event);
	}

    function debugRequest() {
        console.log('debug request');

        const newSong = new Song(0, 'Test addSong', new Date());
        const resp = APIManager.getTagSongs(3);
        resp.then(obj => console.log(obj));
    }

	function loadData(file: File) {
        const reader = new FileReader();
        reader.onload = () => {
            const data = reader.result as string;
            importUserData(data);
        };
        reader.readAsText(file);
    }
</script>

<h1>Home</h1>

<Button variant="primary" label="Import data" onclick={importData} />
<Button variant="primary" label="debug" onclick={debugRequest} />

<input id="file-input" type="file" accept=".json" onchange={(e) => {
    const input = e.target as HTMLInputElement;
    if (input.files !== null && input.files.length > 0) {
        loadData(input.files[0]);
    }
}} />

<style>
    #file-input {
        display: none;
    }
</style>
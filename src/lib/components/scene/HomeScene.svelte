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
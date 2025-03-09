<script lang="ts">
	import { addLocalTag, localTagExists } from "$lib/user_data.svelte";
	import Button from "./Button.svelte";
    /*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

    let inputNameValue: string;
    let inputColorValue: string = "#000000";
	import LabeledContainer from "./LabeledContainer.svelte";
	import Tag from "./Tag.svelte";
    function createTag() {
        if (inputNameValue === "") {
            alert("Please enter a name");
            return;
        }
        if (localTagExists(inputNameValue)) {
            alert("A tag with this name already exists");
            return;
        }
        addLocalTag(inputNameValue, inputColorValue);
        alert("Tag created");
        inputNameValue = "";
        inputColorValue = "#000000";
    }
</script>

<div class="container">
    <h1>Create a tag</h1>
    <LabeledContainer label="Name">
        <input type="text" bind:value={inputNameValue} />
    </LabeledContainer>
    <LabeledContainer label="Color">
        <input type="color" bind:value={inputColorValue} />
    </LabeledContainer>
    <LabeledContainer label="Preview">
        <Tag mode="display" tag={{ name: inputNameValue, color: inputColorValue, localId: "", type: "local" }} />    
    </LabeledContainer>
    <Button variant="secondary" label="Create" onclick={createTag} />
</div>

<style>
    .container {
        padding: 1rem;
    }
</style>
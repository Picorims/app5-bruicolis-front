<script lang="ts">
	import Button from "./Button.svelte";
    /*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	import LabeledContainer from "./LabeledContainer.svelte";

</script>

<div class="container">
    <h1>Create a tag</h1>
    <LabeledContainer label="Name">
        <input type="text" />
    </LabeledContainer>
    <Button variant="secondary" label="Create" />
</div>

<style>
    .container {
        padding: 1rem;
    }
</style>
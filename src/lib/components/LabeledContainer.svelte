<script lang="ts">
	import type { Snippet } from "svelte";

    /*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

   interface Props {
    label: string;
    children: Snippet;
   }

   let {label, children}: Props = $props();
</script>

<label>
    <span>{label}</span>
    {@render children()}
</label>

<style>
    label > span {
        display: block;
        font-size: 1rem;
        margin-bottom: 0.25em;
    }
    label {
        display: block;
        margin-bottom: 1em;
    }
</style>
<script lang="ts">
	import type { Tag as TagType } from "$lib/user_data.svelte";

    /*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

   interface Props {
    tag: TagType;
   }

   let {tag}: Props = $props();
</script>

<div class="tag" style="background-color: color-mix(in srgb, {tag.color}, black 50%); border-color: {tag.color};">
    {tag.name}
</div>


<style>
    .tag {
        font-size: 1rem;
        display: inline-block;
        padding: 0.25em;
        margin-right: 0.25em;
        margin-bottom: 0.25em;
        border-radius: 4px;
        border: 1px solid;
    }
</style>
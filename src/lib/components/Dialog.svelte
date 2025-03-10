<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';

	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	/**
	 *  @see https://developer.mozilla.org/fr/docs/Web/HTML/Element/dialog
	 */
	interface Props {
		open: boolean;
		children: Snippet;
		title: string;
		onconfirm?: () => void;
		oncancel?: () => void;
	}

	let { open, title, children, onconfirm, oncancel }: Props = $props();
</script>

<dialog {open}>
	<h2>{title}</h2>
	{@render children()}
    <div class="buttons">
        <Button variant="secondary" label="Cancel" onclick={oncancel} />
        <Button variant="primary" label="Confirm" onclick={onconfirm} />
    </div>
</dialog>

<style>
    dialog {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background-color: var(--background-900);
        color: var(--text);
        border: 1px solid var(--background-800);
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px var(--background);
    }

    .buttons {
        text-align: center;
    }
</style>
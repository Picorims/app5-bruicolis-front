<script lang="ts">
	import type { Snippet } from "svelte";

	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	interface Props {
		variant: 'primary' | 'secondary';
        iconMode?: boolean;
		label?: string;
        onclick?: () => void;
        children?: Snippet;
	}

	let { variant, label, onclick, children, iconMode = false }: Props = $props();
	let primary = $derived(variant === 'primary');
	let secondary = $derived(variant === 'secondary');
    let icon = $derived(iconMode);
</script>

<button class:icon class:primary class:secondary {onclick}>{label ?? ""}{@render children?.()}</button>

<style>
    button {
        font-size: 1.2rem;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: var(--text);
        font-weight: bold;
        transition: 0.1s;
    }
    button:hover {
        filter: brightness(0.8);
        transition: 0.1s;
    }
    button:active {
        transform: scale(0.95);
        transition: 0.1s;
    }
    button.primary {
        background-color: var(--primary);
        color: var(--background);
    }
    button.secondary {
        background-color: var(--secondary);
    }
    button.icon {
        padding: 0.15rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    button.icon > :global(*) {
        flex: 0 0 auto;
    }
</style>
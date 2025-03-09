<script lang="ts">
	/*
    Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>
    
    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	interface Props {
		variant: 'primary' | 'secondary';
		label: string;
        onclick?: () => void;
	}

	let { variant, label, onclick }: Props = $props();
	let primary = $derived(variant === 'primary');
	let secondary = $derived(variant === 'secondary');
</script>

<button class:primary class:secondary {onclick}>{label}</button>

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
</style>
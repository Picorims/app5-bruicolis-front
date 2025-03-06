/*
Copyright (c) 2025 Charly Schmidt alias Picorims<picorims.contact@gmail.com>

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

export interface LocalTag {
	type: 'local';
	localId: string;
	name: string;
	color: string;
}
export type Tag = LocalTag;
export interface UserData {
	tags: Tag[];
}

const userData: UserData = $state({
	tags: []
});

/**
 * @see https://github.com/sveltejs/svelte/discussions/15019
 * @param fn 
 * @returns 
 */
export function computed<T>(fn: () => T) {
    const value = $derived.by(fn);
    return { get value() { return value; } };
  }

export const localTags= computed(() => userData.tags.filter(tag => tag.type === 'local').sort((a, b) => a.name.localeCompare(b.name)));

export function localTagExists(name: string): boolean {
    return userData.tags.some(tag => tag.type === "local" && tag.name === name);
}

export function addLocalTag(name: string, color: string) {
    if (localTagExists(name)) {
        throw new Error(`Tag with name "${name}" already exists`);
    }
    userData.tags.push({
        type: "local",
        localId: crypto.randomUUID(),
        name,
        color,
    });
}
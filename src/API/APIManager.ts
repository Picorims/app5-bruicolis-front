const API_BASE_URL = 'http://localhost:8000';

import { Album } from '../models/Album';
import { Artist } from '../models/Artist';
import { Song } from '../models/Song';
import { Tag } from '../models/Tag';




//---------------------------------------------------------------------------------------------//
//------------------------------------------- Songs -------------------------------------------//
//---------------------------------------------------------------------------------------------//

/**
 * Fetches songs from the API.
 * @returns A promise resolving to the list of songs.
 */
export async function fetchSongs() {
    try {
        const response = await fetch(`${API_BASE_URL}/songs`);
        if (!response.ok) {
            throw new Error(`Failed to fetch songs: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody.map((song: any) => new Song(song.id, song.name, new Date(song.release_date)));

    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
}

/**
 * Fetches songs from the API.
 * @returns A promise resolving to the song, or null if the song wasn't found.
 */
export async function fetchSong(songId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/songs/${songId}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch song: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return new Song(responseBody.id, responseBody.name, new Date(responseBody.release_date));

    } catch (error) {
        console.error('Error fetching song:', error);
        throw error;
    }
}

/**
 * Adds a new song to the API.
 * @param song The song to add.
 * @returns A promise resolving to the newly created song.
 * */
export async function addSong(song: Song, artistId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/songs`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: song.name,
                release_date: song.release_date.toISOString(),
                artist_id: artistId,
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to add song: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return new Song(responseBody.id, responseBody.name, new Date(responseBody.release_date));
    } catch (error) {
        console.error('Error adding song:', error);
        throw error;
    }
}

/**
 * Adds a new tag to a song in the API.
 * @param songId The ID of the song to get the tags of.
 * @returns A promise resolving to the list of tags.
**/
export async function fetchSongTags(songId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/songs/${songId}/tags`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch tags: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody.returnObject.map((tag: any) => new Tag(tag.id, tag.label, tag.musicbrainzId));

    } catch (error) {
        console.error('Error fetching song:', error);
        throw error;
    }
}

/**
 * Adds a new tag to a song in the API.
 * @param tagId The ID of the tag to add.
 * @param songId The ID of the song to add the tag to.
 * @returns A promise resolving to the updated song.
**/
export async function addTagToSong(tagId: number, songId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/songs${songId}/add_tag`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                tag_id: tagId
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to add tag: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        console.error('Error adding tag:', error);
        throw error;
    }
}



//---------------------------------------------------------------------------------------------//
//------------------------------------------ Artists ------------------------------------------//
//---------------------------------------------------------------------------------------------//

/**
 * Fetches artists from the API.
 * @returns A promise resolving to the list of artists.
 */
export async function fetchArtists() {
    try {
        const response = await fetch(`${API_BASE_URL}/artists`);
        if (!response.ok) {
            throw new Error(`Failed to fetch artists: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody.map((artist: any) => new Artist(artist.id, artist.name));
        
    } catch (error) {
        console.error('Error fetching artists:', error);
        throw error;
    }
}

/**
 * Fetches artist from the API from its ID.
 * @param artistId The ID of the artist to fetch.
 * @returns A promise resolving to the artist, or null if the artist wasn't found.
 */
export async function fetchArtist(artistId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/artists/${artistId}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch artist: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return new Artist(responseBody.id, responseBody.name);
        
    } catch (error) {
        console.error('Error fetching artist:', error);
        throw error;
    }
}

/**
 * Fetches artist from the API from its ID.
 * @param artistId The ID of the artist to fetch.
 * @returns A promise resolving to the artist, or null if the artist wasn't found.
 * */
export async function addArtist(name: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/artists`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to add artist: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return new Artist(responseBody.id, responseBody.name);
    } catch (error) {
        console.error('Error adding artist:', error);
        throw error;
    }
}

/**
 * Fetches artist songs from the API from its ID.
 * @param artistId The ID of the artist to fetch.
 * @returns A promise resolving to the list of songs.
 * */
export async function fetchArtistSongs(artistId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/artists/${artistId}/songs`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch artist songs: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody.map((song: any) => new Song(song.id, song.name, new Date(song.release_date)));
        
    } catch (error) {
        console.error('Error fetching artist songs:', error);
        throw error;
    }
}

/**
 * Fetches artist albums from the API from its ID.
 * @param artistId The ID of the artist to fetch.
 * @returns A promise resolving to the list of albums.
 * */
export async function fetchArtistAlbums(artistId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/artists/${artistId}/albums`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch artist albums: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody.map((album: any) => new Album(album.id, album.name, new Date(album.release_date)));
        
    } catch (error) {
        console.error('Error fetching artist albums:', error);
        throw error;
    }
}

/**
 * Fetches artist tags from the API from its ID.
 * @param artistId The ID of the artist to fetch.
 * @returns A promise resolving to the list of tags.
 * */
export async function fetchArtistTags(artistId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/artists/${artistId}/tags`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch tags: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody.map((tag: any) => new Tag(tag.id, tag.label, tag.musicbrainzId));

    } catch (error) {
        console.error('Error fetching artist:', error);
        throw error;
    }
}

/**
 * Adds a new tag to an artist in the API.
 * @param artistId The ID of the artist to add the tag to.
 * @param tagId The ID of the tag to add.
 * @returns A promise resolving to the updated artist.
 * */
export async function addTagToArtist(artistId: number, tagId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/artists/${artistId}/tags`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                tag_id: tagId
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to add tag: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        console.error('Error adding tag:', error);
        throw error;
    }
}

//---------------------------------------------------------------------------------------------//
//------------------------------------------ Albums -------------------------------------------//
//---------------------------------------------------------------------------------------------//

/**
 * Fetches albums from the API.
 * @returns A promise resolving to the list of albums.
 * */
export async function fetchAlbums() {
    try {
        const response = await fetch(`${API_BASE_URL}/albums`);
        if (!response.ok) {
            throw new Error(`Failed to fetch albums: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody.map((album: any) => new Album(album.id, album.name, new Date(album.release_date)));

    } catch (error) {
        console.error('Error fetching albums:', error);
        throw error;
    }
}




//---------------------------------------------------------------------------------------------//
//------------------------------------------- Tags --------------------------------------------//
//---------------------------------------------------------------------------------------------//

/**
 * Fetches tags from the API.
 * @returns A promise resolving to the list of tags.
 * */
export async function fetchTags() {
    try {
        const response = await fetch(`${API_BASE_URL}/tags`);
        if (!response.ok) {
            throw new Error(`Failed to fetch tags: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody.map((tag: any) => new Tag(tag.id, tag.label, tag.musicbrainzId));

    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
}

/**
 * Fetches tag from the API from its ID.
 * @returns A promise resolving to the tag, or null if the tag wasn't found.
 */
 export async function fetchTag(tagId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/tags/${tagId}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch tag: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody.map((tag: any) => new Tag(tag.id, tag.label, tag.musicbrainzId));

    } catch (error) {
        console.error('Error fetching tag:', error);
        throw error;
    }
}
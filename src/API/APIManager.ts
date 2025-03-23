const API_BASE_URL = 'http://localhost:8000';

import { APIAlbum } from '../api_models/APIAlbum';
import { APIArtist } from '../api_models/APIArtist';
import { APISong } from '../api_models/APISong';
import { APITag } from '../api_models/APITag';


export interface SearchBody {
    filters: {
        text_query?: string;
        tagsOR?: number[];
        tagsAND?: number[];
    }
    page: number,
    limit: number,
}


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
        return responseBody.map((song: any) => new APISong(song.id, song.name, new Date(song.release_date))); //TODO no any

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
        return new APISong(responseBody.id, responseBody.name, new Date(responseBody.release_date));

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
export async function addSong(song: APISong, artistId: number) {
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
        return new APISong(responseBody.id, responseBody.name, new Date(responseBody.release_date));
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
        return responseBody.returnObject.map((tag: any) => new APITag(tag.id, tag.label, tag.musicbrainzId)); //TODO no any

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
export async function fetchArtists(body: SearchBody): Promise<APIArtist[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/artists`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch artists: ${response.statusText}`);
        }
        const responseBody: {id: number, name: string}[] = await response.json();
        return responseBody.map((artist: {id: number, name: string}): APIArtist => new APIArtist(artist.id, artist.name));
        
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
        return new APIArtist(responseBody.id, responseBody.name);
        
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
        return new APIArtist(responseBody.id, responseBody.name);
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
        return responseBody.map((song: any) => new APISong(song.id, song.name, new Date(song.release_date)));//TODO no any
        
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
        return responseBody.map((album: any) => new APIAlbum(album.id, album.name, new Date(album.release_date)));//TODO no any
        
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
        return responseBody.map((tag: any) => new APITag(tag.id, tag.label, tag.musicbrainzId));//TODO no any

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
        return responseBody.map((album: any) => new APIAlbum(album.id, album.name, new Date(album.release_date)));//TODO no any

    } catch (error) {
        console.error('Error fetching albums:', error);
        throw error;
    }
}

/**
 * Fetches album from the API from its ID.
 * @param albumId The ID of the album to fetch.
 * @returns A promise resolving to the album, or null if the album wasn't found.
 * */
export async function fetchAlbum(albumId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/albums/${albumId}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch album: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return new APIAlbum(responseBody.id, responseBody.name, new Date(responseBody.release_date));

    } catch (error) {
        console.error('Error fetching album:', error);
        throw error;
    }
}

/**
 * Adds a new album to the API.
 * @param album The album to add.
 * @returns A promise resolving to the newly created album.
 * */
export async function addAlbum(name: string, releaseDate: Date, artistId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/albums`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                release_date: releaseDate.toISOString(),
                artist_id: artistId,
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to add album: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return new APIAlbum(responseBody.id, responseBody.name, new Date(responseBody.release_date));
    } catch (error) {
        console.error('Error adding album:', error);
        throw error;
    }
}

/**
 * Fetches album songs from the API from its ID.
 * @param albumId The ID of the album to fetch.
 * @returns A promise resolving to the list of songs.
 * */
export async function fetchAlbumSongs(albumId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/albums/${albumId}/songs`);
        if (!response.ok) {
            throw new Error(`Failed to fetch album songs: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody.map((song: any) => new APISong(song.id, song.name, new Date(song.release_date)));//TODO no any
        
    } catch (error) {
        console.error('Error fetching album songs:', error);
        throw error;
    }
}

/**
 * Adds a new song to an album in the API.
 * @param songId The ID of the song to add.
 * @param albumId The ID of the album to add the song to.
 * @returns A promise resolving to the updated album.
 * */
export async function addSongToALbum(songId: number, albumId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/albums/${albumId}/songs`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                song_id: songId
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to add song to album: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        console.error('Error adding song to album:', error);
        throw error;
    }
}

/**
 * Fetches album tags from the API from its ID.
 * @param albumId The ID of the album
 * @returns A promise resolving to the list of tags.
 * */
export async function fetchAlbumTags(albumId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/albums/${albumId}/tags`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch tags: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody.map((tag: any) => new APITag(tag.id, tag.label, tag.musicbrainzId));//TODO no any

    } catch (error) {
        console.error('Error fetching album:', error);
        throw error;
    }
}

/**
 * Adds a new tag to an album in the API.
 * @param albumId The ID of the album to add the tag to.
 * @param tagId The ID of the tag to add.
 * @returns A promise resolving to the updated album.
 * */
export async function addTagToALbum(albumId: number, tagId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/albums/${albumId}/tags`, {
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
        return responseBody.map((tag: any) => new APITag(tag.id, tag.label, tag.musicbrainzId));//TODO no any

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
        return new APITag(responseBody.id, responseBody.label, responseBody.musicbrainzId);

    } catch (error) {
        console.error('Error fetching tag:', error);
        throw error;
    }
}

/**
 * Adds a new tag to the API.
 * @param label The label of the tag to add.
 * @returns A promise resolving to the newly created tag.
 * */
export async function addTag(label: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/tags`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                label: label,
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to add tag: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return new APITag(responseBody.id, responseBody.label, responseBody.musicbrainzId);
    } catch (error) {
        console.error('Error adding tag:', error);
        throw error;
    }
}

/**
 * Gets all the songs that are associated with a given tag.
 * @param tagId The ID of the tag to get the songs of.
 * @returns A promise resolving to the list of songs.
 * */
export async function getTagSongs(tagId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/tags/${tagId}/songs`);
        if (!response.ok) {
            throw new Error(`Failed to fetch tag songs: ${response.statusText}`);
        }
        const responseBody = await response.json();
        return responseBody.map((song: any) => new APISong(song.id, song.name, new Date(song.release_date)));//TODO no any
        
    } catch (error) {
        console.error('Error fetching tag songs:', error);
        throw error;
    }
}
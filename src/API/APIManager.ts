const API_BASE_URL = 'http://localhost:8000';

import { Album } from '../models/Album';
import { Artist } from '../models/Artist';
import { Song } from '../models/Song';

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
            body: JSON.stringify({ song, artistId }),
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
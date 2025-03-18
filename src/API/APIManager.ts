const API_BASE_URL = 'http://localhost:8000';

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
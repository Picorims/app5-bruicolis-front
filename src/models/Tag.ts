export class Tag {
    id: number;
    label: string;
    musicbrainzId: number;

    constructor(id: number, label: string, musicbrainzId: number) {
        this.id = id;
        this.label = label;
        this.musicbrainzId = musicbrainzId;
    }
}

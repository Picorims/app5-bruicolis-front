export class APIAlbum {
    id: number;
    name: string;
    release_date: Date;

    constructor(id: number, name: string, release_date: Date) {
        this.id = id;
        this.name = name;
        this.release_date = release_date;
    }
}

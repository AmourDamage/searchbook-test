export interface IVolumeInfo {
        title: string;
        image: string | undefined;
        categories: string[];
        authors: string[];
        imageLinks?: { thumbnail: string };
        description?: string;
}

export interface IBook {
    id: string;
    volumeInfo: IVolumeInfo;
    items?: any;
}

export interface IBooks {
    items: IBook[]
    totalItems?: number;
}
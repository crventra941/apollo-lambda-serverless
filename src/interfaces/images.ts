export type CreateImage = { imageUrl: string } | { error: unknown }

export interface IImageRepository {
    createImage(newImage: NewImage): Promise<CreateImage>;
    getAllImages(): Promise<Image[] | number | unknown>;
}

export interface NewImage {
    width: number;
    height: number;
    isGrayScale?: boolean;
    isYoung?: boolean;
}

export interface Image {
    imageUrl: string;
    createdAt: string
}
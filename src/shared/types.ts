import { UploadFile } from "antd";

export type ListData = {
    items: ListDataItem[];
}

export type ListDataItem = {
    id: number;
    title: string;
}

export type IPaginatedData<T> = {
    current_page: number;
    perPage: number;
    data: T[];
    total: number;
}

// export type FileDynamic = UploadFile[] | undefined | ImageResponse[];

export type FileDynamic = UploadFile | undefined | ImageResponse;


export type ImageResponse = {
    response: ImageResponseData;
}

export type ImageResponseData = {
    url: string,
}

export type UpdateImageData = {
    uid?: string|number,
    url: string,
}


export interface UpdateFile extends UploadFile {
    uid: string;
}
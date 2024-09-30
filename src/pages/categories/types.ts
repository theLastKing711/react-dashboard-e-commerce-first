import { UpdateFile } from './../../shared/types';
import { UploadFile } from "antd";
import { FileDynamic, ImageResponse, ImageResponseData, UpdateFile, UpdateImageData } from "../../shared/types";

export type ICategory = {
    id: number;
    parent_id: number | null;
    parent_name: string | null;
    name: string;
    images: string[] | null;
    created_at: Date;
};

export type ICreateCategory = {
    name: string;
    parent_id: number | null;
    images?: UploadFile[] | undefined;
    image_urls?: ImageResponseData[];
};

export type ICreateCategoryResponse = {
    name: string;
    parent_id: number | null;
    images: string[] | null;
};


export type IUpdateCategory = {
    name: string;
    parent_id: number | null;
    images?: UploadFile<UpdateRespnse>[] | undefined;
    image_urls?: UpdateImageData[] | undefined;
};

export type UpdateRespnse = {
    uid: string,
    url: string,
    is_updated: boolean
}

export type IShowCategory = {
    name: string;
    parent_id: number | null;
    images?: UpdateImageData[];
}
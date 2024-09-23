export type ICategory = {
    id: number;
    parent_id: number | null;
    parent_name: string | null;
    name: string;
    image: string | null;
    created_at: Date;
};

export type ICreateCategory = {
    name: string;
    parent_id: number | null;
    image: any | null;
};

export type IUpdateCategory = {
    name: string;
    image: any | null;
};

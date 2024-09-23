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
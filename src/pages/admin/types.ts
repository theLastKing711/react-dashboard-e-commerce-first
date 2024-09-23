export type IAdmin = {
    id: number,
    name: string
    email: string,
    created_at: Date;
}

export type ICreateAdmin = {
    name: string
    password: string,
}


export type IUpdateAdmin = {
    name: string
    password: string,
}

export type IAdminShow = {
    name: string
}
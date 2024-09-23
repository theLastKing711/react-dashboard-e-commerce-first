
export const BASE_URI = 'http://localhost:8000';


export const RESOURSES = {
    admin: "admin",
    category: "categories",
    product: "products"
}

export const ADMIN_URI = BASE_URI + "/" + RESOURSES.admin;

export const CATEGORY_URI = ADMIN_URI + "/" + RESOURSES.category;

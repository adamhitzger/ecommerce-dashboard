import { SidebarLink, ProductLink } from "@/types";

export const sidebarLinks: SidebarLink[] = [
    {
        imgURL: "/assets/icons/home.svg",
        route: "/admin",
        label: "Admin Home",
    },
    {
        imgURL: "/assets/icons/analytics.svg",
        route: "/analytics",
        label: "Analytics",
    },
    {
        imgURL: "/assets/icons/category.svg",
        route: "/categories",
        label: "Categories",
    },
    {
        imgURL: "/assets/icons/product.svg",
        route: "/products",
        label: "Products",
    },
    {
        imgURL: "/assets/icons/order.svg",
        route: "/orders",
        label: "Orders",
    },
    {
        imgURL: "/assets/icons/customers.svg",
        route: "/customers",
        label: "Customers",
    },
    {
        imgURL: "/assets/icons/discounts.svg",
        route: "/discounts",
        label: "Discounts",
    },
    {
        imgURL: "/assets/icons/settings.svg",
        route: "/settings",
        label: "Settings",
    },
]

export const productLinks: ProductLink[] = [
    {
        route: "/products",
        label: "Products",
    },
    {
        route: "/products/sizes",
        label: "Sizes",
    },
    {
        route: "/products/variants",
        label: "Variants",
    }
]
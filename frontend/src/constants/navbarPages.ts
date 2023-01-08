import pageRoute from "./pagesRoutes";
import { NavbarItem } from "./types";

const defaultPages: NavbarItem[] = [
    {
        mainTitle: "All courses",
        options: [
            {
                title: "All courses",
                path: pageRoute.courses.all,
            },
        ],
    },
    {
        mainTitle: "All study programs",
        options: [
            {
                title: "All study programs",
                path: pageRoute.studies.all,
            },
        ],
    },
];

export const adminPages: NavbarItem[] = [
    {
        mainTitle: "Admin dashboard",
        options: [
            {
                title: "Admin dashboard",
                path: pageRoute.admin,
            },
        ],
    },
];

export const studentPages: NavbarItem[] = [
    {
        mainTitle: "Courses",
        options: [
            {
                title: "My courses",
                path: pageRoute.courses.main,
            },
            {
                title: "All courses",
                path: pageRoute.courses.all,
            },
        ],
    },
    {
        mainTitle: "Studies",
        options: [
            {
                title: "My study programs",
                path: pageRoute.studies.main,
            },
            {
                title: "All study programs",
                path: pageRoute.studies.all,
            },
        ],
    },
    {
        mainTitle: "Study performances",
        options: [
            {
                title: "Study performances",
                path: pageRoute.studyPerformances,
            },
        ],
    },
    {
        mainTitle: "Profile",
        options: [
            {
                title: "Profile",
                path: pageRoute.profile,
            },
        ],
    },
];

export const lecturerPages: NavbarItem[] = [
    {
        mainTitle: "Courses",
        options: [
            {
                title: "My courses",
                path: pageRoute.courses.main,
            },
            {
                title: "All courses",
                path: pageRoute.courses.all,
            },
            {
                title: "Create new",
                path: pageRoute.courses.new,
            },
        ],
    },
    {
        mainTitle: "Studies",
        options: [
            {
                title: "My study programs",
                path: pageRoute.studies.main,
            },
            {
                title: "All study programs",
                path: pageRoute.studies.all,
            },
        ],
    },
    {
        mainTitle: "Study performances",
        options: [
            {
                title: "Study performances",
                path: pageRoute.studyPerformances,
            },
        ],
    },
    {
        mainTitle: "Profile",
        options: [
            {
                title: "Profile",
                path: pageRoute.profile,
            },
        ],
    },
];

export const spmPages: NavbarItem[] = [
    {
        mainTitle: "All courses",
        options: [
            {
                title: "All courses",
                path: pageRoute.courses.all,
            },
        ],
    },
    {
        mainTitle: "Studies",
        options: [
            {
                title: "All study programs",
                path: pageRoute.studies.all,
            },
            {
                title: "Create new",
                path: pageRoute.studies.new,
            },
        ],
    },
    {
        mainTitle: "Profile",
        options: [
            {
                title: "Profile",
                path: pageRoute.profile,
            },
        ],
    },
];

export default defaultPages;

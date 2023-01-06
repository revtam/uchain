interface Page {
    name: string;
    path: string;
}

export interface PagesCollection {
    courses: Page;
    studyPerformance: Page;
    profile: Page;
}

const pageRoutes: PagesCollection = {
    courses: {
        name: "Courses",
        path: "courses",
    },
    studyPerformance: { name: "Study performances", path: "studyperformances" },
    profile: { name: "Profile", path: "profile" },
};

export default pageRoutes;

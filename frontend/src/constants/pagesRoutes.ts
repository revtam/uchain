export interface PagesCollection {
    home: string;
    courses: {
        main: string;
        all: string;
        new: string;
    };
    studies: {
        main: string;
        all: string;
        new: string;
    };
    studyPerformances: string;
    profile: string;
    admin: string;
    registrations: string;
}

const pageRoutes: PagesCollection = {
    home: "/",
    courses: {
        main: "courses",
        all: "courses-all",
        new: "courses-new",
    },
    studies: {
        main: "studies",
        all: "studies-all",
        new: "studies-new",
    },
    studyPerformances: "studyperformances",
    profile: "profile",
    admin: "admin",
    registrations: "registrations",
};

export default pageRoutes;

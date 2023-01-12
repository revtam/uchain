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
    studyPerformances: {
        main: string;
        grading: string;
    };
    profile: string;
    admin: string;
    registration: string;
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
    studyPerformances: {
        main: "studyperformances",
        grading: "grading",
    },
    profile: "profile",
    admin: "admin",
    registration: "registration",
    registrations: "registrations",
};

export default pageRoutes;

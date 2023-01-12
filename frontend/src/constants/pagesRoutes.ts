export interface PagesCollection {
    home: string;
    courses: {
        main: string;
        my: string;
        all: string;
        new: string;
    };
    studies: {
        main: string;
        my: string;
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
        my: "my",
        all: "courses-all",
        new: "courses-new",
    },
    studies: {
        main: "studies",
        my: "my",
        all: "studies-all",
        new: "studies-new",
    },
    studyPerformances: {
        main: "courseperformances",
        my: "my",
        student: "student",
        grading: "grading",
    },
    profile: "profile",
    admin: "admin",
    registration: "registration",
    registrations: "registrations",
};

export default pageRoutes;

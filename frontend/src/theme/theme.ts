import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#005CCC",
                    contrastText: "#FFF",
                },
                secondary: {
                    main: "#E97E00",
                    contrastText: "#FFF",
                },
                white: { main: "#FFF" },
                lightGrey: {
                    main: "#9B9B9B",
                },
                black: {
                    main: "#000",
                },
                darkGrey: {
                    main: "#515151",
                },
            },
        },
    },
});

export default theme;

export const variables = {
    primary: "var(--mui-palette-primary-main)",
    secondary: "var(--mui-palette-secondary-main)",
    white: "var(--mui-palette-white-main)",
    lightGrey: "var(--mui-palette-lightGrey-main)",
    black: "var(--mui-palette-black-main)",
    darkGrey: "var(--mui-palette-darkGrey-main)",
};

declare module "@mui/material/styles" {
    interface Palette {
        white: Palette["primary"];
        lightGrey: Palette["primary"];
        black: Palette["primary"];
        darkGrey: Palette["primary"];
    }
    interface PaletteOptions {
        white: PaletteOptions["primary"];
        lightGrey: PaletteOptions["primary"];
        black: PaletteOptions["primary"];
        darkGrey: PaletteOptions["primary"];
    }
}

declare module "@mui/material" {
    interface CircularProgressPropsColorOverrides {
        white: true;
    }

    interface ButtonPropsColorOverrides {
        white: true;
        darkGrey: true;
    }
}

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
                    main: "3B3B3B",
                },
            },
        },
    },
});

export default theme;

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

// declare module "@mui/material/Button" {
//     interface ButtonPropsColorOverrides {
//         white: true;
//     }
// }

declare module "@mui/material" {
    interface CircularProgressPropsColorOverrides {
        white: true;
    }

    interface ButtonPropsColorOverrides {
        white: true;
    }
}

// declare module "@mui/material" {
//     interface CircularProgressPropsColorOverrides {
//         white: true;
//     }
// }

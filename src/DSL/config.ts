export const ColorsDefaultPalette = {
    primary_content: '#f5f8fc',
    secondary_content: '#e5f1ff',
    pane: '#FFFFFF',
    default_text: '#000000',
    secondary_text: '#5D5D5D',
    action: '#007BFF',
    green: '#159B64',
    red: '#E12121',
    blue: '#87CEFA',
    yellow: '#FFD640',
    white: '#FFFFFF',
    border: '#E9E9E9'
};

type HexColor = string;

export interface ThemeInterface {
    primary: HexColor;
    secondary: HexColor;
    pane: HexColor,
    content: HexColor,
    defaultText: HexColor,
    secondaryText: HexColor,
    action: HexColor,
    success: HexColor,
    error: HexColor,
    warning: HexColor,
    info: HexColor,
    white: HexColor,
    border: HexColor
}

export interface ColorsConfigInterface {
    light: ThemeInterface;
    // By default we don't require dark theme. If your app uses one, make it mandatory
    dark?: ThemeInterface;
}

export const ColorsConfig: ColorsConfigInterface = {
    light: {
        primary: ColorsDefaultPalette.primary_content,
        secondary: ColorsDefaultPalette.secondary_content,
        pane: ColorsDefaultPalette.pane,
        content: ColorsDefaultPalette.primary_content,
        defaultText: ColorsDefaultPalette.default_text,
        secondaryText: ColorsDefaultPalette.secondary_text,
        action: ColorsDefaultPalette.action,
        success: ColorsDefaultPalette.green,
        error: ColorsDefaultPalette.red,
        warning: ColorsDefaultPalette.yellow,
        info: ColorsDefaultPalette.blue,
        white: ColorsDefaultPalette.white,
        border: ColorsDefaultPalette.border
    }
};

const headerFont = "sans-serif";
const bodyFont = "sans-serif";
const regular = 400;
const extraBold = 800;
const light = 300;

export const TypographyConfig = {
    TTypes: {
        HeaderBold: {fw: extraBold, tag: 'span', ff: headerFont},
        HeaderRegular: {fw: regular, tag: 'span', ff: headerFont},
        HeaderLight: {fw: light, tag: 'span', ff: headerFont},
        BodyBold: {fw: extraBold, tag: 'span', ff: bodyFont},
        BodyRegular: {fw: regular, tag: 'span', ff: bodyFont},
        BodyLight: {fw: light, tag: 'span', ff: bodyFont},
    }
};
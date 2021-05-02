import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main: string;
      secondary: string;
    };
    fonts: {
      main: string;
    };
    device: {
      size: {
        large: string;
      };
    };
  }
}

import { Theme } from "@razorpay/blade/components";
import styled from "styled-components";

export const StyledRoot = styled.main(
  ({ theme }: { theme: Theme }) => `
      height : 100%;
      background-color: ${theme.colors.surface.background.gray.subtle};
      display: flex;
      flex-direction: column;
  `
);

export const StyledHeader = styled.header(
  ({ theme }: { theme: Theme }) => `
        height : 56px;
        border-bottom: ${theme.border.width.thin}px solid ${theme.colors.surface.border.gray.subtle};
        background-color: ${theme.colors.surface.background.cloud.subtle};
    `
);

export const StyledContent = styled.section(
  ({ theme }: { theme: Theme }) => `
        display: flex;
        flex : 1;
    `
);

export const StyledLeftNav = styled.nav(
  ({ theme }: { theme: Theme }) => `
    width : 76px;
    background-color: ${theme.colors.surface.background.cloud.intense};
`
);

export const StyledMain = styled.section(
  ({ theme }: { theme: Theme }) => `
    flex : 1;
    background-color: ${theme.colors.surface.background.gray.moderate};
  `
);

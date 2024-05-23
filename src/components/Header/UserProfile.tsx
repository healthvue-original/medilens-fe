import { Box, Theme } from "@razorpay/blade/components";
import styled from "styled-components";

const RoundedDiv = styled.div(
  ({ theme }: { theme: Theme }) => `
    height : 40px;
    width : 40px;
    border-radius : ${theme.border.radius.round};
    border : ${theme.border.width.thin}px solid ${theme.colors.surface.border.gray.normal};
    margin-left : auto;
    margin-right : ${theme.spacing[5]}px;
`
);

export default function UserProfile(): JSX.Element {
  return <RoundedDiv />;
}

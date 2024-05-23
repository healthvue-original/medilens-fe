import {
  BladeProvider,
  Box,
  HomeIcon,
  PieChartIcon,
  ReportsIcon,
  SettingsIcon,
  Text,
  Theme,
} from "@razorpay/blade/components";
import { bladeTheme } from "@razorpay/blade/tokens";
import { useState } from "react";
import styled from "styled-components";

const StyledList = styled.li(
  ({ theme, selected }: { theme: Theme; selected: boolean }) => `
    padding : 16px;
    cursor: pointer;
    display : flex;
    flex-direction: column;
    gap : 8px;
    align-items : center;
    justify-content : center;
    background-color : ${
      selected ? theme.colors.surface.background.primary.subtle : ""
    }
`
);

const navList = [
  {
    label: "Home",
    id: "home",
    icon: HomeIcon,
  },
  {
    label: "Cases",
    id: "cases",
    icon: ReportsIcon,
  },
  {
    label: "Reports",
    id: "reports",
    icon: PieChartIcon,
  },
  {
    label: "Settings",
    id: "settings",
    icon: SettingsIcon,
  },
];

export default function LeftNav(): JSX.Element {
  const [selectedItem, setSelectedItem] = useState(navList[0]);

  return (
    <BladeProvider colorScheme="dark" themeTokens={bladeTheme}>
      <Box height="100%" width="100%">
        <ul>
          {navList.map((item) => (
            <StyledList
              selected={item.id === selectedItem.id}
              key={item.id}
              onClick={() => setSelectedItem(item)}
            >
              <item.icon
                size="xlarge"
                color={
                  item.id === selectedItem.id
                    ? "surface.icon.primary.normal"
                    : "surface.icon.gray.subtle"
                }
              />
              <Text>{item.label}</Text>
            </StyledList>
          ))}
        </ul>
      </Box>
    </BladeProvider>
  );
}

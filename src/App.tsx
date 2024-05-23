import { BladeProvider } from "@razorpay/blade/components";
import { bladeTheme } from "@razorpay/blade/tokens";
import "./App.css";
import "@razorpay/blade/fonts.css";
import {
  StyledRoot,
  StyledHeader,
  StyledContent,
  StyledLeftNav,
  StyledMain,
} from "./components/BaseLayout";
import Header from "./components/Header/Header";
import LeftNav from "./components/LeftNav";

function App(): JSX.Element {
  return (
    <BladeProvider themeTokens={bladeTheme}>
      <StyledRoot>
        <StyledHeader>
          <Header />
        </StyledHeader>
        <StyledContent>
          <StyledLeftNav>
            <LeftNav />
          </StyledLeftNav>
          <StyledMain></StyledMain>
        </StyledContent>
      </StyledRoot>
    </BladeProvider>
  );
}

export default App;

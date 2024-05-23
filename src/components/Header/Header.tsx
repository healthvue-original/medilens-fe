import { Box, Heading, Text } from "@razorpay/blade/components";
import UserProfile from "./UserProfile";

export default function Header(): JSX.Element {
  return (
    <Box display="flex" alignItems="center" height="100%">
      <Box>
        <Heading marginLeft={"spacing.4"}>HealthVue</Heading>
      </Box>
      <Box display="flex" flex="1">
        <UserProfile />
      </Box>
    </Box>
  );
}

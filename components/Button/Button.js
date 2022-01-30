import { Button as ChakraButton, useBreakpointValue } from "@chakra-ui/react";

export default function Button({
  children,
  onClick = () => {},
  isResponsive = true,
  ...rest
}) {
  const isFullWidth =
    useBreakpointValue({ base: true, sm: false }) && isResponsive;

  return (
    <ChakraButton
      onClick={onClick}
      variant="primary"
      height={14}
      isFullWidth={isFullWidth}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}

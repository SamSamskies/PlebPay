import { Button as ChakraButton, useBreakpointValue } from "@chakra-ui/react";
import Color from "color";
import useGetBrandColor from "../../hooks/useGetBrandColor";

export default function Button({
  children,
  onClick = () => {},
  isResponsive = true,
  ...rest
}) {
  const isFullWidth =
    useBreakpointValue({ base: true, sm: false }) && isResponsive;
  const brandColor = useGetBrandColor();
  let textColor;

  try {
    textColor = Color(brandColor).isLight() ? "initial" : "white";
  } catch (e) {}

  return (
    <ChakraButton
      onClick={onClick}
      variant="primary"
      height={14}
      isFullWidth={isFullWidth}
      color={textColor}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}

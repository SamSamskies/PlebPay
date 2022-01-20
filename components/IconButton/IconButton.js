import Button from "../Button";

export default function IconButton({ children, ...rest }) {
  return (
    <Button sx={{ minWidth: 55, padding: 0, borderRadius: 10 }} {...rest}>
      {children}
    </Button>
  );
}

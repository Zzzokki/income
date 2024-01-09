import { Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Records",
    href: "/dashboard/records",
  },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <Stack bgcolor="#fff">
      <Container>
        <Stack height={64} direction="row" alignItems="center" gap={3}>
          <Image src="/logo.png" alt="logo" width={40} height={40} />

          <Stack flex={1} gap={1} direction="row">
            {tabs.map(({ label, href }) => {
              const isActive = pathname === href;

              return (
                <Link key={label} href={href}>
                  <Button variant="text">
                    <Typography
                      color={isActive ? "text.primary" : "text.secondary"}
                      textTransform="none"
                    >
                      {label}
                    </Typography>
                  </Button>
                </Link>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

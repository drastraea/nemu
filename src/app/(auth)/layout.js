import { Card, CardBody } from "@heroui/react";

export default function Layout({ children }) {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center">
      <Card shadow="lg" className="w-[460px] p-6">
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
}

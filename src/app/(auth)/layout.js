import { Card, CardBody } from "@heroui/react";

export default function Layout({ children }) {
  return (
    <div className="relative h-screen flex justify-center items-center">
      <Card shadow="lg" className="w-[400px] p-6">
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
}

"use client";
import { Card } from "@repo/ui/components/ui/card";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@repo/ui/components/ui/resizable";
import { Separator } from "@repo/ui/components/ui/separator";
import Image from "next/image";
import React from "react";

export const AppLogo = () => {
  return <h1 className="text-5xl font-bold">VIDEO-L</h1>;
};

export const AppPageBodyCard = ({
  children,
  className,
}: {
  children: React.ReactNode;

  className?: string;
}): JSX.Element => {
  return (
    <div
      className={"flex items-center justify-center"}
      style={{ height: "100vh", width: "100vw" }}
    >
      <Card
        className={"flex" + (className ? ` ${className}` : "")}
        style={{
          height: "calc(100vh - 4rem)",
          width: "calc(100vw - 4rem)",
        }}
      >
        {children}
      </Card>
    </div>
  );
};

export const ImageCollage = ({ images }: { images: string[] }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export const AppPageDesign1 = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  return (
    <AppPageBodyCard className="justify-end">
      <div
        className="flex"
        style={{
          height: "calc(100vh - 4rem)",
          width: "calc(50vw - 2rem)",
        }}
      >
        <Separator orientation="vertical" />
        <div
          style={{
            height: "calc(50vh - 2rem)",
            width: "calc(50vw - 2rem)",
          }}
        >
          <div className="flex items-center justify-center">
            <div
              style={{
                height: "calc(50vh - 2rem)",
                width: "calc(50vw - 2rem)",
              }}
              ref={ref}
              onLoad={() => {
                setSize({
                  width: ref.current?.clientWidth || 0,
                  height: ref.current?.clientHeight || 0,
                });
              }}
            >
              <Image
                alt="Image 0_0"
                src="/images/0_0.webp"
                className="rounded-lg"
                width={size.width}
                height={size.height}
                style={{
                  objectFit: "cover",
                  width: "calc(50vw - 2rem)",
                  height: "calc(50vh - 2rem)",
                }}
              />
            </div>
          </div>

          <Separator
            orientation="horizontal"
            style={{
              width: "calc(50vw - 2rem)",
            }}
          />

          <div className="flex items-center justify-center">
            <div
              style={{
                height: "calc(50vh - 2rem)",
                width: "calc(50vw - 2rem)",
              }}
            >
              <Image
                alt="Image 0_0"
                src="/images/0_1.webp"
                className="rounded-lg"
                width={size.width}
                height={size.height}
                style={{
                  objectFit: "cover",
                  width: "calc(50vw - 2rem)",
                  height: "calc(50vh - 2rem)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AppPageBodyCard>
  );
};

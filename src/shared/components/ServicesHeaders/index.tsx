import React from "react";
import header from "./servicesheader.module.css";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

interface ServiceHeaderProps {
  headingBlue?: string;
  headingOrange?: string;
  content?: string;
  desc_width?: string;
  Mirroreffect?: boolean;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  headingBlue,
  headingOrange,
  content,
  desc_width,
  Mirroreffect,
}) => {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();

  const headingStyle: React.CSSProperties | undefined =
    Mirroreffect && isRtl
      ? {
          display: "flex",
          flexDirection: "row-reverse" as const,
        }
      : undefined;

  return (
    <div className={header.warpper}>
      <div className={header.outerer}>
        <p className={header.heading} style={headingStyle}>
          <span className={header.blue}>{headingBlue}</span>
          <span className={header.orange}>{headingOrange}</span>
        </p>
        <p
          className={header.content}
          style={
            isRtl
              ? { lineHeight: "30px" }
              : { width: desc_width ? desc_width : "100%" }
          }
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default ServiceHeader;

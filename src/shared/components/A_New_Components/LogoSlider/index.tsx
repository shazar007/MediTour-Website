import React from "react";
import classes from "./LogoSlider.module.css";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const LogoSlider = (props: any) => {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();

  const duplicatedContent = [...props.clientsContent, ...props.clientsContent];

  return (
    <section className={classes.container}>
      <div
        className={`${classes.logosSlide} ${
          isRtl ? classes.rtlAnimation : classes.ltrAnimation
        }`}
        style={isRtl ? { flexDirection: "row-reverse" } : undefined}
      >
        {duplicatedContent.map((client: any, i: number) => (
          <img
            key={i}
            src={client.source}
            alt={client.alt || `Client Logo ${i + 1}`}
            className={classes.logoImage}
          />
        ))}
      </div>
    </section>
  );
};

export default LogoSlider;

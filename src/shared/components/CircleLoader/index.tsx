import * as React from "react";

import { Circles } from "react-loader-spinner";

interface Props {
  height: any;
  width: any;
  color: any;
}

export default function CircleLoader(props: Partial<Props>) {
  const { height, width, color } = props;

  return (
    <Circles
      height={height}
      width={width}
      color={color}
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const FACEBOOK_PIXEL_ID = "1726290414625811";

const FacebookPixel: React.FC = () => {
  useEffect(() => {
    const initPixel = () => {
      if (window.fbq) {
        console.log("✅ Facebook Pixel Loaded");
        window.fbq?.("track", "PageView"); // Use optional chaining here
      } else {
        console.log("⏳ fbq not yet available, retrying...");
        setTimeout(initPixel, 100); // Retry if fbq is not loaded
      }
    };
    initPixel();
  }, []);

  return (
    <>
      <Helmet>
        <script>
          {`
            !function(f,b,e,v,n,t,s) {
              if(f.fbq) return;
              n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0'; n.queue=[];
              t=b.createElement(e); t.async=!0; t.src=v;
              s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);
            }(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FACEBOOK_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </script>
      </Helmet>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
          alt="Fab"
        />
      </noscript>
    </>
  );
};

export default FacebookPixel;

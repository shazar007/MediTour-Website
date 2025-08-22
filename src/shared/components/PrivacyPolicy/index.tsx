import React from "react";
import styles from "./Policy.module.css";
import commonstyle from "../../../shared/utils/common.module.css";
import classNames from "classnames";
import SearchBar from "../Searchbar";
export default function PrivacyPolicy() {
  return (
    <div className={classNames(commonstyle.col12, styles.word)}>
      <div className={classNames(commonstyle.pr36)}>
        <div className={styles.outerContainer}>
          <div>
            <p
              className={classNames(
                commonstyle.fs24,
                commonstyle.semiBold,
                commonstyle.colorBlue
              )}
            >
              Privacy Policies
            </p>
            <p
              className={classNames(
                commonstyle.fs16,
                commonstyle.colorBlue,
                commonstyle.mt24
              )}
            >
              Thank you for visiting 's MediTour website. This Privacy Policy
              outlines how we collect, use, and protect the information you
              provide us through our website.
            </p>
          </div>
          <div className={classNames(commonstyle.mt24)}>
            <p
              className={classNames(
                commonstyle.fs24,
                commonstyle.semiBold,
                commonstyle.colorBlue
              )}
            >
              {" "}
              Website
            </p>
            <p
              className={classNames(
                commonstyle.fs16,
                commonstyle.colorBlue,
                commonstyle.mt24
              )}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
              iusto laudantium unde similique autem, cupiditate qui iure nihil
              doloribus porro optio vel! Facilis aut voluptatem provident
              dolorum molestias! Veritatis vitae aperiam, aliquam ipsam quae
              placeat laborum rem, quo reprehenderit iusto et nesciunt nam
              explicabo illo nisi temporibus mollitia tempora animi, debitis
              veniam. Officia, quisquam sed labore velit quasi minus ipsam
              fugiat accusamus! Adipisci esse quae, odit voluptas eveniet sequi
              ipsam distinctio magni! Iste, quasi laborum vel nisi mollitia
              fugit error!
            </p>
          </div>
          <div className={classNames(commonstyle.mt56)}>
            <p
              className={classNames(
                commonstyle.fs24,
                commonstyle.semiBold,
                commonstyle.colorBlue
              )}
            >
              {" "}
              Privacy Policies
            </p>
            <p
              className={classNames(
                commonstyle.fs16,
                commonstyle.colorBlue,
                commonstyle.mt24
              )}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
              voluptatum dignissimos deleniti sit quasi beatae voluptate. Iusto
              unde earum natus architecto quas distinctio, cupiditate labore
              laboriosam exercitationem odit optio. Facere ducimus laudantium
              omnis, illum eos consequuntur eum architecto saepe modi veniam
              aspernatur similique quisquam accusantium velit totam? Provident
              praesentium, tenetur possimus labore magni nulla architecto ab
              repellendus, nihil eligendi perferendis, explicabo rerum vero
              facilis quia totam odit ipsa! Nihil modi numquam dignissimos! Hic
              aliquid laborum ipsa provident, consectetur, esse harum nisi,
              tenetur distinctio fuga amet ipsum ab. Itaque eveniet tenetur
              repudiandae, illum, praesentium adipisci molestias dicta ullam
              odio exercitationem fugiat.
            </p>
            <p
              className={classNames(
                commonstyle.fs16,
                commonstyle.colorBlue,
                commonstyle.mt24
              )}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
              omnis incidunt eaque, numquam architecto deserunt voluptate? Sunt
              perferendis exercitationem debitis consectetur? Unde, optio neque!
              Ratione maxime nisi dolore earum, quos, vel soluta explicabo quasi
              deserunt architecto rerum reiciendis in tempora quas corporis
              porro voluptatem totam? Commodi vel a sed ea hic necessitatibus
              adipisci quae reiciendis non magni quos culpa quod, sequi velit
              ipsam iusto veniam officia repellat maiores cumque error.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

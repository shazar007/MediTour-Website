import classNames from "classnames";
import styles from "./pharmacyProfile.module.css";
import PharmacyMainStyles from "../pharmacyMain.module.css";
import commonStyles from "shared/utils/common.module.css";
import Proffile from "assets/profile.png";
import { CustomInput } from "shared/components";
import { CiEdit } from "react-icons/ci";

const PharmacyProfile = () => {
  return (
    <div
      className={classNames(PharmacyMainStyles.container, commonStyles.col4)}
    >
      <div className={classNames(styles.profileBox)}>
        <img
          src={Proffile}
          alt="pharmacy Profile"
          className={classNames(commonStyles.col12)}
        />
      </div>
      <div className={classNames(styles.editBox)}>
        <div className={classNames(commonStyles.flxCenter)}>
          <CiEdit className={classNames(commonStyles.col6, styles.mt10)} />
        </div>
      </div>
      <div className={classNames(commonStyles.mb28, commonStyles.flx)}>
        <div className={classNames(commonStyles.mr32, commonStyles.col6)}>
          <CustomInput placeholder="Michal" />
        </div>
        <div className={classNames(commonStyles.col6)}>
          <CustomInput placeholder="Jorden" />
        </div>
      </div>
      <div className={classNames(commonStyles.col12, commonStyles.mb32)}>
        <CustomInput placeholder="(+1 ) 000 11111 22222" />
      </div>
      <div className={classNames(commonStyles.col12)}>
        <CustomInput placeholder="Micheal Horden1234@gmail.com" />
      </div>
    </div>
  );
};

export default PharmacyProfile;

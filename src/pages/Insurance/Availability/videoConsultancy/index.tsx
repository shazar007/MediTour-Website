import style from "../nutritionistAvailability.module.css";
import commomstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface Onsite {
  setShowAddModal: any;
}

const VideoConsultancy = (props: Partial<Onsite>) => {
  return (
    <>
      <div style={{ margin: "60px", marginLeft: "110px" }}>
        <div className={style.datebox}>
          <div>
            <p className={classNames(commomstyles.fs16, commomstyles.semiBold)}>
              Monday
            </p>
          </div>
          <div className={style.mrauto}>
            <IoMdCloseCircleOutline className={style.closee} />
          </div>
        </div>
        <div className={style.datebox}>
          <div>
            <p className={classNames(commomstyles.fs16, commomstyles.semiBold)}>
              Tuesday
            </p>
          </div>
          <div className={style.mrauto}>
            <IoMdCloseCircleOutline className={style.closee} />
          </div>
        </div>
        <div className={style.datebox}>
          <div>
            <p className={classNames(commomstyles.fs16, commomstyles.semiBold)}>
              Wednesday
            </p>
          </div>
          <div className={style.mrauto}>
            <IoMdCloseCircleOutline className={style.closee} />
          </div>
        </div>
        <div className={style.datebox}>
          <div>
            <p className={classNames(commomstyles.fs16, commomstyles.semiBold)}>
              Thursday
            </p>
          </div>
          <div className={style.mrauto}>
            <IoMdCloseCircleOutline className={style.closee} />
          </div>
        </div>
        <div className={style.datebox}>
          <div>
            <p className={classNames(commomstyles.fs16, commomstyles.semiBold)}>
              Friday
            </p>
          </div>
          <div className={style.mrauto}>
            <IoMdCloseCircleOutline className={style.closee} />
          </div>
        </div>
        <div className={style.datebox}>
          <div>
            <p className={classNames(commomstyles.fs16, commomstyles.semiBold)}>
              Saturday
            </p>
          </div>
          <div className={style.mrauto}>
            <IoMdCloseCircleOutline className={style.closee} />
          </div>
        </div>
        <div className={style.datebox}>
          <div>
            <p className={classNames(commomstyles.fs16, commomstyles.semiBold)}>
              Sunday
            </p>
          </div>
          <div className={style.mrauto}>
            <IoMdCloseCircleOutline className={style.closee} />
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoConsultancy;

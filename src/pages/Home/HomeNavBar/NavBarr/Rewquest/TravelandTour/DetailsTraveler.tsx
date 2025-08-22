import { CustomInput } from "shared/components";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import { LuHardDriveUpload } from "react-icons/lu";

function DetailsTraveler({ traveler }: { traveler?: any }) {
  return (
    <div style={{ padding: "10px", gap: "12px" }}>
      <div
        className={classNames(
          commonstyle.flx,
          commonstyle.flxBetween,
          commonstyle.flxWrap
        )}
      >
        <div className={classNames(commonstyle.colsm12, commonstyle.colmd12)}>
          <CustomInput value={traveler.name} type="text" />
        </div>
        <div className={classNames(commonstyle.colsm12, commonstyle.colmd12)}>
          <CustomInput value={traveler.passportNo} name="passportNo" />
        </div>
      </div>
      <div
        className={classNames(
          commonstyle.flx,
          commonstyle.flxWrap,
          commonstyle.flxBetween
        )}
      >
        <div
          className={classNames(
            commonstyle.col5,
            commonstyle.colmd12,
            commonstyle.colsm12
          )}
        >
          <span style={styles.mediumText}>Visa</span>
          <div style={styles.afterUpload}>
            <div>
              <div className={classNames(commonstyle.flx)}>
                <LuHardDriveUpload
                  style={{
                    color: "#0d47a1",
                    margin: "5px",
                  }}
                />
                <span style={styles.fileText}>Visa file </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={classNames(
            commonstyle.col5,
            commonstyle.colmd12,
            commonstyle.colsm12
          )}
        >
          <span style={styles.mediumText}>Passport</span>
          <div style={styles.afterUpload}>
            <div>
              <div className={classNames(commonstyle.flx)}>
                <LuHardDriveUpload
                  style={{
                    color: "#0d47a1",
                    margin: "5px",
                  }}
                />
                <span style={styles.fileText}>Passport file </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  RoW: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  RowView: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  ImageView: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    objectFit: "contain",
  },
  ImageView1: {
    width: "16px",
    height: "16px",
    objectFit: "contain",
  },
  text: {
    fontSize: "16px",
    color: "#00276D",
  },
  mediumText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#00276D",
  },
  fileText: {
    fontSize: "12px",
    width: "200px",
    color: "#00276D",
  },
  afterUpload: {
    display: "flex",
    gap: "16px",
    border: "1px dashed",
    padding: "8px",
    borderRadius: "8px",
    backgroundColor: "#f7f7f7",
  },
};

export default DetailsTraveler;

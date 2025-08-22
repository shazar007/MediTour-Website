import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import SearchBar from "shared/components/Searchbar";
import style from "./PatientHistory.module.css";
import { PrimaryButton } from "shared/components";
export default function Prescription() {
  return (
    <div className={classNames(commonstyles.col12, commonstyles.colorBlue)}>
      <SearchBar />

      <div className={commonstyles.mr87}>
        <div className={style.outerContainer}>
          <div className={style.flx}>
            <select className={style.selecttions}>
              <option value="0">Latest Prescription</option>
              <option value="1">Audi</option>
              <option value="2">BMW</option>
              <option value="3">Citroen</option>
            </select>
            <div className={style.Prescription}>
              <PrimaryButton children={"Prescription"} colorType={"blue"} />
            </div>
          </div>
          <div className={style.maincard}>
            <p className={classNames(commonstyles.fs32, commonstyles.bold)}>
              Jinnah Hospital Lahore
            </p>
            <div>
              <p
                className={classNames(commonstyles.fs14, commonstyles.semiBold)}
              >
                Doctor Name: Dr. Laiba
              </p>
              <p className={classNames(commonstyles.fs14, style.mt8)}>
                Cell No.01234567891
              </p>
            </div>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              style.mt16,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>
              Patient Name:
            </p>
            <p> Zumar Yousaf</p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              style.mt16,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>Age:</p>
            <p> 22</p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              style.mt16,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>
              Address:
            </p>
            <p>Architect society</p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              style.mt16,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>
              Date:
            </p>
            <p> 28/10/2023 </p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              commonstyles.mt56,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>
              Tablets:
            </p>
            <p className={style.mr24}> Panadol CF day Caplet 500mg/5mg </p>
            <p className={classNames(commonstyles.fs16)}>
              <strong className={commonstyles.mr8}>3</strong> times in a day
            </p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              style.mt16,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>
              Syrups:
            </p>
            <p className={style.mr24}> Panadol CF day Caplet 500mg/5mg </p>
            <p className={classNames(commonstyles.fs16)}>
              <strong className={commonstyles.mr8}>3</strong> 3 times with 2
              Spoons
            </p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              style.mt16,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>
              Drops:
            </p>
            <p className={style.mr24}> Panadol CF day Caplet 500mg/5mg </p>
            <p className={classNames(commonstyles.fs16)}>
              <strong className={commonstyles.mr8}>3</strong> 15 Drops in
              morning
            </p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              commonstyles.mt56,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>
              Patient Name:
            </p>
            <p> Zumar Yousaf</p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              style.mt16,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>Age:</p>
            <p> 22</p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              style.mt16,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>
              Address:
            </p>
            <p>Architect society</p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              style.mt16,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>
              Date:
            </p>
            <p> 28/10/2023 </p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              commonstyles.mt56,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>
              Tablets:
            </p>
            <p className={style.mr24}> Panadol CF day Caplet 500mg/5mg </p>
            <p className={classNames(commonstyles.fs16)}>
              <strong className={commonstyles.mr8}>3</strong> times in a day
            </p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              style.mt16,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>
              Syrups:
            </p>
            <p className={style.mr24}> Panadol CF day Caplet 500mg/5mg </p>
            <p className={classNames(commonstyles.fs16)}>
              <strong className={commonstyles.mr8}>3</strong> 3 times with 2
              Spoons
            </p>
          </div>
          <div
            className={classNames(
              commonstyles.flx,
              style.mt16,
              commonstyles.fs16
            )}
          >
            <p className={classNames(commonstyles.semiBold, style.mr8)}>
              Drops:
            </p>
            <p className={style.mr24}> Panadol CF day Caplet 500mg/5mg </p>
            <p className={classNames(commonstyles.fs16)}>
              <strong className={commonstyles.mr8}>3</strong> 15 Drops in
              morning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

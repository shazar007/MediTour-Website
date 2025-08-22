import React, { useState, useRef, useEffect } from "react";
import style from "./profile.module.css";
import commomstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Avatar from "assets/images/actor.png";
import { IoCameraOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import CustomModal from "../Modal";
import PrimaryButton from "../PrimaryButton";
import Browse from "assets/images/Browse.png";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import CustomInput from "../Input";
import LocationInput from "../LocationInput";

export default function Profile() {
  const [showBackGroundImg, setShowBackGroundImg] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleclose = () => {
    // setShowBackGroundImg(false);
    setShowBackGroundImg(false);
  };
  const handlecloseLocation = () => {
    setShowLocation(false);
    setIsModalClosed(true);
  };

  useEffect(() => {
    if (!showBackGroundImg && isModalClosed) {
      setSelectedImage(null);
      setIsModalClosed(false);
    }
  }, [showBackGroundImg, isModalClosed]);

  return (
    <div className={classNames(commomstyles.col12)}>
      <div className={commomstyles.mr87}>
        <div className={style.algin}>
          <div className={style.container}>
            <div className={style.header}>
              <img
                src={selectedImage || undefined}
                style={{
                  width: "100%",
                  height: "188px",
                  borderRadius: "24px 24px 0 0",
                }}
                alt="header"
              />
              <div className={style.cameraOuter}>
                <IoCameraOutline
                  className={style.camera}
                  onClick={() => setShowBackGroundImg(!showBackGroundImg)}
                />
              </div>
              <CustomModal showModal={showBackGroundImg}>
                <div style={{ width: "340px" }}>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <IoClose className={style.close} onClick={handleclose} />
                  </div>
                  {selectedImage ? (
                    <div>
                      <FaCheckCircle className={style.okCheck} />
                      <p
                        className={classNames(
                          commomstyles.fs16,
                          commomstyles.semiBold,
                          commomstyles.colorBlue,
                          style.textcenter,
                          style.mt16
                        )}
                      >
                        Image has been updated successfully
                      </p>
                    </div>
                  ) : (
                    <>
                      <img src={Browse} alt="Browse" className={style.browse} />
                      <p
                        style={{ padding: "0 20px" }}
                        className={classNames(
                          commomstyles.fs14,
                          commomstyles.colorBlue,
                          style.textcenter
                        )}
                      >
                        Upload image in JPG, PNG or SVG and must be of size 2mb
                      </p>
                      <div className={style.btnWidth}>
                        <PrimaryButton
                          children={"Browse"}
                          colorType={"blue"}
                          onClick={handleBrowseClick}
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </>
                  )}
                </div>
              </CustomModal>
            </div>
            <div className={style.parents}>
              <div className={style.logOuter}>
                <img src={Avatar} className={style.logo} alt="zsdsd" />
              </div>{" "}
              <div className={style.camerasmall}>
                <IoCameraOutline className={style.samllLogo} />
              </div>
            </div>
            <div className={style.Center}>
              <div
                className={classNames(
                  commomstyles.flx,
                  style.mt70,
                  commomstyles.colorBlue
                )}
              >
                {" "}
                <p
                  className={classNames(
                    commomstyles.fs24,
                    commomstyles.semiBold
                  )}
                >
                  Chughtai Healthcare
                </p>
                <CiEdit
                  className={style.edit}
                  onClick={() => setShowLocation(!showLocation)}
                />
              </div>
              <CustomModal showModal={showLocation}>
                <div style={{ width: "340px" }}>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <IoClose
                      className={style.close}
                      onClick={handlecloseLocation}
                    />
                  </div>
                  <div>
                    <CustomInput placeholder="Change Name" />
                    {/* <div style={{ margin: "16px 0 24px" }}>
                      <LocationInput
                        placeholder="Change Location"
                      />
                    </div> */}
                    <div className={style.btnWidth}>
                      <PrimaryButton
                        children={"Save"}
                        colorType={"green"}
                        onClick={handlecloseLocation}
                      />
                    </div>
                  </div>
                </div>
              </CustomModal>
            </div>
            <div
              className={classNames(
                style.Center,
                commomstyles.colorBlue,

                style.mt16
              )}
            >
              <IoLocationOutline className={style.Location} />
              <p className={classNames(commomstyles.fs18)}>
                154D, Architect Society, LHR
              </p>
            </div>
            <div className={style.borderBottom}></div>
            <div
              className={classNames(
                style.Center,
                style.mt24,
                commomstyles.colorBlue
              )}
            >
              <div className={commomstyles.flxBetween}>
                <div className={style.mr48}>
                  <p className={classNames(commomstyles.fs14)}>Owner Name</p>{" "}
                  <p
                    className={classNames(
                      commomstyles.fs16,
                      style.mt8,
                      commomstyles.semiBold
                    )}
                  >
                    Bilal Azam
                  </p>
                </div>
                <div className={style.ml48}>
                  <p className={classNames(commomstyles.fs14)}>CNIC No.</p>{" "}
                  <p
                    className={classNames(
                      commomstyles.fs16,
                      style.mt8,
                      commomstyles.semiBold
                    )}
                  >
                    23904u3u93-u5
                  </p>
                </div>
              </div>
            </div>
            <div
              className={classNames(
                style.Center,
                style.mt24,
                commomstyles.colorBlue
              )}
            >
              <div className={commomstyles.flxBetween}>
                <div className={style.mr48}>
                  <p className={classNames(commomstyles.fs14)}>License No.</p>
                  <p
                    className={classNames(
                      commomstyles.fs16,
                      style.mt8,
                      commomstyles.semiBold
                    )}
                  >
                    123546785-1-23
                  </p>
                </div>
                <div className={style.ml48}>
                  <p className={classNames(commomstyles.fs14)}>Emerg No.</p>
                  <p
                    className={classNames(
                      commomstyles.fs16,
                      style.mt8,
                      commomstyles.semiBold
                    )}
                  >
                    0300 1234567
                  </p>
                </div>
              </div>
            </div>
            <div
              className={classNames(
                style.Center,
                style.mt24,
                commomstyles.colorBlue
              )}
            >
              <div className={commomstyles.flxBetween}>
                <div className={style.mr48}>
                  <p className={classNames(commomstyles.fs14)}>Lab Open Time</p>
                  <p
                    className={classNames(
                      commomstyles.fs16,
                      style.mt8,
                      commomstyles.semiBold
                    )}
                  >
                    09:30 AM
                  </p>
                </div>
                <div className={style.ml48}>
                  <p className={classNames(commomstyles.fs14)}>
                    Lab Close Time
                  </p>{" "}
                  <p
                    className={classNames(
                      commomstyles.fs16,
                      style.mt8,
                      commomstyles.semiBold
                    )}
                  >
                    12:30 PM
                  </p>
                </div>
              </div>
            </div>
            <div style={{ padding: "0 100px" }}>
              <p className={classNames(style.mt24, commomstyles.colorBlue)}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

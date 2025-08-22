import React from "react";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import style from "./chat.module.css";
import { Avatar } from "@mui/material";
import AAvatar from "assets/images/actor.png";
import { IoCallOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { RxUpload } from "react-icons/rx";
import { FaMicrophone } from "react-icons/fa";

export default function Chat() {
  return (
    <div className={classNames(commonstyles.col12)}>
      <div className={commonstyles.mr87}>
        <div className={style.outerContainer}>
          <p className={classNames(commonstyles.fs14, commonstyles.semiBold)}>
            Chats
          </p>
          <div
            className={classNames(commonstyles.flxBetween, commonstyles.mt56)}
          >
            <div className={commonstyles.col3}>
              <div className={commonstyles.flx}>
                <Avatar src={AAvatar} className={style.avatar} />
                <div>
                  <p
                    className={classNames(
                      commonstyles.fs20,
                      commonstyles.semiBold
                    )}
                  >
                    Zumar Yousaf
                  </p>
                  <p className={classNames(commonstyles.fs16, style.mt8)}>
                    {" "}
                    I Would like to confirm my appointment time.
                  </p>
                </div>
              </div>
              <div className={classNames(commonstyles.flx, style.mt16)}>
                <Avatar src={AAvatar} className={style.avatar} />
                <div>
                  <p
                    className={classNames(
                      commonstyles.fs20,
                      commonstyles.semiBold
                    )}
                  >
                    Zumar Yousaf
                  </p>
                  <p className={classNames(commonstyles.fs16, style.mt8)}>
                    {" "}
                    I Would like to confirm my appointment time.
                  </p>
                </div>
              </div>
              <div className={classNames(commonstyles.flx, style.mt16)}>
                <Avatar src={AAvatar} className={style.avatar} />
                <div>
                  <p
                    className={classNames(
                      commonstyles.fs20,
                      commonstyles.semiBold
                    )}
                  >
                    Zumar Yousaf
                  </p>
                  <p className={classNames(commonstyles.fs16, style.mt8)}>
                    {" "}
                    I Would like to confirm my appointment time.
                  </p>
                </div>
              </div>
              <div className={classNames(commonstyles.flx, style.mt16)}>
                <Avatar src={AAvatar} className={style.avatar} />
                <div>
                  <p
                    className={classNames(
                      commonstyles.fs20,
                      commonstyles.semiBold
                    )}
                  >
                    Zumar Yousaf
                  </p>
                  <p className={classNames(commonstyles.fs16, style.mt8)}>
                    {" "}
                    I Would like to confirm my appointment time.
                  </p>
                </div>
              </div>
              <div className={classNames(commonstyles.flx, style.mt16)}>
                <Avatar src={AAvatar} className={style.avatar} />
                <div>
                  <p
                    className={classNames(
                      commonstyles.fs20,
                      commonstyles.semiBold
                    )}
                  >
                    Zumar Yousaf
                  </p>
                  <p className={classNames(commonstyles.fs16, style.mt8)}>
                    {" "}
                    I Would like to confirm my appointment time.
                  </p>
                </div>
              </div>
              <div className={classNames(commonstyles.flx, style.mt16)}>
                <Avatar src={AAvatar} className={style.avatar} />

                <div>
                  <p
                    className={classNames(
                      commonstyles.fs20,
                      commonstyles.semiBold
                    )}
                  >
                    Zumar Yousaf
                  </p>
                  <p className={classNames(commonstyles.fs16, style.mt8)}>
                    {" "}
                    I Would like to confirm my appointment time.
                  </p>
                </div>
              </div>
            </div>
            <div className={commonstyles.col7}>
              <div className={style.callbox}>
                <Avatar src={AAvatar} className={style.UserLogo} />
                <p
                  className={classNames(
                    commonstyles.fs20,
                    commonstyles.semiBold
                  )}
                >
                  Zumar Yousaf
                </p>
                <div className={classNames(style.end)}>
                  <IoCallOutline className={style.calls} />
                  <IoVideocamOutline className={style.calls} />
                </div>
              </div>
              <div className={classNames(style.mt24, style.flxend)}>
                <Avatar src={AAvatar} className={style.chat} />
                <div className={style.message}>
                  <p
                    className={classNames(
                      commonstyles.fs24,
                      commonstyles.semiBold
                    )}
                  >
                    How are you?
                  </p>
                </div>
              </div>
              <div className={classNames(style.mt24, style.flxend)}>
                <Avatar src={AAvatar} className={style.chat} />
                <div className={style.message2}>
                  <p
                    className={classNames(
                      commonstyles.fs24,
                      commonstyles.semiBold
                    )}
                  >
                    I am fine.
                  </p>
                </div>
              </div>
              <div className={classNames(style.mt24, style.flxend)}>
                <Avatar src={AAvatar} className={style.chat} />
                <div className={style.message}>
                  <p
                    className={classNames(
                      commonstyles.fs24,
                      commonstyles.semiBold
                    )}
                  >
                    Can i know how many time Required to recover?
                  </p>
                </div>
              </div>
              <div className={classNames(style.mt24, style.flxend)}>
                <Avatar src={AAvatar} className={style.chat} />
                <div className={style.message2}>
                  <p
                    className={classNames(
                      commonstyles.fs24,
                      commonstyles.semiBold
                    )}
                  >
                    U will recover with in a week In shaa Allah
                  </p>
                </div>
              </div>
              <div className={classNames(style.type)}>
                <MdOutlineEmojiEmotions className={style.calls} />
                <input placeholder="Type" />
                <div className={style.end}>
                  <RxUpload className={style.mic} />
                  <FaMicrophone className={style.mic} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

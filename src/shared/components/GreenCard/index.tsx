import React from "react";
import style from "./green.module.css";
import {
  MdFormatListNumberedRtl,
  MdOutlineLocationOn,
  MdOutlineMail,
  MdOutlineModeOfTravel,
} from "react-icons/md";
import { BiSolidPhone } from "react-icons/bi";
import { LuBed } from "react-icons/lu";
const GreenCard = ({
  onclickDetail,
  data,
  rejectCase,
  type,
  acceptCase,
  request,
  tourRequestType,
  detail,
}: {
  onclickDetail?: any;
  data?: any;
  type?: any;
  rejectCase?: any;
  acceptCase?: any;
  request?: any;
  tourRequestType?: any;
  detail?: any;
}) => {
  let imageUrl =
    data?.images?.length > 0
      ? data.images[0]
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU";
  const totalRooms =
    type === "travel"
      ? "24 Tours Offered"
      : data?.totalRooms
      ? `${data?.totalRooms} Rooms`
      : "0 Rooms";
  return (
    <div className={style.card}>
      {/* IMAGEEEE */}

      <img src={imageUrl} alt="GreenCard" className={style.imageContainer} />
      {/* GENERAL INFORMATION */}
      <div className={style.spaceBetween}>
        <div className={style.cardContent}>
          <div className={style.divcardContent}>
            <div className={style.textHeader}>
              {data?.name || "Green Tourism"}
            </div>
            <div className={style.locationText}>
              {`${data?.location?.city}` || "Islamabad, Pakistan"}
            </div>
            {/* <div className={style.rowcontent}>
              {type === "travel" || tourRequestType ? (
                <MdOutlineModeOfTravel size={16} color="#7D7D7D" />
              ) : (
                <LuBed size={16} color="#7D7D7D" />
              )}
              {type === "request" ? (
                <div className={style.textrow}>
                  {request?.totalRooms
                    ? request?.totalRooms
                    : "24 Tours Offered"}
                </div>
              ) : (
                <div className={style.textrow}>{totalRooms}</div>
              )}
            </div> */}
            {(type === "travel" || tourRequestType) && (
              <div className={style.rowcontent}>
                <MdFormatListNumberedRtl size={16} color="#7D7D7D" />
                {/* <MdOutlineModeOfTravel size={16} color="#7D7D7D" /> */}
                {tourRequestType ? (
                  <div className={style.textrow}>
                    {`${request?.toursCount}+ Tours` || "800+ Tours"}
                  </div>
                ) : (
                  <div className={style.textrow}>
                    {`${data?.toursCount}+ Tours` || "800+ Tours"}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* <div className={style.rowdisplay}>
           <div className={style.footer}>
              <div className={style.footerText}>
                {data?.experience ? `${data.experience} years` : "0 years"}
              </div>
              <div className={style.footerSubText}>Experience</div>
            </div> 
      <div className={style.bar} />
            <div className={style.footer}>
              <div className={style.footerText}>
                {data?.satisfiedPatientPercentage && data?.satisfiedPatientCount
                  ? `${data.satisfiedPatientPercentage} (${data.satisfiedPatientCount})`
                  : request?.satisfiedPatientPercentage &&
                    request?.satisfiedPatientCount
                  ? `${request.satisfiedPatientPercentage} (${request.satisfiedPatientCount})`
                  : "0 %"}
              </div>
              <div className={style.footerSubText}>Satisfied Guest</div>
            </div>
          </div>*/}
        </div>
        {/* CENTER BAR */}
        <div className={style.centerBar} />
        {/* LASTFORMAT  */}
        <div className={style.end}>
          <div className={style.rowWay}>
            <div className={style.feactureFont}>Featuring</div>
            {data?.features?.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                  marginTop: "8px",
                  marginBottom: "24px",
                }}
              >
                {data?.features?.map((f: any) => (
                  <div className={style.feacture}>{f}</div>
                ))}
              </div>
            ) : (
              <div
                style={{ display: "flex", marginTop: "16px", fontSize: "14px" }}
              >
                No Features Available
              </div>
            )}
          </div>
          <div className={style.rowDetail}>
            <div className={style.format}>
              <div className={style.rowcontent}>
                <BiSolidPhone size={16} color="#7D7D7D" />
                <div className={style.textrow}>
                  {data?.phoneNumber || "+92-322-1234567"}
                </div>
              </div>
              {/* <div className={style.rowcontent}>
                <MdOutlineMail size={16} color="#7D7D7D" />
                <div className={style.textrow}>
                  {data?.email || "umer.blisstravel@gmail.com"}
                </div>
              </div> */}
              <div className={style.rowcontent}>
                <MdOutlineLocationOn size={16} color="#7D7D7D" />
                <div className={style.textRow2}>
                  {" "}
                  {`${data?.location?.address}` || "154-D Mall Road, Lahore"}
                </div>
              </div>
            </div>
            {type === "request" ? (
              <div className={style.acceptRow}>
                <div className={style.reject} onClick={rejectCase}>
                  Reject
                </div>
                <div className={style.accept} onClick={acceptCase}>
                  Accept
                </div>
              </div>
            ) : (
              !detail && (
                <div className={style.detail} onClick={onclickDetail}>
                  Mange
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenCard;

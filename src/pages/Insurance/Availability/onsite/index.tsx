import style from "../nutritionistAvailability.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaEdit } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

import commomstyles from "shared/utils/common.module.css";
import { Typography } from "@mui/material";
import classNames from "classnames";
import { FaRegCheckCircle } from "react-icons/fa";

interface Onsite {
  setShowAddModal: any;
}

const Onsite = (props: Partial<Onsite>) => {
  return (
    <>
      <div style={{ marginTop: "60px", marginLeft: "110px" }}>
        <Accordion className={style.dropdown}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                style={{ color: "white", paddingRight: "25px" }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "600" }}>
              {" "}
              <p className={classNames(commomstyles.fs16, style.ml20)}>
                Monday
              </p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr style={{ marginBottom: "10px" }}></hr>
              <div className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 09:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To : 12:00 PM</p>
                </div>
                <div className={style.editbox}>
                  <div className={commomstyles.flx}>
                    <FaEdit />
                    <p>Edit</p>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "16px" }} className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 11:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To: 09:00 AM</p>
                </div>
              </div>
              <div>
                <div className={commomstyles.flx}>
                  <button className={style.cancel}>
                    <IoIosCloseCircleOutline className={style.logo} />
                    Cancel
                  </button>
                  <button className={style.save}>
                    {" "}
                    <FaRegCheckCircle className={style.logo} />
                    Save
                  </button>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className={style.dropdown}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                style={{ color: "white", paddingRight: "25px" }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "600" }}>
              {" "}
              <p className={classNames(commomstyles.fs16, style.ml20)}>
                Tuesday
              </p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr style={{ marginBottom: "10px" }}></hr>
              <div className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 09:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To : 12:00 PM</p>
                </div>
                <div className={style.editbox}>
                  <div className={commomstyles.flx}>
                    <FaEdit />
                    <p>Edit</p>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "16px" }} className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 11:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To: 09:00 AM</p>
                </div>
              </div>
              <div>
                <div className={commomstyles.flx}>
                  <button className={style.cancel}>
                    <IoIosCloseCircleOutline className={style.logo} />
                    Cancel
                  </button>
                  <button className={style.save}>
                    {" "}
                    <FaRegCheckCircle className={style.logo} />
                    Save
                  </button>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className={style.dropdown}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                style={{ color: "white", paddingRight: "25px" }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "600" }}>
              {" "}
              <p className={classNames(commomstyles.fs16, style.ml20)}>
                Wednesday
              </p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr style={{ marginBottom: "10px" }}></hr>
              <div className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 09:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To : 12:00 PM</p>
                </div>
                <div className={style.editbox}>
                  <div className={commomstyles.flx}>
                    <FaEdit />
                    <p>Edit</p>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "16px" }} className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 11:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To: 09:00 AM</p>
                </div>
              </div>
              <div>
                <div className={commomstyles.flx}>
                  <button className={style.cancel}>
                    <IoIosCloseCircleOutline className={style.logo} />
                    Cancel
                  </button>
                  <button className={style.save}>
                    {" "}
                    <FaRegCheckCircle className={style.logo} />
                    Save
                  </button>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className={style.dropdown}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                style={{ color: "white", paddingRight: "25px" }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "600" }}>
              <p className={classNames(commomstyles.fs16, style.ml20)}>
                Thursday
              </p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr style={{ marginBottom: "10px" }}></hr>
              <div className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 09:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To : 12:00 PM</p>
                </div>
                <div className={style.editbox}>
                  <div className={commomstyles.flx}>
                    <FaEdit />
                    <p>Edit</p>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "16px" }} className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 11:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To: 09:00 AM</p>
                </div>
              </div>
              <div>
                <div className={commomstyles.flx}>
                  <button className={style.cancel}>
                    <IoIosCloseCircleOutline className={style.logo} />
                    Cancel
                  </button>
                  <button className={style.save}>
                    {" "}
                    <FaRegCheckCircle className={style.logo} />
                    Save
                  </button>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className={style.dropdown}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                style={{ color: "white", paddingRight: "25px" }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "600" }}>
              <p className={classNames(commomstyles.fs16, style.ml20)}>
                Friday
              </p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr style={{ marginBottom: "10px" }}></hr>
              <div className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 09:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To : 12:00 PM</p>
                </div>
                <div className={style.editbox}>
                  <div className={commomstyles.flx}>
                    <FaEdit />
                    <p>Edit</p>
                  </div>
                </div>
              </div>
              <div>
                <div className={commomstyles.flx}>
                  <button className={style.cancel}>
                    <IoIosCloseCircleOutline className={style.logo} />
                    Cancel
                  </button>
                  <button className={style.save}>
                    {" "}
                    <FaRegCheckCircle className={style.logo} />
                    Save
                  </button>
                </div>
              </div>
              <div style={{ marginTop: "16px" }} className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 11:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To: 09:00 AM</p>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className={style.dropdown}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                style={{ color: "white", paddingRight: "25px" }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "600" }}>
              <p className={classNames(commomstyles.fs16, style.ml20)}>
                Saturday
              </p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr style={{ marginBottom: "10px" }}></hr>
              <div className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 09:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To : 12:00 PM</p>
                </div>
                <div className={style.editbox}>
                  <div className={commomstyles.flx}>
                    <FaEdit />
                    <p>Edit</p>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "16px" }} className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 11:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To: 09:00 AM</p>
                </div>
              </div>
              <div>
                <div className={commomstyles.flx}>
                  <button className={style.cancel}>
                    <IoIosCloseCircleOutline className={style.logo} />
                    Cancel
                  </button>
                  <button className={style.save}>
                    {" "}
                    <FaRegCheckCircle className={style.logo} />
                    Save
                  </button>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className={style.dropdown}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                style={{ color: "white", paddingRight: "25px" }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "600" }}>
              <p className={classNames(commomstyles.fs16, style.ml20)}>
                Sunday
              </p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr style={{ marginBottom: "10px" }}></hr>
              <div className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 09:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To : 12:00 PM</p>
                </div>
                <div className={style.editbox}>
                  <div className={commomstyles.flx}>
                    <FaEdit />
                    <p>Edit</p>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "16px" }} className={commomstyles.flx}>
                <div className={style.borderbttom}>
                  <p>From: 11:00 AM</p>
                </div>
                <div className={style.borderbttom}>
                  <p>To: 09:00 AM</p>
                </div>
              </div>
              <div>
                <div className={commomstyles.flx}>
                  <button className={style.cancel}>
                    <IoIosCloseCircleOutline className={style.logo} />
                    Cancel
                  </button>
                  <button className={style.save}>
                    {" "}
                    <FaRegCheckCircle className={style.logo} />
                    Save
                  </button>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};
export default Onsite;

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "./doctorsDoc.module.css";
import styles from "./doctorsDoc.module.css";
import commonstyles from "shared/utils/common.module.css";
import HospitalDoctorTable from "shared/components/HospitalTables/HospitalDoctorTables";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  getAllDepartments,
  hospitalConfirmCode,
  hospitalDoctorSearch,
  hospitalSendRequesttoDOCTOR,
  hospitalgetDoctors,
} from "shared/services/HospitalService";
import commonStyles from "shared/utils/common.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setHospitalDoctors,
  setHospitalDoctorsLength,
  setHospitalDoctorsRenderFlag,
} from "shared/redux";
import { TbRefresh } from "react-icons/tb";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import commonstyle from "shared/utils/common.module.css";
import {
  CustomInput,
  CustomModal,
  PrimaryButton,
  RingLoader,
} from "shared/components";
import { IoClose } from "react-icons/io5";
import DoctorReferModel from "shared/components/DoctorEmpty/DoctorReferModel";
import { Avatar, Checkbox } from "@mui/material";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { hospitalAddDoctorEnterCode } from "shared/utils";
import CustomSelect from "shared/components/CustomSelect";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useTranslation } from "react-i18next";

const Doctors = () => {
  const { i18n }: any = useTranslation();
  const { hospitalDoctors, hospitalDoctorsLength, hospitalDoctorsRenderFlag } =
    useSelector((state: any) => state.root.hospital);

  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);
  const [email, setEmail] = useState();
  const [rotation, setRotation] = useState<number>(0);
  const rotationIncrement: number = 90;
  const [showEnterCodeModal, setShowEnterCodeModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const itemsPerPage = 10;
  const totalItems = hospitalDoctorsLength;
  const [showAddModal, setShowAddModal] = useState(false);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const fetchDoctor = (pageno: number) => {
    setLoading(true);
    hospitalgetDoctors(pageno)
      .then((res: any) => {
        dispatch(setHospitalDoctors(res.data.doctors));
        dispatch(setHospitalDoctorsLength(res?.data?.doctorCount));
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    fetchDoctor(currentPage);
  }, []);

  const handleRotate = () => {
    setRotation(rotation - rotationIncrement);
    fetchDoctor(currentPage);
  };
  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (hospitalDoctorsLength > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      fetchDoctor(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      fetchDoctor(currentPage - 1);
    }
  };

  useEffect(() => {
    if (hospitalDoctorsRenderFlag) {
      setLoading(true);
      fetchDoctor(currentPage);
      dispatch(setHospitalDoctorsRenderFlag(false));
    }
  }, [hospitalDoctorsRenderFlag, currentPage]);

  return (
    <div
      className={
        ["ur", "ar", "ps"].includes(i18n.language)
          ? commonstyle.pl36
          : commonstyle.pr36
      }
    >
      <div className={classNames(commonstyles.col12, style.outer)}>
        <div className={commonstyles.mr87}>
          <div className={style.outerContainer}>
            <div
              className={classNames(
                commonstyles.flxBetween,
                commonstyles.flxWrap,
                commonstyles.mb32
              )}
            >
              <div className={commonstyles.flx}>
                <p
                  className={classNames(
                    commonstyles.fs24,
                    commonstyles.semiBold,
                    commonstyles.colorBlue
                  )}
                >
                  Doctors List
                </p>

                {loading ? (
                  <div className={commonstyles.loader}>
                    <RingLoader color={"#0D47A1"} size={30} />
                  </div>
                ) : (
                  <div className={style.outerRefresh}>
                    <TbRefresh
                      className={style.RefreshIcon}
                      style={{ transform: `rotate(${rotation}deg)` }}
                      onClick={handleRotate}
                    />
                  </div>
                )}
                <div className={style.outerRefresh}>
                  <BiSolidMessageSquareAdd
                    className={style.RefreshIcon}
                    onClick={() => setShowAddModal(true)}
                  />
                </div>
              </div>
              <NewPagination
                onNext={handleNextPage}
                onPrevious={handlePreviousPage}
                startItem={(currentPage - 1) * itemsPerPage + 1}
                endItem={Math.min(currentPage * itemsPerPage, totalItems)}
                totalItems={totalItems}
              />
            </div>
            <div>
              {hospitalDoctors && hospitalDoctors.length > 0 ? (
                <HospitalDoctorTable data={hospitalDoctors} />
              ) : (
                <div>
                  <PhysiotheristsEmpty />
                </div>
              )}
            </div>
          </div>
        </div>
        <CustomModal
          showModal={showAddModal}
          children={
            <ReferDoctor
              setSelectedDepartmentId={setSelectedDepartmentId}
              setShowAddModal={setShowAddModal}
              setShowEnterCodeModal={setShowEnterCodeModal}
              setEmail={setEmail}
              selectedDepartmentId={selectedDepartmentId}
            />
          }
        />
        <CustomModal
          showModal={showEnterCodeModal}
          children={
            <EnterCode
              setShowEnterCodeModal={setShowEnterCodeModal}
              email={email}
              selectedDepartmentId={selectedDepartmentId}
            />
          }
        />
      </div>
    </div>
  );
};

export default Doctors;

interface RefProps {
  setShowAddModal: any;
  setShowEnterCodeModal: any;
  setEmail: any;
  setSelectedDepartmentId: any;
  selectedDepartmentId: any;
}
interface Doctor {
  name: string;
  _id: string;
  doctorImage: string;
}
const ReferDoctor = (props: Partial<RefProps>) => {
  const [emailmodal, setEmailmodal] = useState(false);
  const [error, setError] = React.useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  const [selectedDoctorName, setSelectedDoctorName] = useState<string | null>(
    null
  );
  const [selectedDoctorImage, setSelectedDoctorImage] = useState<string | null>(
    null
  );
  const [refdoctor, setReferdoctor] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const {
    setShowAddModal,
    setShowEnterCodeModal,
    setEmail,
    setSelectedDepartmentId,
    selectedDepartmentId,
  } = props;

  useEffect(() => {
    fetchAllDepartment();
  }, []);

  const fetchAllDepartment = () => {
    getAllDepartments()
      .then((res: any) => {
        if (res?.data?.auth) {
          setDepartments(res?.data?.departments);
        }
      })
      .catch((err: any) => {});
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  const handleCloseModal = () => {
    setShowAddModal(false);
    setSelectedDepartmentId("");
  };

  const fetchDoctorSearch = (searchInput: string) => {
    setLoading(true);
    hospitalDoctorSearch(searchInput)
      .then((res: any) => {
        setReferdoctor(res.data.suggestions);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleHospitalSelection = (
    id: string,
    name: string,
    doctorImage: string
  ) => {
    setSelectedDoctorId((prevId) => (prevId === id ? null : id));
    setSelectedDoctorName(name);
    setSelectedDoctorImage(doctorImage);
  };
  useEffect(() => {
    fetchDoctorSearch(searchInput);
  }, [searchInput]);

  const ReferTheDoctor = () => {
    if (selectedDoctorId && selectedDepartmentId) {
      setEmailmodal(true);
      setError("");
    } else {
      if (!selectedDoctorId && !selectedDepartmentId) {
        setError("Please select Doctor and Department");
      } else if (!selectedDoctorId) {
        setError("Please select Doctor");
      } else if (!selectedDepartmentId) {
        setError("Please select Department");
      }
    }
  };

  const departmentOptions = departments.map((dept: any) => ({
    value: dept._id,
    label: dept.departmentName,
  }));

  const handleDepartmentSelect = (selectedOption: string) => {
    const selectedDept = departmentOptions.find(
      (dept: any) => dept.label === selectedOption
    );
    if (selectedDept) {
      setSelectedDepartmentId(selectedDept.value);
    }
  };

  return (
    <div style={{ width: "60vw" }}>
      <div>
        <CustomSelect
          placeholder="Department name"
          options={departmentOptions.map((option: any) => option.label)}
          onSelect={(selectedOption) => handleDepartmentSelect(selectedOption)}
        />
      </div>
      <div className={styles.DoctorSearch}>
        <input
          type="Search by Name"
          placeholder="Search"
          value={searchInput}
          onChange={handleInputChange}
        />
        <IoClose className={styles.close} onClick={handleCloseModal} />
      </div>

      {loading ? (
        <DoctorReferModel showModal={loading} />
      ) : (
        <div className={styles.loader}>
          {refdoctor.map((refdoctor) => (
            <div
              className={classNames(
                commonStyles.flx,
                commonStyles.flxBetween,
                styles.doctorcard
              )}
            >
              <Avatar src={refdoctor.doctorImage} className={styles.avatar} />
              <p
                className={classNames(
                  commonStyles.fs14,
                  commonStyles.medium,
                  commonStyles.colorBlue
                )}
                style={{ textTransform: "capitalize" }}
              >
                {refdoctor.name}
              </p>
              <div>
                <Checkbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={
                    <CheckCircleOutlineIcon style={{ color: "green" }} />
                  }
                  onChange={() =>
                    handleHospitalSelection(
                      refdoctor._id,
                      refdoctor.name,
                      refdoctor.doctorImage
                    )
                  }
                  checked={selectedDoctorId === refdoctor._id}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={classNames(commonStyles.flxCenter)}>
        <div
          className={styles.mt16}
          style={{
            width: "40vw",
          }}
        >
          <PrimaryButton
            children={"Send Request"}
            colorType={"green"}
            onClick={ReferTheDoctor}
          />
          {error && (
            <div className={classNames(commonStyles.error)}>*{error}</div>
          )}
        </div>
      </div>

      <div>
        <CustomModal
          showModal={emailmodal}
          children={
            <EmailModal
              setShowEnterCodeModal={setShowEnterCodeModal}
              selectedDoctorId={selectedDoctorId}
              setEmailmodal={setEmailmodal}
              selectedDoctorName={selectedDoctorName}
              selectedDoctorImage={selectedDoctorImage}
              setShowAddModal={setShowAddModal}
              setEmail={setEmail}
            />
          }
        />
      </div>
    </div>
  );
};

interface ConfirmProps {
  setShowEnterCodeModal: any;
  selectedDoctorId: any;
  setEmailmodal: any;
  selectedDoctorName: any;
  selectedDoctorImage: any;
  setShowAddModal: any;
  setEmail: any;
}

const EmailModal = (props: Partial<ConfirmProps>) => {
  const {
    selectedDoctorId,
    setEmailmodal,
    setEmail,
    setShowEnterCodeModal,
    setShowAddModal,
  } = props;
  const [loading, setLoading] = useState(false);

  const sendRequest = (selectedDoctorId: string) => {
    setLoading(true);

    hospitalSendRequesttoDOCTOR(selectedDoctorId)
      .then((res: any) => {
        setEmail(res.data?.email);
        setShowEnterCodeModal(true);
        setShowAddModal(false);
        setEmailmodal(false);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <IoClose
            className={styles.closefinal}
            onClick={() => setEmailmodal(false)}
          />
        </div>
      </div>
      <p
        className={classNames(
          commonstyle.fs16,
          commonstyle.semiBold,
          styles.mt24,
          commonstyle.colorBlue,
          styles.textcenter
        )}
      >
        Do You Want to Send Request to doctor?
      </p>
      <div
        className={classNames(commonstyle.flxBetween, styles.mt32)}
        style={{
          width: "100%",
        }}
      >
        <div style={{ width: "104px" }}>
          <PrimaryButton
            disabled={loading}
            children={"Cancel"}
            colorType={"Red"}
            onClick={() => {
              setEmailmodal(false);
            }}
          />
        </div>
        <div style={{ width: "104px" }}>
          <PrimaryButton
            disabled={loading}
            children={loading ? <RingLoader size={35} color={"#fff"} /> : "Yes"}
            colorType={"green"}
            onClick={() => {
              sendRequest(selectedDoctorId);
            }}
          />
        </div>
      </div>
    </div>
  );
};

interface EnterCodeProps {
  setShowEnterCodeModal: any;
  email: any;
  selectedDepartmentId: any;
}

const EnterCode = (props: Partial<EnterCodeProps>) => {
  const dispatch = useDispatch();
  const { setShowEnterCodeModal, email, selectedDepartmentId } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object(hospitalAddDoctorEnterCode),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    let params = {
      code: Number(formik.values.code),
      email,
    };

    hospitalConfirmCode(selectedDepartmentId, params)
      .then((res: any) => {
        setShowEnterCodeModal(false);
        dispatch(setHospitalDoctorsRenderFlag(true));
      })
      .catch((err: any) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div style={{ width: "400px" }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <IoClose
            className={styles.closefinal}
            onClick={() => setShowEnterCodeModal(false)}
          />
        </div>
        <div>
          <div>
            <p
              className={classNames(
                commonstyle.fs16,
                commonstyle.semiBold,
                styles.mt24,
                commonstyle.colorBlue,
                styles.textcenter
              )}
            >
              A verification code has been sent to doctor's email, Please
              contact doctor to get code.
            </p>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          styles.mt24,
          commonstyle.colorBlue,
          styles.textcenter
        )}
      >
        <CustomInput
          placeholder="Enter Code"
          id="code"
          name="code"
          type="text"
          onChange={(e: any) => {
            formik.setFieldValue("code", e.target.value);
            setError("");
          }}
          value={formik.values.code}
        />
      </div>

      {error && <div className={classNames(commonStyles.error)}>*{error}</div>}
      <div className={classNames(commonstyle.flxEvenly, styles.mt32)}>
        <div style={{ width: "104px" }}>
          <PrimaryButton
            disabled={loading}
            children={
              loading ? <RingLoader size={35} color={"#fff"} /> : "Submit"
            }
            colorType={"green"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

import React from "react";
import style from "./Policy.module.css";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
export default function PrivactPolicy2() {
    const { t, i18n }: any = useTranslation();
   const { isRtl } = useDirection()
  
  return (
    <div>
      <div>
       
        <div>
          <p className={classNames(style.colorBlue)}>{t("introduction")}</p>
          <p className={classNames(style.mt24, style.textcolor)}
          
           style={isRtl?{
        lineHeight:'30px',
      }:undefined}
          >
          {t("introductionDesc1")}
            <br />
            <p className={classNames(commonstyle.colorOrange)}>
            {t("introductionDesc2")}
            </p>
          </p>
        </div>
        <div className={style.mt40}>
          <p className={classNames(style.mt16)}>
            <span className={style.colorBlue}>{t("privacyOfPersonal")}</span>{" "}
            <span className={style.colorOrange}>{t("information")}</span>{" "}
          </p>

          <p className={classNames(style.mt24, style.textcolor)}
             style={isRtl?{
        lineHeight:'30px',
      }:undefined}
          >
          {t("informationDesc")}
          </p>
        </div>

        <div className={style.mt40}>
          <p className={classNames(style.mt16)}>
            <span className={style.colorBlue}>{t("collectionOfPersonal")}</span>{" "}
            <span className={style.colorOrange}>{t("information")}</span>{" "}
          </p>
          <p className={classNames(style.mt24, style.textcolor)}
             style={isRtl?{
        lineHeight:'30px',
      }:undefined}
          >
          {t("collectionOfPersonalDesc")}
          </p>
        </div>
        <div className={style.mt40}>
          <p className={classNames(style.mt16)}>
            <span className={style.colorBlue}>{t("useOfPersonal")}</span>{" "}
            <span className={style.colorOrange}>{t("information")}</span>{" "}
          </p>
          <p className={classNames(style.mt24, style.textcolor)}
             style={isRtl?{
        lineHeight:'30px',
      }:undefined}
          >
          {t("useOfPersonalDesc")}
          </p>
        </div>
        <div className={style.mt40}>
          <p className={classNames(style.mt16)}>
            <span className={style.colorBlue}>{t("disclosureOfPersonal")}</span>{" "}
            <span className={style.colorOrange}>{t("information")}</span>{" "}
          </p>
          <p className={classNames(commonstyle.fs20, commonstyle.bold)}></p>
          <p className={classNames(style.textcolor)}
             style={isRtl?{
        lineHeight:'30px',
      }:undefined}>
          {t("disclosureOfPersonalDesc")}
          </p>
        </div>
        <div className={style.mt40}>
          <p className={classNames(style.mt16)}>
            <span className={style.colorBlue}>{t("public")}</span>{" "}
            <span className={style.colorOrange}>{t("information")}</span>{" "}
          </p>

          <p className={classNames(style.mt24, style.textcolor)}
             style={isRtl?{
        lineHeight:'30px',
      }:undefined}
          >
          {t("publicDesc")}
          </p>
        </div>
        <div className={style.mt40}>
          <p className={classNames(style.mt16)}>
            <span className={style.colorBlue}>{t("accessToPersonal")}</span>{" "}
            <span className={style.colorOrange}>{t("information")}</span>{" "}
          </p>
          <p className={classNames(style.mt24, style.textcolor)}
             style={isRtl?{
        lineHeight:'30px',
      }:undefined}
          >
          {t("accessToPersonalDesc")}
          </p>
        </div>

        <div className={style.mt40}>
          <p className={classNames(style.mt16)}>
            <span className={style.colorBlue}>{t("location")}</span>{" "}
            <span className={style.colorOrange}>{t("data")}</span>{" "}
          </p>
          <p className={classNames(style.mt24, style.textcolor)}
          
             style={isRtl?{
        lineHeight:'30px',
      }:undefined}>
          {t("locationDesc")}
          </p>
        </div>

        <div className={style.mt40}>
          <p className={classNames(style.mt16)}>
            <span className={style.colorBlue}>{t("payment")}</span>{" "}
            <span className={style.colorOrange}>{t("gateway")}</span>{" "}
          </p>
          <p className={classNames(style.mt24, style.textcolor)}
             style={isRtl?{
        lineHeight:'30px',
      }:undefined}
          >
          {t("paymentGatewayDesc")}
          </p>
        </div>

        <div className={style.mt40}>
          <p className={classNames(style.mt16)}>
            <span className={style.colorBlue}>{t("storageAndSecurityOf")}</span>{" "}
            <span className={style.colorOrange}>{t("information")}</span>{" "}
          </p>

          <p className={classNames(style.mt24, style.textcolor)}
          
             style={isRtl?{
        lineHeight:'30px',
      }:undefined}
          >
          {t("storageAndSecurityOfDesc")}
          </p>
        </div>
        {/* <div className={style.mt40}>
          <p
            className={classNames(
              style.fs24,
              style.mt16,
              style.colorBlue,
              commonstyle.semiBold
            )}
          >
            <span className={style.colorBlue}>Privacy Of Personal</span>{" "}
            <span className={style.colorOrange}>Information</span>{" "}
          </p>
          <p
            className={classNames(
              style.mt24,
              style.textcolor,
              commonstyle.fs16
            )}
          >
            Personal Information means any information that may be used to
            recognize an individual. Personal information contains your personal
            name, address, email address, telephone number or Mobile Number and
            other relevant information.
          </p>
        </div> */}
        {/* <div className={style.mt40}>
          <p
            className={classNames(
              style.fs24,
              style.colorBlue,
              commonstyle.bold
            )}
          >
            Introduction
          </p>
          <p
            className={classNames(
              style.mt24,
              style.textcolor,
              commonstyle.fs16
            )}
          >
            MediTour (“us,” “we,” or “MediTour”) is always committed to having
            serious concern about the privacy rights of our customers, visitors,
            and other users at our Mobile App/ Site and related websites, mobile
            Apps and services provided by MediTour and on/in which this Privacy
            Policy is displayed or referenced (collectively, the “Services”). We
            created this Privacy Policy to provide you confidence in using our
            Services and to establish our commitment to the protection of
            privacy. This Privacy Policy applies to the Services only. Your use
            of the Services is governed by this Privacy Policy and the Agreement
            (defined in our Terms of Use). BY USING THE SERVICES, YOU AGREE TO
            THE PRACTICES AND POLICIES OUTLINED IN THIS PRIVACY POLICY AND YOU
            HEREBY CONSENT TO THE COLLECTION, USE, AND SHARING OF YOUR
            INFORMATION AS DESCRIBED IN THIS PRIVACY POLICY. IF YOU DO NOT AGREE
            WITH THIS PRIVACY POLICY, YOU CANNOT USE THE SERVICES. IF YOU USE
            THE SERVICES ON BEHALF OF SOMEONE ELSE (SUCH AS YOUR CHILD) OR AN
            ENTITY (SUCH AS YOUR EMPLOYER), YOU REPRESENT THAT YOU ARE
            AUTHORIZED BY SUCH INDIVIDUAL OR ENTITY TO ACCEPT THIS PRIVACY
            POLICY ON SUCH INDIVIDUAL’S OR ENTITY’S BEHALF.
          </p>
        </div> */}
        {/* <div className={style.mt40}>
          <p
            className={classNames(
              style.fs24,
              style.mt16,
              style.colorBlue,
              commonstyle.semiBold
            )}
          >
            <span className={style.colorBlue}>Collection Of Personal</span>{" "}
            <span className={style.colorOrange}>Information</span>{" "}
          </p>
          <p
            className={classNames(
              style.mt24,
              style.textcolor,
              commonstyle.fs16
            )}
          >
            To access updated features of the Mobile Application/ Sites, you
            must first Fill out a brief registration Application/ form. During
            registration, you are required to provide certain personal
            information (such as User’s name, address, phone number, fax number,
            e-mail address, CNIC/ Passport Number, age, insurance data, Medical
            Data, etc). After Registration, you accepted to receive
            communications from MediTour through email or Newsletters, etc.
            After getting registered, you may be asked whether you want to
            receive these types of communication or not from us. You may search
            out the portions of Mobile Applications and websites without
            providing any information where necessary MediTour may ask for
            necessary information.
          </p>
        </div> */}
        {/* <div className={style.mt40}>
          <p
            className={classNames(
              style.fs24,
              style.mt16,
              style.colorBlue,
              commonstyle.semiBold
            )}
          >
            <span className={style.colorBlue}>Use Of Personal</span>{" "}
            <span className={style.colorOrange}>Information</span>{" "}
          </p>
          <p
            className={classNames(
              style.mt24,
              style.textcolor,
              commonstyle.fs16
            )}
          >
            Personal information collected through our Mobile Application/ Sites
            is used to process and manage registrations, operate and improve our
            Sites track the Sites’ usage policies and statistics, making the
            Mobile App/ Sites or services are easier to manage by modifying the
            need for you to repeatedly enter the same information, and for some
            other purposes as per your consent. We also use your personal
            information to communicate with you in other ways. For instance,
            when you register on this site, MediTour may use personal
            information to send Acknowledgment email your registration. We also
            use personal information to communicate important changes to our
            Privacy Policy, update you about multiple resources or Healthcare
            Personnel’s, communicate about MediTour products and Services and
            using statistical data that we collect from multiple sources
            permitted by law.
          </p>
        </div> */}
        {/* <div className={style.mt40}>
          <p
            className={classNames(
              style.fs24,
              style.mt16,
              style.colorBlue,
              commonstyle.semiBold
            )}
          >
            <span className={style.colorBlue}>Disclosure Of Personal</span>{" "}
            <span className={style.colorOrange}>Information</span>{" "}
          </p>
          <p
            className={classNames(
              style.mt24,
              style.textcolor,
              commonstyle.fs16
            )}
          >
            We may provide personal information to other vendors engaged in
            Contracts who provide services on our behalf, such as Registering
            your account, data processing and delivery of communications,
            hosting the websites, and content writing and services provided by
            the Mobile App/ Sites. We may access your personal information for
            some necessary reasons, including if we believe that such thing is
            under compulsion of law or legal Regulations.
          </p>
        </div> */}
        {/* <div className={style.mt40}>
          <p
            className={classNames(
              style.fs24,
              style.mt16,
              style.colorBlue,
              commonstyle.semiBold
            )}
          >
            <span className={style.colorBlue}>Public</span>{" "}
            <span className={style.colorOrange}>Information</span>{" "}
          </p>
          <p
            className={classNames(
              style.mt24,
              style.textcolor,
              commonstyle.fs16
            )}
          >
            Any information that you may disclose in posting a review on Mobile
            App or Website on online discussion, Blog, or forum is deliberately
            open to the public and is not in any way private. We recommend that
            you before giving any comments, reviews, or feedback carefully
            consider whether to post such Information in any public posting or
            not.
          </p>
        </div> */}
        {/* <div className={style.mt40}>
          <p
            className={classNames(
              style.fs24,
              style.mt16,
              style.colorBlue,
              commonstyle.semiBold
            )}
          >
            <span className={style.colorBlue}>Access To Personal</span>{" "}
            <span className={style.colorOrange}>Information</span>{" "}
          </p>
          <p
            className={classNames(
              style.mt24,
              style.textcolor,
              commonstyle.fs16
            )}
          >
            To update or change the personal information you have provided
            MediTour, or to unsubscribe from MediTour, email
            ContactUs@MediTour.pk.
          </p>
        </div> */}
        {/* <div className={style.mt40}>
          <p
            className={classNames(
              style.fs24,
              style.mt16,
              style.colorBlue,
              commonstyle.semiBold
            )}
          >
            <span className={style.colorBlue}>Storage And Security Of</span>{" "}
            <span className={style.colorOrange}>Information</span>{" "}
          </p>

          <p
            className={classNames(
              style.mt24,
              style.textcolor,
              commonstyle.fs16
            )}
          >
            MediTour warrants and represents that its access, collection,
            storage, and disposal of Personal Information does and shall comply
            with applicable federal and state statutes and regulations. The data
            security of your Personal Information is very crucial to us. Without
            limiting Medtour’s obligations according to this Agreement, we shall
            implement administrative, physical, and technical safeguards for the
            protection of Personal Information that are no less rigorous than
            acceptable industry practices and shall ensure that all such
            safeguards comply with applicable data protection and privacy laws,
            statutes and regulations.
          </p>
        </div> */}
        <div className={style.mt40}>
          <p className={classNames(style.mt16)}>
            <span className={style.colorBlue}>{t("updatesAndChangesTo")}</span>{" "}
            <span className={style.colorOrange}>{t("privacyPolicy")}</span>{" "}
          </p>

          <p className={classNames(style.mt24, style.textcolor)}
          
             style={isRtl?{
        lineHeight:'30px',
      }:undefined}
          >
          {t("updatesAndChangesToDesc")}
          </p>
        </div>
        <div className={style.mt40}>
          <p className={classNames(style.colorBlue)}>{t("copyrights")}</p>
          <p className={classNames(style.mt24, style.textcolor)}>
          {t("copyrightsDesc")}
          </p>
        </div>
        <div className={style.mt40}>
          <p className={classNames(style.mt16)}>
            <span className={style.colorBlue}>{t("globalPvt")}</span>{" "}
            <span className={style.colorOrange}>{t("limited")}</span>{" "}
          </p>
          <p className={classNames(style.mt24, style.textcolor)}
             style={isRtl?{
        lineHeight:'30px',
      }:undefined}>
          {t("limitedDesc")}
          </p>
        </div>
        <div className={style.mt40}>
          <p className={classNames(style.colorBlue)}>{t("contacts")}</p>
          <p className={classNames(style.mt24, style.textcolor)}
             style={isRtl?{
        lineHeight:'30px',
      }:undefined}
          >
          {t("contactsDesc")}{" "}
            {/* <span className={style.colorOrange}>info@meditour.global</span>{" "} */}
            <span className={style.colorOrange}>
              themeditourglobal@gmail.com
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

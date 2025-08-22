import React from "react";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import style from "./Policy.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
export default function RefundPolicy() {
  return (
    <div>
      <div className={classNames(style.main, style.refund)}>
        <ul>
          <li>
            The cancellation of request should be informed by the patient at
            least 3 hours before the appointment. Your payment will be refunded
            and initiate for Refund on request, otherwise, your payment will
            expire. In case you request found after the Appointment time then
            your request will not be entertained.{" "}
          </li>
          <li>
            The Refund amount may be transferred through IBFT or by reversing
            the processed transaction. Cash Refund will not be entertained.
          </li>
          <li>
            Refund will be processed after 48 hours of verification of payment
            received from Customer. Refund will be entertained after completing
            said formalities.
          </li>
          <li>
            We will not take any responsibility for any delays in credit to the
            Cardholder's credit card account/ accountholder’s bank account due
            to any reasons cited by the Cardholder's issuing bank or Payment
            Gateways.
          </li>
          <li>
            In case of bills/services already received by the customer no
            Refunds or cancellation request will be entertained.
          </li>
          <li>
            In case of bills/services already received by the customer no
            Refunds or cancellation request will be entertained.
          </li>
        </ul>
        <div className={style.mt40}>
          <p className={classNames(commonstyle.fs20, commonstyle.bold)}>
            Conditions under which Refund or Cancellation will not be
            entertained
          </p>
          <div className={style.refund}>
            <ul>
              <li>Patient unsatisfactory behavior after Consultation. </li>
              <li>Patient was not present at the time of the appointment. </li>
              <li>Patient rude behavior during Doctor Call/ appointment. </li>
              <li>
                Patient credentials for Return Payment is not delivered after
                passing 48 Hour
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footerr />
    </div>
  );
}

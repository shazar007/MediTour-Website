import React from 'react';
import styles from './TravelerInformation.module.css';  // Import the CSS module
import LabDownload from 'assets/images/download.png';

const TravelerInformation = ({ onPressVise, index, onPressPass, traveler }: { onPressVise?: any, index?: any, onPressPass?: any, traveler?: any }) => {
    return (
        <div key={traveler._id} className={styles.travelerCard}>
            <span className={styles.travelerText}>
                Traveler {index + 1}
            </span>
            <div className={styles.row}>
                <span className={styles.label}>Name</span>
                <span className={styles.value}>{traveler.name}</span>
            </div>
            <div className={styles.row}>
                <span className={styles.label}>Passport No</span>
                <span className={styles.value}>{traveler.passportNo}</span>
            </div>

            <div className={styles.fileSection}>
                <span className={styles.label}>Passport File</span>
                <button className={styles.button} onClick={onPressPass}>
                    <span className={styles.buttonText}>Passport File</span>
                    <img src={LabDownload} alt="Download" className={styles.downloadImage} />
                </button>
            </div>
            <div className={styles.fileSection}>
                <span className={styles.label}>Visa File</span>
                <button className={styles.button} onClick={onPressVise}>
                    <span className={styles.buttonText}>Visa File</span>
                    <img src={LabDownload} alt="Download" className={styles.downloadImage} />
                </button>
            </div>
        </div>
    );
};

export default TravelerInformation;

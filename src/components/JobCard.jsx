import React from 'react'
import styles from '../styles/jobCard.module.css'
const JobCard = ({props}) => {
  return (
    <div className={styles.card}>
        <h2 className={styles.job_name}>Job name</h2>
        <p className={styles.company_name}>Company name</p>
        <div className={styles.job_details}>
            <p>Job location</p>
            <p>salary</p>
            <p>Job type</p>
        </div>
        <button>Apply now</button>
    </div>
  )
}

export default JobCard

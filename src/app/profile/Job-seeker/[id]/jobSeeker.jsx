"use client";
import React, { useState } from "react";
import styles from "../../../../styles/jobSeekerProfile.module.css";
import { BriefcaseBusiness, Github, Linkedin } from "lucide-react";
import Tab from "@/components/Tab";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import AddButton from "@/components/AddButton";
import Skill from "@/components/Skill";
import Education from "@/components/Education";

const JobSeeker = ({params}) => {
  const user = useSelector((state) => state.auth.user);

  // State to hold user details
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");
  const [tabIndex, settabIndex] = useState(1);

  const [skills, setSkills] = useState([]);
 const [education, setEducation] = useState({
    degree: {
      degreeName: "B.Tech in Computer Science",
      university: "ABC University",
      course: "Engineering",
      cgpa: "8.5",
      from: "2018",
      to: "2022"
    },
    twelfth: {
      degreeName: "Senior Secondary",
      university: "XYZ School",
      course: "Science",
      cgpa: "9.0",
      from: "2016",
      to: "2018"
    },
    tenth: {
      degreeName: "High School",
      university: "XYZ School",
      course: "General Studies",
      cgpa: "9.2",
      from: "2014",
      to: "2016"
    }
  });

  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);

  const [edit, setEdit] = useState(true);

  const handleTabChange = (index) => settabIndex(index);

  const handleSave = () => {};
  const saveSkill = () => {};
  const saveEducation = () => {};

  return (
    
      <div className={styles.container}>
        <div className={styles.header}></div>

        <div className={styles.body}>
          <div className={styles.profile}>
            <div className={styles.profile_name}>
              <>
                <input
                  disabled={edit}
                  className={styles.data_input}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
                <input
                  disabled={edit}
                  className={styles.data_input}
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Enter experience"
                />
              </>
            </div>
            <button className={styles.resume}>Resume</button>
          </div>

          {/* social info */}
          <div className={styles.social}>
            <div>
              <ul className={styles.social_contact}>
                <li>
                  <input
                    className={styles.data_input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    disabled={true}
                  />
                </li>
                <li>
                  <input
                    disabled={edit}
                    className={styles.data_input}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone"
                  />
                </li>
                <li>
                  <input
                    disabled={edit}
                    className={styles.data_input}
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                  />
                </li>
                <li>
                  <input
                    disabled={edit}
                    className={styles.data_input}
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Enter DOB"
                  />
                </li>
              </ul>

              <ul className={styles.social_links}>
                <li>
                  <Github />
                </li>
                <li>
                  <Linkedin />
                </li>
                <li>
                  <BriefcaseBusiness />
                </li>
              </ul>
            </div>
          </div>

          {/* bio */}
          <p>
            {user?.bio
              ? user.bio
              : " As a skilled full-stack developer, I am turning ideas into innovative web applications. Explore my latest projects, showcasing my expertise in React.js, Next.js, and web development."}
          </p>

          {/* edit button */}
          <div className={styles.edit_btns}>
            <button onClick={() => setEdit((prv) => !prv)}>Edit</button>
            {edit == false && <button onClick={handleSave}>Save</button>}
          </div>

          {/* tab */}
          <div className={styles.tab}>
            <Tab currentTab={tabIndex} onchange={handleTabChange}>
              <Tab.headContainer>
                <Tab.headerItem label={"Skills"} index={1} />
                <Tab.headerItem label={"Education"} index={2} />
                <Tab.headerItem label={"Experience"} index={3} />
                <Tab.headerItem label={"Projects"} index={4} />
              </Tab.headContainer>

              <Tab.contentContainer>
                <Tab.containerItem index={1}>
                  <Skill
                    skills={skills}
                    setSkills={setSkills}
                    saveSkill={saveSkill}
                  />
                </Tab.containerItem>
                <Tab.containerItem index={2}>
                  <Education
                    education={education}
                    setEducation={setEducation}
                    saveEducation={saveEducation}
                  />
                </Tab.containerItem>
                <Tab.containerItem index={3}>experience</Tab.containerItem>
                <Tab.containerItem index={4}>projects</Tab.containerItem>
              </Tab.contentContainer>
            </Tab>
          </div>
        </div>
      </div>
   
  );
};

export default JobSeeker;

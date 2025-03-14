import React, { useState, useEffect } from "react";
import styles from "../styles/Education.module.css";
import AddButton from "./AddButton";
import Tab from "./Tab";
import { motion } from "framer-motion";

const EducationForm = ({ type, newEducation, handleChange, saveEducation }) => (
  <motion.div
    className={styles.education_form}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {["degreeName", "university", "course", "cgpa", "from", "to"].map((field, index) => (
      <motion.input
        key={field}
        type={field === "cgpa" || field === "from" || field === "to" ? "number" : "text"}
        name={field}
        value={newEducation[field]}
        placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
        onChange={handleChange}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
      />
    ))}
    <AddButton text={`Save ${type}`} handleClick={saveEducation} />
  </motion.div>
);

const Education = ({ education, setEducation }) => {
  const [educationDetails, setEducationDetails] = useState(
    education || { degree: null, twelfth: null, tenth: null }
  );

  const [newEducation, setNewEducation] = useState({
    degreeName: "",
    university: "",
    cgpa: "",
    course: "",
    from: "",
    to: "",
  });

  const [currentTab, setCurrentTab] = useState(0);
  const [editType, setEditType] = useState(null); // Track which section is being edited

  useEffect(() => {
    setEducation(educationDetails);
  }, [educationDetails, setEducation]);

  const handleChange = (e) => {
    setNewEducation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addOrUpdateEducation = () => {
    if (Object.values(newEducation).some((val) => val.trim() === "")) {
      alert("Please fill all the fields before saving.");
      return;
    }

    setEducationDetails((prev) => ({
      ...prev,
      [editType]: { ...newEducation },
    }));

    setEditType(null); // Exit edit mode
  };

  const editEducation = (type) => {
    setNewEducation(educationDetails[type] || {
      degreeName: "",
      university: "",
      cgpa: "",
      course: "",
      from: "",
      to: "",
    });
    setEditType(type); // Set edit mode for only one section
  };

  return (
    <div className={styles.container}>
      <Tab currentTab={currentTab} onchange={setCurrentTab}>
        <Tab.headContainer>
          <Tab.headerItem label="Degree" index={0} />
          <Tab.headerItem label="12th" index={1} />
          <Tab.headerItem label="10th" index={2} />
        </Tab.headContainer>

        <Tab.contentContainer>
          {Object.entries({
            degree: "Degree",
            twelfth: "12th",
            tenth: "10th",
          }).map(([key, label], index) => (
            <Tab.containerItem key={key} index={index}>
              {editType === key ? (
                <EducationForm
                  type={label}
                  newEducation={newEducation}
                  handleChange={handleChange}
                  saveEducation={addOrUpdateEducation}
                />
              ) : educationDetails[key] ? (
                <motion.div
                  className={styles.education_display}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
                  }}
                >
                  {Object.entries(educationDetails[key]).map(([dataKey, value], index) => (
                    <motion.div
                      key={dataKey}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className={styles.education_data}
                    >
                      <p>{dataKey.charAt(0).toUpperCase() + dataKey.slice(1)}</p>
                      <p>{value}</p>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Object.entries(educationDetails[key]).length * 0.2 }}
                  >
                    <AddButton text={"Edit"} handleClick={() => editEducation(key)} />
                  </motion.div>
                </motion.div>
              ) : (
                <EducationForm
                  type={label}
                  newEducation={newEducation}
                  handleChange={handleChange}
                  saveEducation={addOrUpdateEducation}
                />
              )}
            </Tab.containerItem>
          ))}
        </Tab.contentContainer>
      </Tab>
    </div>
  );
};

export default Education;

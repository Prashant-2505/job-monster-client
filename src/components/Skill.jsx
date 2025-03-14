import React, { useState } from "react";
import styles from "../styles/SkillStyles.module.css";
import RemoveBtn from "./RemoveBtn";
import AddButton from "./AddButton";

const Skill = ({ skills, setSkills, saveSkill }) => {
  const [newSkill, setNewSkill] = useState("");

  // Add a new skill
  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSkill("");
    }
  };

  // Remove a skill
  const removeSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.skill_container}>
      {/* Input Section */}
      <div className={styles.input_section}>
        <input
          className="data_input"
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter a skill"
        />
        <div className={styles.btn_group}>
          <AddButton text="Add Skill" handleClick={addSkill} />
          <AddButton text="Save Skill" handleClick={saveSkill} />
        </div>
      </div>

      {/* Skills List */}
      {skills?.length > 0 && (
        <div className={styles.skills_list}>
          {skills.map((skill, index) => (
            <div className={styles.skill_item} key={index}>
              <p>{skill}</p>
              <RemoveBtn handleClick={() => removeSkill(index)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skill;

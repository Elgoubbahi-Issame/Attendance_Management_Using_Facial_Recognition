import React, { useState, useEffect } from "react";
import "./table.css";
import axios from "axios";
const DashSix = () => {
  // 

  const [educations, setEducations] = useState([]);
  useEffect(() => {
    const getClass = async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/education/list`);
      const data = await res.json();
      setEducations(data.classroom)
      // axios.get('http://127.0.0.1:8000/api/education/list')
      //   .then(res => {
      //     setEducations(res.data.classroom)
      //   })
    }
    getClass();
  }, []);
  // console.log(educations)
  return (
    <div className="user_table">
      <table>
        <caption>Manipulation des classes</caption>
        <thead>
          <tr>
            <th scope="col">Teacher</th>
            <th scope="col">Module</th>
            <th scope="col">clasroom</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
          {educations.map((education) => {
            return (
              <tr>
                <td data-label="full name">{education.first_name}  {education.last_name}</td>
                <td data-label="email" className="email">
                  {education.ModuleName}
                </td>
                <td data-label="phone">{education.ClassName}</td>
                {/* <td data-label="metrre admin">
                  <a
                    className="btn1"
                    href="/"
                    data-teacher={education.teacher_id}
                    data-classroom={education.classroom_id}
                    data-module={education.module_id}
                    onClick={(e) => {
                      e.preventDefault();

                      const module_id = e.target.dataset.module;
                      const classroom_id = e.target.dataset.classroom;
                      const teacher_id = e.target.dataset.teacher;
                    }}
                  >
                    Admin
                  </a>
                </td> */}
                <td data-label="delete">
                  <a
                    className="btn1"
                    href="/"
                    data-teacher={education.teacher_id}
                    data-classroom={education.classroom_id}
                    data-module={education.module_id}
                    data-id={education.id}
                    onClick={(e) => {
                      e.preventDefault();

                      const classid = e.target.dataset.id
                      const URL = 'http://127.0.0.1:8000/api/education/delete/' + classid
                      axios.post(URL)
                        .then(res => {
                          console.log('delete succusfully')
                          window.location.reload()
                        })
                        .catch(err => console.log('somethng bad happen'))
                    }}
                  >
                    Supprimer
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashSix;

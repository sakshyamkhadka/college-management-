import { db } from "../config/db.js";

export const getCourses = (req,res)=>{
  db.query("SELECT * FROM Courses", (err, results)=>{
    if(err) return res.status(500).json({error: err.message});
    res.json(results);
  });
};

export const createCourse = (req,res)=>{
  const { name, description } = req.body;
  db.query("INSERT INTO Courses (name, description) VALUES (?,?)", [name, description], (err,result)=>{
    if(err) return res.status(500).json({error: err.message});
    res.json({message:"Course created", id: result.insertId});
  });
};

export const updateCourse = (req,res)=>{
  const id = req.params.id;
  const { name, description } = req.body;
  db.query("UPDATE Courses SET name=?, description=? WHERE course_id=?", [name, description, id], (err)=>{
    if(err) return res.status(500).json({error: err.message});
    res.json({message:"Course updated"});
  });
};


export const deleteCourse = (req,res)=>{
  const id = req.params.id;
  db.query("DELETE FROM Courses WHERE course_id=?", [id], (err)=>{
    if(err) return res.status(500).json({error: err.message});
    res.json({message:"Course deleted"});
  });
};

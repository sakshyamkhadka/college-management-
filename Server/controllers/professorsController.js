import { db } from "../config/db.js";

export const getProfessors = (req,res)=>{
  db.query("SELECT * FROM Professors", (err, results)=>{
    if(err) return res.status(500).json({error: err.message});
    res.json(results);
  });
};

export const createProfessor = (req,res)=>{
  const { name, email, phone, department } = req.body;
  db.query(
    "INSERT INTO Professors (name,email,phone,department) VALUES (?,?,?,?)",
    [name,email,phone,department],
    (err,result)=>{
      if(err) return res.status(500).json({error: err.message});
      res.json({message:"Professor created", id: result.insertId});
    }
  );
};

export const updateProfessor = (req,res)=>{
  const id = req.params.id;
  const { name, email, phone, department } = req.body;
  db.query(
    "UPDATE Professors SET name=?, email=?, phone=?, department=? WHERE professor_id=?",
    [name,email,phone,department,id],
    (err)=>{
      if(err) return res.status(500).json({error: err.message});
      res.json({message:"Professor updated"});
    }
  );
};

export const deleteProfessor = (req,res)=>{
  const id = req.params.id;
  db.query("DELETE FROM Professors WHERE professor_id=?", [id], (err)=>{
    if(err) return res.status(500).json({error: err.message});
    res.json({message:"Professor deleted"});
  });
};

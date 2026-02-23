import { db } from "../config/db.js";

export const getAll = (req,res)=>{
  db.query("SELECT * FROM <table_name>", (err, results)=>{ if(err) return res.status(500).json({error:err.message}); res.json(results); });
};

export const create = (req,res)=>{
  const values = Object.values(req.body);
  db.query("INSERT INTO <table_name> (<columns>) VALUES (?)", [values], (err,result)=>{ if(err) return res.status(500).json({error:err.message}); res.json({message:"Created", id: result.insertId}); });
};

export const update = (req,res)=>{
  const id = req.params.id;
  const values = Object.values(req.body);
  db.query("UPDATE <table_name> SET <col1>=?,<col2>=?,... WHERE id=?", [...values, id], (err)=>{ if(err) return res.status(500).json({error:err.message}); res.json({message:"Updated"}); });
};

export const remove = (req,res)=>{
  const id = req.params.id;
  db.query("DELETE FROM <table_name> WHERE id=?", [id], (err)=>{ if(err) return res.status(500).json({error:err.message}); res.json({message:"Deleted"}); });
};

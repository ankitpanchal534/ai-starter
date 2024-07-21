 const handler=(req,res) =>{

console.log(req);
return res.status(200).json({text:'i am working!',data:req.body})
}


 export default handler;
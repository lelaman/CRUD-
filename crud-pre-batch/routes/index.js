var express = require('express');
var router = express.Router();
const dbConnection = require("../lib/db");

/* GET home page. */
router.get('/', function(req, res, next) {
  dbConnection.query("SELECT * FROM post ORDER BY nama ASC ", ( error, data)=> {
 if(error) {
   console.log(error);
 }else {
   console.log(data);
  res.render('post/index', { title: 'Express' ,data:data});
 }
  }) 
});

router.get("/add", (req,res ) => {
  res.render("post/add",{
    nama:"",
    photo: "",
    content:"",
    penerbit:"",
    penulis:"",
    codeId:"",
  });
});
router.post("/store", (req,res ) => {
  const { nama,photo,content,penerbit,penulis,codeId } = req.body;
  let error = false;
  if(!nama.length ||
     !photo.length ||
     !content.length ||
     !penerbit.length||
     !penulis.length||
     !codeId.length) {
       error = true

       req.flash("error","Lengkapi Data Anda");
       res.render("post/add",{ nama,photo,content,penerbit,penulis,codeId});
     };

  if (!error) {
    const formdata= { 
    nama,
    photo,
    content,
    penerbit,
    penulis,
    code_id:codeId,

   };
   dbConnection.query("INSERT INTO post SET?",formdata,(error) => {
    if(error) {
      req.flash("error",error);
    }else {
      req.flash("success", "berhasil Ditambahkan");
     res.redirect("/");
    }
   });
  }
});
 router.get("/delete/(:id)",(req,res) => {
   const id =req.params.id;

   dbConnection.query("DELETE FROM post WHERE  id=" + id,(error) =>{
    if(error) {
      req.flash("error",error);
    }else {
      req.flash("success", "berhasil hapus data");
     res.redirect("/");
    }
   });
 });

 router.get("/edit/(:id)",(req,res) => {
  const id =req.params.id;

   dbConnection.query(" SELECT * FROM post  WHERE id=" +id,(error,data)=>{
    if(error) {
      req.flash("error",error);
    }else {
      res.render("post/edit",{
    id : data[0].id,
    nama:data[0].nama,
    photo: data[0].photo,
    content:data[0].content,
    penerbit:data[0].penerbit,
    penulis:data[0].penulis,
    codeId:parseInt(data[0].codeId),

      })
    }
   })

 });
  router.post("/post/update",(req,res) =>{
    const { nama,photo,content,penerbit,penulis,codeId ,id} = req.body;
    let error = false;
    if(!nama.length ||
       !photo.length ||
       !content.length ||
       !penerbit.length||
       !penulis.length||
       !codeId.length) {
         error = true
  
         req.flash("error","Lengkapi Data Anda");
         res.render("post/edit",{ nama,photo,content,penerbit,penulis,codeId});
       };
  
    if (!error) {
      const formdata= { 
      nama,
      photo,
      content,
      penerbit,
      penulis,
      code_id:codeId,
  
     };
     dbConnection.query("UPDATE post SET? WHERE id="  + id,formdata,(error) => {
      if(error) {
        req.flash("error",error);
      }else {
        req.flash("success", "berhasil edit post");
       res.redirect("/");
      }
     });
    }
  });




module.exports = router;

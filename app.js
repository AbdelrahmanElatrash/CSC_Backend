const express=require('express');
const app=express();
const morgan=require('morgan');
const parser=require('body-parser');


const cors = require('cors');
app.use(cors());
app.use(morgan('dev'));
app.use(parser.urlencoded({extended:false}));
app.use(parser.json());




// const errorHandler = (err, req, res,next)=> {
//     // Error handling middleware functionality
//     console.error(err.stack)
//     res.status(err.status || 500);
//     res.json({err:{"status":500,
//                'message':"internal server error"}
      
//   })
//   }
  
  
// const invalidPathHandler = (req, res) => {
//     res.status(404)
//     res.json({error:{status:404,
//                   'message':'not found'}
//                    })
    
//   }




const registr=require('./router/registration');



app.use('/',registr);

// app.use(errorHandler);
// app.use(invalidPathHandler);

module.exports=app ;
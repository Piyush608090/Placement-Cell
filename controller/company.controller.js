import {Student} from "../schema/student.schema.js"
import {Company} from "../schema/company.schema.js"
export const company = async(req,res) =>{
    try {
        const students = await Student.find({});
        return res.render('company', { students ,name:req.session.name});
      } catch (error) {
        console.log(error);
        return res.redirect('back');
      }
}
export const addInterview = async (req,res)=>{
    try {
        const students = await Student.find({});
    
        let array = [];
    
        for (let student of students) {
          array.push(student.batch);
        }
        // filter out duplicate batches
        array = [...new Set(array)];
    
        return res.render('interview', { students,name:req.session.name ,array,errorMessage:null });
      } catch (err) {
        console.log(err);
        return res.redirect('back');
      }
    };

export const scheduleIntreview = async (req,res) =>{
    const { id, company, date } = req.body;
    const students = await Student.find({});
    try {    
        let array = [];
    
        for (let student of students) {
          array.push(student.batch);
        }
        // filter out duplicate batches
        array = [...new Set(array)];
          
    const existingCompany = await Company.findOne({ name: company });
      const obj = {
        student: id,
        date,
        result: 'Pending',
      };
      // if company doesnt exist |||
      if (!existingCompany) {
        const newCompany = await Company.create({
          name: company,
        });
        newCompany.students.push(obj);
        newCompany.save();
      } else {
        for (let student of existingCompany.students) {
          // if student id already exists
          if (student.student._id === id) {
            return res.render('interview', { students, array,name:req.session.name ,errorMessage:"Interview with this student already scheduled"});
          }
        }
        existingCompany.students.push(obj);
        existingCompany.save();
      }
  
      const student = await Student.findById(id);
  
      if (student) {
        const interview = {
          company,
          date,
          result: 'Pending',
        };
        student.interviews.push(interview);
        student.save();
      }
      return res.render('interview', { students, array,name:req.session.name ,errorMessage:"Interview Scheduled Successfully"});
    } catch (error) {
      console.log(error);
      return res.redirect('back');
    }
}
export const updateStatus = async function (req, res) {
  const { id } = req.params;
  const { companyName, companyResult } = req.body;
  try {
    const student = await Student.findById(id);
    if (student && student.interviews.length > 0) {
      for (let company of student.interviews) {
        if (company.company === companyName) {
          company.result = companyResult;
          student.save();
          break;
        }
      }
    }
    const company = await Company.findOne({ name: companyName });

    if (company) {
      for (let std of company.students) {
        /// compare student id and id passed in params
        if (std.student.toString() === id) {
          std.result = companyResult;
          company.save();
        }
      }
    }
    console.log('Interview Status Changed Successfully');
    return res.redirect('back');
  } catch (error) {
    console.log(`Error in updating status: ${error}`);
    res.redirect('back');
  }
  };
  
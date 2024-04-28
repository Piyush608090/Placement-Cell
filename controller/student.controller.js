import {Student} from "../schema/student.schema.js"
import {Company} from "../schema/company.schema.js"
import fs from 'fs'
import fastcsv from 'fast-csv'
// Render Student Login Page
export const addStudent = async (req,res) =>{
res.render("addstudent",{errorMessage:null,name:req.session.name})
}
// Add Students
export const createStudent = async (req,res)=>{
    const { name, email, batch, college, placement, contactNumber, dsa, webd, react } = req.body;
    try {
		const student = await Student.findOne({ email });

		if (student) {
			return res.render("addstudent",{errorMessage:"Email already exists",name:req.session.name});
		}
		if(name.trim()=="" && email.trim()=="" && batch.trim()=="" && college.trim()=="" && contactNumber.trim()=="" && dsa.trim()=="" && webd.trim()=="" && react.trim()==""){
			return res.render("addstudent",{name:req.session.name,errorMessage:"Mandatory Fields Are Required"});
		}
		const newStudent = await Student.create({
			name,
			email,
			college,
			batch,
			placement,
			contactNumber,
			dsa,
			webd,
			react,
		});
		await newStudent.save();

		return res.render("addstudent",{name:req.session.name,errorMessage:"Student Added Succesfully"});
	} catch (error) {
		console.log(error);
	}
}
// Delete Students  
export const deleteStudent = async (req,res)=>{
    const { id } = req.params;
	try {
		// find the student using id in params
		const student = await Student.findById(id);

		// find the companies for which interview is scheduled
		// and delete student from company interviews list
		if (student && student.interviews.length > 0) {
			for (let item of student.interviews) {
				const company = await Company.findOne({ name: item.company });
				if (company) {
					for (let i = 0; i < company.students.length; i++) {
						if (company.students[i].student.toString() === id) {
							company.students.splice(i, 1);
							company.save();
							break;
						}
					}
				}
			}
		}
		await Student.findByIdAndDelete(id);
		res.redirect('back');
	} catch (error) {
		console.log('Error in deleting student');
		return res.redirect('back');
	}
}
export const downloadCsv = async function (req, res) {
	try {
		const students = await Student.find({});

		let data = '';
		let no = 1;
		let csv = 'S.No, Name, Email, College, Placemnt, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result';

		for (let student of students) {
			data =
				no +
				',' +
				student.name +
				',' +
				student.email +
				',' +
				student.college +
				',' +
				student.placement +
				',' +
				student.contactNumber +
				',' +
				student.batch +
				',' +
				student.dsa +
				',' +
				student.webd +
				',' +
				student.react;

			if (student.interviews.length > 0) {
				for (let interview of student.interviews) {
					data += ',' + interview.company + ',' + interview.date.toString() + ',' + interview.result;
				}
			}
			no++;
			csv += '\n' + data;
		}

		const dataFile = fs.writeFile('report/data.csv', csv, function (error, data) {
			if (error) {
				console.log(error);
				return res.redirect('back');
			}
			console.log('Report generated successfully');
			return res.download('report/data.csv');
		});
	} catch (error) {
		console.log(`Error in downloading file: ${error}`);
		return res.redirect('back');
	}
};

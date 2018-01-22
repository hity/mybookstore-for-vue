import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    username: { type: String, index: true},
    date: {type: Date, default: Date.now}
});

const Student = mongoose.model('student', studentSchema);

const classes = {}

classes.add = async (data) => {
    const newClass = new Student(data);
    return await newClass.save((err, res)=> {
        if (err) {
            console.log('Error:' + err)
        } else {
            console.log('Res:' + res)
        }
    });
};

classes.update = async (wherestr, updatestr) => {
    return await Student.update(wherestr, updatestr, (err, res) => {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

classes.updateById = async (id, updatestr) => {
    return await Student.findByIdAndUpdate(id, updatestr, (err, res) => {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

classes.del = async (wherestr) => {
    return await Student.remove(wherestr, (err, res) => {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

classes.delById = async (id) => {
    return await Student.findByIdAndRemove(id, (err, res) => {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

// var opt = {"username": 1 ,"_id": 0};
// 查询返回username
classes.find = async (wherestr, opt) => {
    return await Student.find(wherestr, opt, (err, res) => {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

classes.count = async (wherestr) => {
    return await Student.count(wherestr, (err, res) => {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

export default classes
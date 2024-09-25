const departmentRoute = require("./department.route.js");
const courseRoute = require("./course.route.js");
const lecturerRoute = require("./lecturer.route.js");
const authRoute = require("./auth.route.js");

function route(app){
    app.use("/departments", departmentRoute);
    app.use("/courses", courseRoute);
    app.use("/lecturers", lecturerRoute);
    app.use("/auth", authRoute);
}

module.exports = route
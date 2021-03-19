// Creat Course class 
class Course{
    constructor(title , instructor , price , description){
        this.title=title;
        this.instructor=instructor;
        this.price=price;
        this.description=description;
    }
};
//Create CourseUI
class CourseUI{
    static showCourse(){
        const storedCourses=[
            {
                title : `Html5 course`,
                instructor : `john`,
                price : 500 ,
                description : `lorem lorem lorem lorem lorem lorem`
            },
            {
                title : `CSS3`,
                instructor : `Jack`,
                price : 800 ,
                description : `lorem lorem lorem lorem lorem lorem`
            },
            {
                title : `js`,
                instructor : `Mark`,
                price : 1000 ,
                description : `lorem lorem lorem lorem lorem lorem`
            }
        ];
        for(let course of storedCourses){
            CourseUI.addCourseToViwe(course);
        };
    };
    //Clear Fields after submit
    static clearFields(){
        document.getElementById(`title`).value = ``;
        document.getElementById(`instructor`).value = ``;
        document.getElementById(`price`).value = ``;
        document.getElementById(`description`).value = ``;
    }
    // create alert msgs 
    static alertMassge(msg , clsName){
        const div = document.createElement(`div`);
        div.className = `alert alert-${clsName}`;
        div.innerText = `${msg}`;
        const form = document.getElementById(`courses-form`);
        const formSection = document.querySelector(`.form-section`);
        formSection.insertBefore(div , form);
        setTimeout(() => {
            div.remove();
        }, 5000);
    };
    //add course to viwe in page table
    static addCourseToViwe(course){
        const list = document.getElementById(`course-list`);
        const row = document.createElement(`tr`);
        row.innerHTML = `
        <td id="title-table">${course.title}</td>
        <td id="instructor-table">${course.instructor}</td>
        <td id="price-table">${course.price}</td>
        <td id="description-table">${course.description}</td>
        <td>
        <a href="#" class = "btn btn-danger btn-sm delete-course">X</a>
        </td>
        <td>
        <a href="#" class = "btn btn-secondary btn-sm update-course">U</a>
        </td>
        `;
        list.appendChild(row);
    };
    //Update course method
    static updateCourse(course){
        if(course.classList.contains(`update-course`)){
           document.getElementById(`title`).value = course.parentElement.parentElement.querySelector(`#title-table`).innerText;
           document.getElementById(`instructor`).value = course.parentElement.parentElement.querySelector(`#instructor-table`).innerText;
           document.getElementById(`price`).value = course.parentElement.parentElement.querySelector(`#price-table`).innerText;
           document.getElementById(`description`).value = course.parentElement.parentElement.querySelector(`#description-table`).innerText;
           course.parentElement.parentElement.remove();
           CourseUI.alertMassge(`Please Edit ur Inputs & Add it`,`secondary`)
        }
    }
    // Delete Course Method
    static deleteCourse(course){
        if(course.classList.contains(`delete-course`)){
            course.parentElement.parentElement.remove();
            CourseUI.alertMassge(`Course Deleted`,`danger`);
        }
    }
};
//show the course when the DOM Loaded
document.addEventListener(`DOMContentLoaded`,CourseUI.showCourse());
//Add new Course
document.getElementById(`courses-form`).addEventListener(`submit`,(val)=>{
    val.preventDefault();
    //get inputs values
    const title = document.getElementById(`title`).value;
    const instructor = document.getElementById(`instructor`).value;
    const price = document.getElementById(`price`).value;
    const description = document.getElementById(`description`).value;
    //validating the input data
    if(title == `` || instructor == `` || price == `` || description == ``){
        CourseUI.alertMassge(`Can't Submit empty fields`,`warning`)
    }else if(price < 500){
        CourseUI.alertMassge(`Price must be heigher than 500` , `warning`)
    }else{
    const course = new Course(title , instructor , price , description);
    console.log(course);
    CourseUI.addCourseToViwe(course);
    CourseUI.alertMassge(`Submit Done`,`success`)
    CourseUI.clearFields();
    }
});
//target the delete btn
document.getElementById(`course-list`).addEventListener(`click`,(val)=>{
    CourseUI.deleteCourse(val.target)
});
// target the update btn
document.getElementById(`course-list`).addEventListener(`click`,(val)=>{
    CourseUI.updateCourse(val.target);
}); 
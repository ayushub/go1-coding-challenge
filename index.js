const learnerAndCourses = function (dataset) {
    //assuming valid JSON so no duplicate learners
    
    let singleLearnerCourseList = [], dups = [];

    //traverse through the json obj
    for (let learner in dataset){
        //check if it has courses
        if(dataset[learner].length > 0){
            let courses = dataset[learner];
            let newCourses = [];
            for(let i in courses){
                //if already added then its a repeat course
                let idx = singleLearnerCourseList.indexOf(courses[i]);
                if(idx >= 0){
                    dups.push(courses[i]);
                    singleLearnerCourseList.splice(idx, 1);
                } else if (!dups.includes(courses[i]) && 
                           !newCourses.includes(courses[i])) {
                    newCourses.push(courses[i]);
                }
            }
            if(newCourses.length > 0) singleLearnerCourseList.push(...newCourses);
        }
    }
    return singleLearnerCourseList;
};

module.exports = 
{
    learnerAndCourses: learnerAndCourses
};


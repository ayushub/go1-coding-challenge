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

const quizResults = function (answers, responses) {
    let index = 1;
    var counter = answers.map(a => 0);
    //go through each response
    for (let i in responses){
        let response = responses[i];
        if (typeof(response) == 'object' && response.length == answers.length){
            let count = response.map((a, idx) => a === answers[idx]);
            console.log(count)
            counter = counter.map((c,i) => {
                if(count[i]) c++;
                return c;
            })
            console.log(counter)
        }
    }
    index = counter.indexOf(Math.max(...counter));

    return "The easiest question is index " + index;
}

const watchedCourses = function() {
    return {
        "Course_001" : "Course_002",
        "Course_002" : "Course_003"
    }
}

module.exports = 
{
    learnerAndCourses: learnerAndCourses,
    quizResults: quizResults,
    watchedCourses: watchedCourses 
};


var {learnerAndCourses} = require('../index');
var assert = require('assert');

describe('Go1', function() {
    describe('learner and courses', function() {
        it('return all courses when only 1 learner', function() {
            let a = 
                {
                    "Learner-0001": [
                    "Course-0001",
                    "Course-0002",
                    "Course-0003"
                    ]
                };
            assert.deepEqual(learnerAndCourses(a), [
                "Course-0001",
                "Course-0002",
                "Course-0003"
            ]);
        });
        it('return all courses when non-repeat', function() {
            let a = 
                    {
                    "Learner-0001": [
                        "Course-0001"
                    ],
                    "Learner-0002": [
                        "Course-0002"
                    ],
                    "Learner-0003": [
                        "Course-0003"
                    ],
                    "Learner-0004": [
                        "Course-0004"
                    ]
                    };
            assert.deepEqual(learnerAndCourses(a), [
                "Course-0001",
                "Course-0002",
                "Course-0003",
                "Course-0004"
            ]);
        });
        it('return 1 & 7 courses when 2 - 6 repeated', function() {
            let a = 
            {
                "Learner-0001": [
                  "Course-0001",
                  "Course-0002",
                  "Course-0003"
                ],
                "Learner-0002": [
                  "Course-0002",
                  "Course-0003",
                  "Course-0004"
                ],
                "Learner-0003": [
                  "Course-0004",
                  "Course-0005",
                  "Course-0006"
                ],
                "Learner-0004": [
                  "Course-0005",
                  "Course-0006",
                  "Course-0007"
                ]
              };
            assert.deepEqual(learnerAndCourses(a), [
                "Course-0001",
                "Course-0007"
            ]);
        });
        it('return 1 & 4 courses when 2 - 3 repeated', function() {
            let a = {
                "Learner-0001": [
                  "Course-0001",
                  "Course-0002",
                  "Course-0003",
                  "Course-0001",
                  "Course-0002",
                  "Course-0003"
                ],
                "Learner-0002": [
                  "Course-0002",
                  "Course-0003",
                  "Course-0004"
                ]
              };
            
            assert.deepEqual(learnerAndCourses(a), [
                "Course-0001",
                "Course-0004"
            ]);
        });
  });
});
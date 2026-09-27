export const coursesdummy = [
  {
    _id: "jjggee",
    courseTitle: "Computer Networking Tutorial For Beginners (Basics of Networking)",
    courseDescription:
      "Basics of Computer Networking Tutorial For Beginners. Learn networking concepts with real-world examples including DNS, DHCP, IP addressing, OSI Model, TCP/IP, and more.",
    coursePrice: 49.99,
    discount: 20,
    isPublished: true,
    educator: "educator_networking_01",
    enrolledStudents: [],
    courseRatings: [4,5,2,4,5],
    courseThumbnail:
      "https://i.ytimg.com/vi/ZvWn5xBflUs/maxresdefault.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    courseContent: [
      {
        chapterId: "net_ch_1",
        chapterOrder: 1,
        chapterTitle: "Networking Fundamentals",
        chapterContent: [
          {
            lectureId: "net_l_1",
            lectureTitle: "Difference between Hub, Switch and Router",
            lectureDuration: 4,
            lectureUrl: "https://youtu.be/ZvWn5xBflUs",
            isPreviewFree: true,
            lectureOrder: 1
          },
          {
            lectureId: "net_l_2",
            lectureTitle: "What is Gateway in Computer Network",
            lectureDuration: 4,
            lectureUrl: "https://youtu.be/ai5bFPVToMU",
            isPreviewFree: false,
            lectureOrder: 2
          },
          {
            lectureId: "net_l_3",
            lectureTitle: "What is Firewall in Networking",
            lectureDuration: 6,
            lectureUrl: "https://youtu.be/wSeP4R1fwac",
            isPreviewFree: false,
            lectureOrder: 3
          }
        ]
      },
      {
        chapterId: "net_ch_2",
        chapterOrder: 2,
        chapterTitle: "IP Addressing & Protocols",
        chapterContent: [
          {
            lectureId: "net_l_4",
            lectureTitle: "What is DNS (Domain Name System)",
            lectureDuration: 7,
            lectureUrl: "https://youtu.be/idcb3jMH_vQ",
            isPreviewFree: true,
            lectureOrder: 1
          },
          {
            lectureId: "net_l_5",
            lectureTitle: "What is DHCP",
            lectureDuration: 5,
            lectureUrl: "https://youtu.be/n7vdTqRjkVo",
            isPreviewFree: false,
            lectureOrder: 2
          },
          {
            lectureId: "net_l_6",
            lectureTitle: "TCP vs UDP Explained",
            lectureDuration: 8,
            lectureUrl: "https://youtu.be/-beUvUJ5uOg",
            isPreviewFree: false,
            lectureOrder: 3
          }
        ]
      },
      {
        chapterId: "net_ch_3",
        chapterOrder: 3,
        chapterTitle: "OSI & Network Models",
        chapterContent: [
          {
            lectureId: "net_l_7",
            lectureTitle: "OSI Model Explained",
            lectureDuration: 7,
            lectureUrl: "https://youtu.be/J3JZDLFyJGY",
            isPreviewFree: true,
            lectureOrder: 1
          },
          {
            lectureId: "net_l_8",
            lectureTitle: "OSI vs TCP/IP Model",
            lectureDuration: 11,
            lectureUrl: "https://youtu.be/0jTcq0R8idU",
            isPreviewFree: false,
            lectureOrder: 2
          }
        ]
      }
    ]
  },

  {
    _id: "jjeerr",
    courseTitle: "HTML, CSS & JavaScript Tutorials",
    courseDescription:
      "Learn modern web development with HTML, CSS, and JavaScript by building real-world responsive projects.",
    coursePrice: 39.99,
    discount: 30,
    isPublished: true,
    educator: "educator_web_01",
    enrolledStudents: [],
    courseRatings: [5,4,4,5,5],
    courseThumbnail:
      "https://i.ytimg.com/vi/d06fElS_EUY/maxresdefault.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    courseContent: [
      {
        chapterId: "web_ch_1",
        chapterOrder: 1,
        chapterTitle: "HTML & CSS Basics",
        chapterContent: [
          {
            lectureId: "web_l_1",
            lectureTitle: "HTML & CSS Signup Form",
            lectureDuration: 27,
            lectureUrl: "https://youtu.be/d06fElS_EUY",
            isPreviewFree: true,
            lectureOrder: 1
          },
          {
            lectureId: "web_l_2",
            lectureTitle: "Responsive Navigation Menu",
            lectureDuration: 39,
            lectureUrl: "https://youtu.be/yFWAOzwovrQ",
            isPreviewFree: false,
            lectureOrder: 2
          }
        ]
      },
      {
        chapterId: "web_ch_2",
        chapterOrder: 2,
        chapterTitle: "JavaScript Projects",
        chapterContent: [
          {
            lectureId: "web_l_3",
            lectureTitle: "Random Color Generator Project",
            lectureDuration: 17,
            lectureUrl: "https://youtu.be/UNIlt7_oMQQ",
            isPreviewFree: true,
            lectureOrder: 1
          },
          {
            lectureId: "web_l_4",
            lectureTitle: "Responsive Website with JS",
            lectureDuration: 85,
            lectureUrl: "https://youtu.be/FazgJVnrVuI",
            isPreviewFree: false,
            lectureOrder: 2
          }
        ]
      }
    ]
  },

  {
    _id: "jjwwtt",
    courseTitle: "Machine Learning for Beginners",
    courseDescription:
      "A beginner-friendly introduction to Machine Learning concepts, algorithms, and Python implementation.",
    coursePrice: 59.99,
    discount: 25,
    isPublished: true,
    educator: "educator_ml_01",
    enrolledStudents: [],
    courseRatings: [4,3,3,3,5],
    courseThumbnail:
      "https://i.ytimg.com/vi/Y9CqaN-q6NY/maxresdefault.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    courseContent: [
      {
        chapterId: "ml_ch_1",
        chapterOrder: 1,
        chapterTitle: "Machine Learning Basics",
        chapterContent: [
          {
            lectureId: "ml_l_1",
            lectureTitle: "Machine Learning Algorithms Overview",
            lectureDuration: 135,
            lectureUrl: "https://youtu.be/Y9CqaN-q6NY",
            isPreviewFree: true,
            lectureOrder: 1
          },
          {
            lectureId: "ml_l_2",
            lectureTitle: "How to Pick the Right ML Model",
            lectureDuration: 40,
            lectureUrl: "https://youtu.be/0uglUqYZGXY",
            isPreviewFree: false,
            lectureOrder: 2
          },
          {
            lectureId: "ml_l_3",
            lectureTitle: "Machine Learning with Python",
            lectureDuration: 231,
            lectureUrl: "https://youtu.be/vEHxgto-mGo",
            isPreviewFree: false,
            lectureOrder: 3
          }
        ]
      }
    ]
  },
  {
    _id: "jjuuss",
    courseTitle: "Programming for Beginners",
    courseDescription:
      "This playlist contains videos for beginner programmers who want to get started with software development. I am covering all the basics you need to know before moving on to more advanced topics.",
    coursePrice: 29.99,
    discount: 100,
    isPublished: true,
    educator: "educator_prog_01",
    enrolledStudents: [],
    courseRatings: [5, 4, 4, 5, 3],
    courseThumbnail:
      "https://i.ytimg.com/vi/YMAwgRwjEOQ/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBcFCp_p4MNTAx8CqzZrnDIhkQZ4w",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    courseContent: [
      {
        chapterId: "prog_ch_1",
        chapterOrder: 1,
        chapterTitle: "Programming Basics",
        chapterContent: [
          {
            lectureId: "YMAwgRwjEOQ",
            lectureTitle: "5 Design Patterns That Are ACTUALLY Used By Developers",
            lectureDuration: 9.5,
            lectureUrl: "https://youtu.be/YMAwgRwjEOQ",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "5OJRqkYbK-4",
            lectureTitle: "Stack vs Heap Memory - Simple Explanation",
            lectureDuration: 5.5,
            lectureUrl: "https://youtu.be/5OJRqkYbK-4",
            isPreviewFree: true,
            lectureOrder: 2,
          },
          {
            lectureId: "kF7rQmSRlq0",
            lectureTitle: "SOLID Principles: Do You Really Understand Them?",
            lectureDuration: 7,
            lectureUrl: "https://youtu.be/kF7rQmSRlq0",
            isPreviewFree: true,
            lectureOrder: 3,
          },
          {
            lectureId: "CWAi_2oLhYg",
            lectureTitle: "Backend Developer Roadmap - Everything you need to know in 2023",
            lectureDuration: 6.9,
            lectureUrl: "https://youtu.be/CWAi_2oLhYg",
            isPreviewFree: true,
            lectureOrder: 4,
          },
        ],
      },
    ],
  },
  {
    _id: "jjssyy",
    courseTitle: "Python 3 Programming Tutorials for Beginners",
    courseDescription:
      "Python tutorial for absolute beginners. Python programming is extremely easy to learn and highly recommended for anyone starting out. The tutorial videos are centered around solving real life problems.",
    coursePrice: 39.99,
    discount: 100,
    isPublished: true,
    educator: "educator_python_01",
    enrolledStudents: [],
    courseRatings: [5, 5, 4, 4, 5],
    courseThumbnail:
      "https://i.ytimg.com/vi/eykoKxsYtow/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB2GpmTY3ikvJC3xXRZWyNGalnfww",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    courseContent: [
      {
        chapterId: "py_ch_1",
        chapterOrder: 1,
        chapterTitle: "Python Basics",
        chapterContent: [
          {
            lectureId: "eykoKxsYtow",
            lectureTitle: "Why Should You Learn Python? | Complete python3 tutorials for beginners",
            lectureDuration: 5.3,
            lectureUrl: "https://youtu.be/eykoKxsYtow",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "6lBPM-MiGNI",
            lectureTitle: "Install python on windows [Python 3 Programming Tutorials]",
            lectureDuration: 3.9,
            lectureUrl: "https://youtu.be/6lBPM-MiGNI",
            isPreviewFree: true,
            lectureOrder: 2,
          },
          {
            lectureId: "8tCe1P_cgoY",
            lectureTitle: "Variables in python [Python 3 Programming Tutorials]",
            lectureDuration: 3.7,
            lectureUrl: "https://youtu.be/8tCe1P_cgoY",
            isPreviewFree: true,
            lectureOrder: 3,
          },
          {
            lectureId: "pd2_ZbhFT38",
            lectureTitle: "Numbers [Python 3 Programming Tutorials]",
            lectureDuration: 8.7,
            lectureUrl: "https://youtu.be/pd2_ZbhFT38",
            isPreviewFree: true,
            lectureOrder: 4,
          },
        ],
      },
    ],
  },
  {
    _id: "jjffyy",
    courseTitle: "Python Tutorials for Absolute Beginners by CS Dojo",
    courseDescription: "Step-by-step Python tutorials covering basics, loops, functions, and more.",
    coursePrice: 24.99,
    discount: 100,
    isPublished: true,
    educator: "educator_csdojo_01",
    enrolledStudents: [],
    courseRatings: [4, 4, 5, 5, 4],
    courseThumbnail:
      "https://i.ytimg.com/vi/Z1Yd7upQsXY/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA9t6oItFSXWe_bM_DuzvimYnOgRQ",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    courseContent: [
      {
        chapterId: "csdojo_ch_1",
        chapterOrder: 1,
        chapterTitle: "Python Basics",
        chapterContent: [
          {
            lectureId: "Z1Yd7upQsXY",
            lectureTitle: "Python Tutorial for Absolute Beginners #1 - What Are Variables?",
            lectureDuration: 24.6,
            lectureUrl: "https://youtu.be/Z1Yd7upQsXY",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "AWek49wXGzI",
            lectureTitle: "How to Use If Else Statements in Python (Python Tutorial #2)",
            lectureDuration: 19.8,
            lectureUrl: "https://youtu.be/AWek49wXGzI",
            isPreviewFree: true,
            lectureOrder: 2,
          },
          {
            lectureId: "NSbOtYzIQI0",
            lectureTitle: "How To Use Functions In Python (Python Tutorial #3)",
            lectureDuration: 14.9,
            lectureUrl: "https://youtu.be/NSbOtYzIQI0",
            isPreviewFree: true,
            lectureOrder: 3,
          },
        ],
      },
    ],
  }
];

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectDB } = require('./src/config/db');
const User = require('./src/models/User');
const Course = require('./src/models/Course');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create Instructors
    const instructorsData = [
      { name: 'Karthik', email: 'karthik@my.centennialcollege.ca', role: 'instructor' },
      { name: 'Konstantin', email: 'konstantin@my.centennialcollege.ca', role: 'instructor' },
      { name: 'Arindam', email: 'arindam@my.centennialcollege.ca', role: 'instructor' },
      { name: 'Vaishali', email: 'vaishali@my.centennialcollege.ca', role: 'instructor' },
    ];

    const instructors = [];
    for (const i of instructorsData) {
      const user = await User.create({ ...i, password: 'password123' });
      instructors.push(user);
    }
    console.log(`Created ${instructors.length} instructors`);

    // Create Admin and Student for testing
    await User.create({ name: 'Admin User', email: 'admin1@my.centennialcollege.ca', password: 'password123', role: 'admin' });
    await User.create({ name: 'Second Admin', email: 'admin2@my.centennialcollege.ca', password: 'password123', role: 'admin' });
    await User.create({ name: 'Student User', email: 'student1@my.centennialcollege.ca', password: 'password123', role: 'student' });
    await User.create({ name: 'Student User', email: 'student2@my.centennialcollege.ca', password: 'password123', role: 'student' });
    console.log('Created Admin and Student users');

    // Create Courses
    const coursesData = [
      {
        title: 'COMP229- Web Development',
        description: 'Learn the fundamentals of React, and JavaScript. Build your first responsive website from scratch.',
        level: 'Beginner',
        studentCount: 1234,
        duration: '8 weeks',
        instructorName: 'Karthik'
      },
      {
        title: 'COMP230 - Advanced React Patterns',
        description: 'Master advanced React concepts including hooks, context, custom hooks, and performance optimization techniques.',
        level: 'Advanced',
        studentCount: 856,
        duration: '6 weeks',
        instructorName: 'Karthik'
      },
      {
        title: 'COMP237 - Introduction to Ai',
        description: 'Comprehensive course covering pandas, NumPy, data visualization, and machine learning basics.',
        level: 'Intermediate',
        studentCount: 2341,
        duration: '10 weeks',
        instructorName: 'Konstantin'
      },
      {
        title: 'COMP231 - UI/UX Design Fundamentals',
        description: 'Learn design principles, user research, wireframing, prototyping, and creating beautiful user interfaces.',
        level: 'Beginner',
        studentCount: 1567,
        duration: '5 weeks',
        instructorName: 'Karthik'
      },
      {
        title: 'COMP232 - Mobile App Development',
        description: 'Build cross-platform mobile applications using React Native. Deploy to iOS and Android app stores.',
        level: 'Intermediate',
        studentCount: 923,
        duration: '12 weeks',
        instructorName: 'Arindam'
      },
      {
        title: 'COMP248 - Ai Systems Design',
        description: 'Ai systems design and architect scalable solutions.',
        level: 'Advanced',
        studentCount: 1789,
        duration: '8 weeks',
        instructorName: 'Vaishali'
      }
    ];

    for (const c of coursesData) {
      const instructor = instructors.find(i => i.name === c.instructorName);
      await Course.create({
        title: c.title,
        description: c.description,
        level: c.level,
        studentCount: c.studentCount,
        duration: c.duration,
        instructor: instructor._id
      });
    }
    console.log(`Created ${coursesData.length} courses`);

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

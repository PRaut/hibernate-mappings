package com.study.hibernate.demo;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.study.hibernate.demo.entity.Course;
import com.study.hibernate.demo.entity.Instructor;
import com.study.hibernate.demo.entity.InstructorDetail;
import com.study.hibernate.demo.entity.Review;
import com.study.hibernate.demo.entity.Student;

public class CreateCourseAndStudentsDemo
{

	public static void main(String[] args)
	{

		// create session factory
		SessionFactory factory = new Configuration()
				.configure("hibernate.cfg.xml")
				.addAnnotatedClass(Instructor.class)
		      .addAnnotatedClass(InstructorDetail.class)
		      .addAnnotatedClass(Course.class)
		      .addAnnotatedClass(Review.class)
		      .addAnnotatedClass(Student.class)
		      .buildSessionFactory();

		// create session
		Session session = factory.getCurrentSession();

		try
		{

			// Start the session
			session.beginTransaction();
			
			// get the student John from Db
			
			Student tempStudent = session.get(Student.class, 57);
			System.out.println("\nLoaded student: " + tempStudent);
			System.out.println("Courses: "+ tempStudent.getCourses());
			
			// Crate more courses
			Course tempCourse1 = new Course("Rubikc cube");
			Course temCourse2 = new Course("Algorithm");
			
			// Add student to courses
			tempCourse1.addStudent(tempStudent);
			temCourse2.addStudent(tempStudent);
			
			// save the courses
			System.out.println("\nSaving the Course..");
			session.save(tempCourse1);
			session.save(temCourse2);
			System.out.println("Saved Course..");
			
			// commit transaction
			session.getTransaction().commit();

			System.out.println("Done!");
		}
		finally
		{
			session.close();
			factory.close();
		}
	}

}

package com.study.hibernate.demo;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.study.hibernate.demo.entity.Course;
import com.study.hibernate.demo.entity.Instructor;
import com.study.hibernate.demo.entity.InstructorDetail;
import com.study.hibernate.demo.entity.Review;
import com.study.hibernate.demo.entity.Student;

public class AddCourseForJohnDemo
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

			// Create a Course
			System.out.println("Saving the Course");
			Course tempCourse = new Course("Physics");
			System.out.println("Saved course..");
			// Save the Course
			session.save(tempCourse);

			// Create the Students
			Student tempStudent1 = new Student("Mike","K", "kmike@gmail.com");
			Student tempStudent2 = new Student("Daniel","D", "ddaniel@gmail.com");
			
			// Add Students to the Course
			tempCourse.addStudent(tempStudent1);
			tempCourse.addStudent(tempStudent2);
			
			// Save the Students
			System.out.println("Saving students..");
			session.save(tempStudent1);
			session.save(tempStudent2);
			
			System.out.println("Students saved..");
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

package com.study.hibernate.demo;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.study.hibernate.demo.entity.Course;
import com.study.hibernate.demo.entity.Instructor;
import com.study.hibernate.demo.entity.InstructorDetail;
import com.study.hibernate.demo.entity.Review;
import com.study.hibernate.demo.entity.Student;

public class DeleteHistoryCourseDemo
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

			// Get Course from Db using id 
			Course tempCourse = session.get(Course.class, 62);
			System.out.println("Deleting course: "+ tempCourse);
			
			// Delete the course
			session.delete(tempCourse);
			
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

package com.study.hibernate.demo;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.study.hibernate.demo.entity.Course;
import com.study.hibernate.demo.entity.Instructor;
import com.study.hibernate.demo.entity.InstructorDetail;

public class GetInstructorCoursesDemo
{

	public static void main(String[] args)
	{

		// create session factory
		SessionFactory factory = new Configuration()
				.configure("hibernate.cfg.xml")
				.addAnnotatedClass(Instructor.class)
		      .addAnnotatedClass(InstructorDetail.class)
		      .addAnnotatedClass(Course.class)
		      .buildSessionFactory();

		// create session
		Session session = factory.getCurrentSession();

		try
		{

			// Start the session
			session.beginTransaction();

			// Get the Instructor from the table
			Instructor tempInstructor = session.get(Instructor.class, 7);

			System.out.println(tempInstructor);

			// Get the Courses of Instructor

			
			System.out.println("Courses :" + tempInstructor.getCourses());

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

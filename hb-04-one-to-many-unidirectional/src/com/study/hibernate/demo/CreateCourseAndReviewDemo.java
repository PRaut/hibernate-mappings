package com.study.hibernate.demo;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.study.hibernate.demo.entity.Course;
import com.study.hibernate.demo.entity.Instructor;
import com.study.hibernate.demo.entity.InstructorDetail;
import com.study.hibernate.demo.entity.Review;

public class CreateCourseAndReviewDemo
{

	public static void main(String[] args)
	{

		// create session factory
		SessionFactory factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Instructor.class)
		      .addAnnotatedClass(InstructorDetail.class).addAnnotatedClass(Course.class).addAnnotatedClass(Review.class)
		      .buildSessionFactory();

		// create session
		Session session = factory.getCurrentSession();

		try
		{

			// Start the session
			session.beginTransaction();

			// Create a Course
			Course tempCourse = new Course("Music for health");

			// Add some reviews
			tempCourse.addReview(new Review("This is awesome course.."));
			tempCourse.addReview(new Review(" awesome course.."));
			tempCourse.addReview(new Review("Must watch .."));

			// Save the course .. and leverage the cascade all
			System.out.println("Saving course");
			System.out.println(tempCourse);
			System.out.println(tempCourse.getReviews());
			session.save(tempCourse);

			// Get Course details
//			System.out.println("Course : "+ session.get(Course.class, 33));

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

package com.study.hibernate.demo;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.study.hibernate.demo.entity.Course;
import com.study.hibernate.demo.entity.Instructor;
import com.study.hibernate.demo.entity.InstructorDetail;

public class CreateCoursesDemo {

	public static void main(String[] args) {

		// create session factory
		SessionFactory factory = new Configuration()
								.configure("hibernate.cfg.xml")
								.addAnnotatedClass(Instructor.class)
								.addAnnotatedClass(InstructorDetail.class)
								.addAnnotatedClass(Course.class)
								.buildSessionFactory();
		
		// create session
		Session session = factory.getCurrentSession();
		
		
		try {
			
			// Start the session
			session.beginTransaction();
			
			// Get the Instructor from the table
			Instructor tempInstructor = session.get(Instructor.class, 7);
		
			// Create some Courses
			Course tempCourse1 = new Course("Java");
			Course tempCourse2 = new Course("Adv Java");
			
			// Add Courses to Instructor
			tempInstructor.add(tempCourse1);
			tempInstructor.add(tempCourse2);

			// Save the Courses
			session.save(tempCourse1);
			session.save(tempCourse2);
			
			// commit transaction
			session.getTransaction().commit();
			
			System.out.println("Done!");
		}
		finally {
			session.close();
			factory.close();
		}
	}

}






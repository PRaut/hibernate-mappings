package com.study.hibernate.demo.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Course")
public class Course
{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	private String title;

	@ManyToOne(cascade =
	{ CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH })
	@JoinColumn(name = "instructor_id")
	private Instructor instructor;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "course_id")
	private List<Review> reviews;

	@ManyToMany(fetch = FetchType.LAZY,
			cascade ={ CascadeType.DETACH, CascadeType.MERGE, 
					CascadeType.PERSIST, CascadeType.REFRESH } )
	@JoinTable(
			name="course_student",
			joinColumns = @JoinColumn(name="course_id"), 
			inverseJoinColumns = @JoinColumn(name="student_id") )
	private List<Student> students;

	public Course()
	{
	}

	public Course(String title)
	{
		super();
		this.title = title;
	}

	public int getId()
	{
		return id;
	}

	public void setId(int id)
	{
		this.id = id;
	}

	public String getTitle()
	{
		return title;
	}

	public void setTitle(String title)
	{
		this.title = title;
	}

	public Instructor getInstructor()
	{
		return instructor;
	}

	public void setInstructor(Instructor instructor)
	{
		this.instructor = instructor;
	}

	public Course(List<Review> reviews)
	{
		super();
		this.reviews = reviews;
	}

	public List<Review> getReviews()
	{
		return reviews;
	}

	public void setReviews(List<Review> reviews)
	{
		this.reviews = reviews;
	}

	public List<Student> getStudents()
	{
		return students;
	}

	public void setStudents(List<Student> students)
	{
		this.students = students;
	}

	// For adding review
	public void addReview(Review tempReview)
	{
		if(reviews == null)
		{
			reviews = new ArrayList<Review>();
		}
		reviews.add(tempReview);
	}

	public void addStudent(Student tempStudent)
	{
		if(students == null)
		{
			students = new ArrayList<Student>();
		}
		students.add(tempStudent);
	}

	@Override
	public String toString()
	{
		return "Course [id=" + id + ", title=" + title + "]";
	}

}
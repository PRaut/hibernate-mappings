package com.study.hibernate.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Review")
public class Review
{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String comments;


	public Review()
	{
	}

	public Review(String comments)
	{
		super();
		this.comments = comments;
	}

	public int getId()
	{
		return id;
	}

	public void setId(int id)
	{
		this.id = id;
	}

	public String getComments()
	{
		return comments;
	}

	public void setComments(String comments)
	{
		this.comments = comments;
	}

	

	@Override
	public String toString()
	{
		return "Review [id=" + id + ", comments=" + comments + "]";
	}

}

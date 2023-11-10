import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function CreatePost() {
  let navigate = useNavigate();

  const formIntialValues = {
    title: "",
    username: "",
    postText: "",
  };
  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    postText: yup.string().min(10).max(50).required(),
  });

  const submition = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-300">
      <h2 className="absolute top-2 text-stone-900">Create Post </h2>
      <Formik
        initialValues={formIntialValues}
        onSubmit={submition}
        validationSchema={validationSchema}
      >
        <Form className="bg-blue-300 w-max h-84 flex flex-col justify-center items-center p-20 rounded-xl">
          <label htmlFor="">Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field id="" name="title" placeholder="title" />

          <label htmlFor="">Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field id="" name="postText" placeholder="postText" />

          <button
            className="bg-slate-400 px-4 py-2 m-4 rounded-lg hover:scale-105 "
            type="submit"
          >
            Publish
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;

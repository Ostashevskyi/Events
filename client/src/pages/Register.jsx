import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useParams } from "react-router-dom";
import generateErrorMessage from "../utils/generateErrorMessage";
import { Toaster, toast } from "sonner";

const Register = () => {
  const { event } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { fullName, email, dateOfBirth, event, heardFrom } = data;
    try {
      const res = await fetch("http://localhost:4000/api/participants", {
        method: "POST",
        body: JSON.stringify({
          fullName,
          email,
          dateOfBirth,
          heardFrom,
          event,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.message("You have successfully registered for the event", {
          description: `${event}`,
        });
        reset();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[400px] border p-4 gap-4"
      >
        <label htmlFor="fullName">Full name *</label>
        <input
          type="text"
          id="fullName"
          className="border rounded-md p-1 focus:outline-none"
          {...register("fullName", {
            required: true,
          })}
        />
        {errors.fullName && (
          <p className="text-red-500">
            {generateErrorMessage(errors.fullName.type)}
          </p>
        )}

        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          className="border rounded-md p-1 focus:outline-none"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-red-500">
            {generateErrorMessage(errors.email.type)}
          </p>
        )}

        <label htmlFor="date">Date of birth *</label>
        <input
          type="date"
          id="date"
          className="border rounded-md p-1 focus:outline-none cursor-pointer"
          {...register("dateOfBirth", { required: true })}
        />
        {errors.dateOfBirth && (
          <p className="text-red-500">
            {generateErrorMessage(errors.dateOfBirth.type)}
          </p>
        )}

        <label htmlFor="Event">Event</label>
        <input
          type="text"
          value={event}
          className="border rounded-md p-1"
          {...register("event")}
          readOnly
        />

        <p>Where did you hear about this event? *</p>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <input
              type="radio"
              id="socialMedia"
              className="cursor-pointer"
              value={"Social Media"}
              {...register("heardFrom", { required: true })}
            />
            <label htmlFor="socialMedia">Social Media</label>
          </div>

          <div className="flex gap-2">
            <input
              type="radio"
              id="friends"
              className="cursor-pointer"
              value={"Friends"}
              {...register("heardFrom", { required: true })}
            />
            <label htmlFor="friends">Friends</label>
          </div>

          <div className="flex gap-2">
            <input
              type="radio"
              id="foundMyself"
              value={"Found myself"}
              className="cursor-pointer"
              {...register("heardFrom", { required: true })}
            />
            <label htmlFor="foundMyself">Found myself</label>
          </div>
        </div>
        {errors.heardFrom && (
          <p className="text-red-500">
            {generateErrorMessage(errors.heardFrom.type)}
          </p>
        )}

        <div className="flex justify-between">
          <input
            type="submit"
            value={isSubmitting ? "Submitting..." : "Submit"}
            className="border rounded-lg max-w-[200px] h-8 cursor-pointer flex-1"
          />
          <NavLink to={"/"}>Back to events</NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;

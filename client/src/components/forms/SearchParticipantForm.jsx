import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const SearchParticipantForm = ({ event }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.fullName) {
      searchParams.set("fullName", data.fullName);
    } else {
      searchParams.delete("fullName");
    }

    if (data.email) {
      searchParams.set("email", data.email);
    } else {
      searchParams.delete("email");
    }

    setSearchParams(searchParams);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center">
      <p className="text-xl">Search participant</p>
      <input
        type="text"
        placeholder="Enter a full name"
        {...register("fullName")}
        className="border rounded-md p-1 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Enter an email"
        {...register("email")}
        className="border rounded-md p-1 focus:outline-none"
      />
      <input
        type="Submit"
        className="border rounded-lg p-1 text-center h-8 cursor-pointer"
      />
    </form>
  );
};

export default SearchParticipantForm;

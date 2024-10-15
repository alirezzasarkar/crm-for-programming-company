import AddContentProject from "../components/Projects/AddContentProduction";
import { useForm } from "react-hook-form";
import { ContentProjectFormInputs } from "../components/Projects/AddContentProduction"; // Import interface

export const AddContentProductionPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContentProjectFormInputs>(); // Specify the form input types

  const onSubmit = (data: ContentProjectFormInputs) => {
    // Handle form data
    console.log("Form Data:", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddContentProject
          register={register}
          setValue={setValue}
          errors={errors}
        />
      </form>
    </>
  );
};

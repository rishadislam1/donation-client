"use client";
import { useGetVolunteerQuery } from "@/redux/features/Volunteer/volunteerApi";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../CustomButton/CustomButton";
import "./volunteerMain.css";
import { useAddVolunteerRequestMutation } from "@/redux/features/volunteerRequest/volunteerRequestApi";
import Swal from "sweetalert2";

const { Meta } = Card;

const VolunteerMain = () => {
  const { data: volunteerData } = useGetVolunteerQuery(undefined);

  const [
    addVolunteerRequest,
    { data: addVolunteerRequestData, isLoading: addVolunteerRequestIsLoading },
  ] = useAddVolunteerRequestMutation();

  //   handleFormRequest

  const handleFormRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const profession = formData.get("profession") as string;
    const country = formData.get("country") as string;
    const categoryImage = form.image.files[0];
    const image_hosting =
      "https://api.imgbb.com/1/upload?expiration=600&key=496cd83f6d0a12aa50bec50d47669908";

    if (categoryImage) {
      // Upload the image to imgbb
      const formData = new FormData();
      formData.append("image", categoryImage);

      try {
        const response = await fetch(
          "https://api.imgbb.com/1/upload?expiration=600&key=496cd83f6d0a12aa50bec50d47669908",
          {
            method: "POST",
            body: formData,
          }
        );

        const imageData = await response.json();

        // Use imageData.url in your data object
        const data = {
          name,
          profession,
          country,
          email,
          image: imageData?.data?.url,
        };
        addVolunteerRequest(data);
        form.reset();
      } catch (error) {
        Swal.fire({
          title: "Fail!",
          text: "Error uploading image",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  if (addVolunteerRequestIsLoading) {
    Swal.fire({
      title: "Requesting...",
      text: "Please Wait",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  if (
    !addVolunteerRequestIsLoading &&
    addVolunteerRequestData?.status === false
  ) {
    Swal.fire({
      title: "The Email Address Already Exist",
      text: "YOU ARE ALREADY A MEMBER",
      icon: "success",
    });
  }

  if (
    !addVolunteerRequestIsLoading &&
    addVolunteerRequestData?.status === true
  ) {
    Swal.fire({
      title: "Requested SuccessFully",
      icon: "success",
    });
  }

  return (
    <div className="mt-52" data-aos="fade-right">
      <p className="ml-10 text-blue-600 font-bold">- Team Members</p>
      <h1 className="ml-10">Our Expert Volunteer</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:px-20 gap-10">
        <div className="flex justify-center items-center md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-20 mt-14">
            {volunteerData?.map((vol) => (
              <div key={vol._id}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <Image
                      src={vol.image}
                      height={100}
                      width={100}
                      alt={vol.name}
                    />
                  }
                >
                  <Meta title={vol.name} description={vol.profession} />
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div data-aos="fade-left">
          <div className="volunteerRequest p-10 rounded-xl text-white">
            <form onSubmit={handleFormRequest}>
              <div className="flex flex-col gap-3">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  id=""
                  placeholder="your name"
                  className="rounded-xl border-none py-3 px-3 bg-gray-300 cursor-auto"
                  required
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="your Email"
                  className="rounded-xl border-none py-3 px-3 bg-gray-300 cursor-auto"
                  required
                />
              </div>

              <div className="flex flex-col gap-3 mt-5">
                <label>Profession</label>
                <input
                  type="text"
                  name="profession"
                  id=""
                  placeholder="your Profession"
                  className="rounded-xl border-none py-3 px-3 bg-gray-300 cursor-auto"
                  required
                />
              </div>

              <div className="flex flex-col gap-3 mt-5">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  id=""
                  placeholder="your Country"
                  className="rounded-xl border-none py-3 px-3 bg-gray-300 cursor-auto"
                  required
                />
              </div>

              <div className="mt-5">
                <label>Volunteer Image*</label> <br />
                <br />
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept=".jpg, .jpeg, .png"
                />
              </div>

              <button
                type="submit"
                className="mt-5 px-5 py-2 rounded-xl bg-yellow-600 text-white border-none cursor-pointer text-xl"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerMain;

"use client";
import { useSendEmailMutation } from "@/redux/features/Mailer/mailerApi";
import "./DonateQuestion.css";
import Swal from "sweetalert2";

const DonateQuestion = () => {
  const [mailerApi, { isLoading, data: sendEmailData }] =
    useSendEmailMutation();

  const handleFormAsk = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const help = formData.get("help") as string;
    const data = {
      email,
      subject: name,
      message: help,
    };
    mailerApi(data);
    form.reset();
  };

  if (isLoading) {
    Swal.fire({
      title: "Sending.....",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
  if (!isLoading && sendEmailData) {
    Swal.fire({
      title: "Success",
      text: "Email Send Successfully",
      icon: "success",
      confirmButtonText: "Thank You",
    });
  }
  return (
    <div>
      <div className="p-5 rounded-xl askqustion text-white">
        <h1>Have A Question?</h1>
        <form onSubmit={handleFormAsk}>
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
            <label>How Can Help You?</label>
            <textarea
              name="help"
              id="help"
              cols="30"
              rows="10"
              className="rounded-xl border-none py-3 px-3 bg-gray-300 cursor-auto"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-5 px-5 py-2 rounded-xl bg-yellow-600 text-white border-none cursor-pointer text-xl"
          >
            Ask It Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateQuestion;

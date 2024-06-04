import React, { useState } from "react";
import "./Faq.css";
import NavbarRes from "./navbar/NavbarRes";
import { Scrollbars } from "react-custom-scrollbars";
const faqs = [
  {
    id: "Q1",
    question: "What are the services do you offer ?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?,Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?",
  },
  {
    id: "Q2",
    question: "what are our preferred method of payment ?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto iusto veniam eveniet labore impedit nam",
  },
  {
    id: "Q3",
    question: "Are your services beginners friendly ?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores,Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?,Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?",
  },
  {
    id: "Q4",
    question: "what how does it take to upgrade a package ?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.",
  },
  {
    id: "Q5",
    question: "Where are your offices located around the world ?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?,Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?",
  },
];

const Faq = () => {
  const [open, setOpen ] = useState();
  
  const changeHandler = (id) => {
    setOpen(id)
  }

  return (
    <div className="lg:h-[100vh] overflow-hidden"
      >
      <div className="lg:p-[85px] pt-[85px] pb-[80px] bg-gray-200">
        <div className="shadow m-auto lg:w-[80%] md:w-[85%] w-[95%] bg-white rounded-2xl">
          <div className="lg:pt-5 pt-4 flex m-auto lg:flex-row flex-col ">
            <div className="lg:w-[45%]  m-auto">
              <img
                className="lg:h-[350px] lg:w-[480px] md:h-[250px] md:w-[300px] m-auto rounded h-[200px]"
                src="Images/faqImg.png"
                alt=""
              />
            </div>
            <div className="grid divide-y divide-neutral-200 lg:w-[50%]  pt-4 m-2  lg:pr-6 ">
              <Scrollbars style={{ height: "350px" }}>
                {faqs.map((faq) => (
                  <div className="py-3 px-2 mr-2 z-20 relative max-h-25 transition-[max-h] ease-in-out delay-2000 overflow-hidden">
                    <details className="group" >
                      <summary 
                      className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className="text-[1.1rem] font-[700]"> {faq.question}</span>
                        <span className="transition group-open:rotate-180 ">
                          <svg
                            fill="none"
                            height="24"
                            shape-rendering="geometricPrecision"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </summary>
                      <div className="transition-[max-h] ease-in-out delay-2000">
                      <p className=" text-[1rem] font-[400] mt-3">
                        {faq.answer}
                      </p>
                      </div>
                    </details>
                  </div>
                ))}
              </Scrollbars>
            </div>
          </div>
          <img
            className="w-[100%] h-[16%] lg:h-[35%] z-10"
            src="Images/faqFooter.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Faq;

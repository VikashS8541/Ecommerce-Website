import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const AccordionBox = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Rutrum massa id nisi enim enim tincidunt ultricies",
      answer:
        "Metus volutpat blandit euismod molestie et viverra nulla. A aenean velit tellus bibendum. Lorem posuere eu sit lacus laoreet neque integer augue. Feugiat fringilla rhoncus eleifend vulputate suspendisse non hendrerit. Ipsum ultrices quisque blandit venenatis at libero. Et amet dictum aenean condimentum nulla praesent non, nullam litora torquent. Consequat ullamcorper semper senectus ut ornare vel dis. Accumsan maecenas facilisi ad; convallis habitasse quis.",
    },
    {
      question: "Consequat sem leo viverra nunc turpis duis diam",
      answer:
        "This is the answer for the second question. You can place any content here such as paragraphs, lists, or links.",
    },
    {
      question: "Metus volutpat blandit euismod molestie et viverra",
      answer:
        "This is the answer for the third question. Radix UI Accordion ensures accessibility and keyboard navigation.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-accordion my-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 heading-color text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 md:max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-600"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left text-lg font-semibold heading-color"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                <h6>{faq.question}</h6>
                <span className="ml-4 transition-transform duration-600">
                  {openIndex === index ? (
                    <RemoveIcon fontSize="small" className="text-gray-600" />
                  ) : (
                    <AddIcon fontSize="small" className="text-gray-600" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 para">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccordionBox;
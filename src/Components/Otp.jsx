import { useEffect, useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
const Otp = ({ otpLength = 6 }) => {
  const [inputFields, setInputFields] = useState(new Array(otpLength).fill(""));
  const ref = useRef([]);

  const handleKeyDown = function (e, index) {
    const key = e.key;
    const copyInputfileds = [...inputFields];

    if (key === "Backspace") {
      copyInputfileds[index] = "";
      setInputFields(copyInputfileds);
      if (index) ref.current[index - 1].focus();
    }

    if (isNaN(key)) return;

    copyInputfileds[index] = key;
    setInputFields(copyInputfileds);
    if (index + 1 < otpLength) ref.current[index + 1].focus();
  };

  useEffect(() => {
    ref.current[0].focus();
  }, []);

  return (
    <>
      {inputFields.map((value, index) => (
        <input
          key={index}
          value={value}
          ref={(currInput) => (ref.current[index] = currInput)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </>
  );
};

export default Otp;

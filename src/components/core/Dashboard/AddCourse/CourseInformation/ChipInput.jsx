// // Importing React hook for managing component state
// import { useEffect, useState } from "react"
// // Importing React icon component
// import { MdClose } from "react-icons/md"
// import { useSelector } from "react-redux"

// // Defining a functional component ChipInput
// export default function ChipInput({
//   // Props to be passed to the component
//   label,
//   name,
//   placeholder,
//   register,
//   errors,
//   setValue,
//   getValues,
// }) {
//   const { editCourse, course } = useSelector((state) => state.course)

//   // Setting up state for managing chips array
//   const [chips, setChips] = useState([])

//   useEffect(() => {
//     if (editCourse) {
//       // console.log(course)
//       setChips(course?.tag)
//     }
//     register(name, { required: true, validate: (value) => value.length > 0 })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   useEffect(() => {
//     setValue(name, chips)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [chips])

//   // Function to handle user input when chips are added
//   const handleKeyDown = (event) => {
//     // Check if user presses "Enter" or ","
//     if (event.key === "Enter" || event.key === ",") {
//       // Prevent the default behavior of the event
//       event.preventDefault()
//       // Get the input value and remove any leading/trailing spaces
//       const chipValue = event.target.value.trim()
//       // Check if the input value exists and is not already in the chips array
//       if (chipValue && !chips.includes(chipValue)) {
//         // Add the chip to the array and clear the input
//         const newChips = [...chips, chipValue]
//         setChips(newChips)
//         event.target.value = ""
//       }
//     }
//   }

//   // Function to handle deletion of a chip
//   const handleDeleteChip = (chipIndex) => {
//     // Filter the chips array to remove the chip with the given index
//     const newChips = chips.filter((_, index) => index !== chipIndex)
//     setChips(newChips)
//   }

//   // Render the component
//   return (
//     <div className="flex flex-col space-y-2">
//       {/* Render the label for the input */}
//       <label className="text-sm text-richblack-5" htmlFor={name}>
//         {label} <sup className="text-pink-200">*</sup>
//       </label>
//       {/* Render the chips and input */}
//       <div className="flex w-full flex-wrap gap-y-2">
//         {/* Map over the chips array and render each chip */}
//         {chips.map((chip, index) => (
//           <div
//             key={index}
//             className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
//           >
//             {/* Render the chip value */}
//             {chip}
//             {/* Render the button to delete the chip */}
//             <button
//               type="button"
//               className="ml-2 focus:outline-none"
//               onClick={() => handleDeleteChip(index)}
//             >
//               <MdClose className="text-sm" />
//             </button>
//           </div>
//         ))}
//         {/* Render the input for adding new chips */}
//         <input
//           id={name}
//           name={name}
//           type="text"
//           placeholder={placeholder}
//           onKeyDown={handleKeyDown}
//           className="form-style w-full"
//         />
//       </div>
//       {/* Render an error message if the input is required and not filled */}
//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }


// Importing necessary dependencies from React, Redux, and icons
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ChipInput({
  label,        // Label for the input field
  name,         // Name attribute for the input field
  placeholder,  // Placeholder text for the input field
  register,     // Register function from React Hook Form
  errors,       // Error object from React Hook Form
  setValue,     // Function to set the value in the form
  getValues,    // Function to get the current values from the form
}) {
  // Extracting course data from Redux store (assumed for editing)
  const { editCourse, course } = useSelector((state) => state.course);

  // State to store the array of chips
  const [chips, setChips] = useState([]);

  // Effect to initialize chips when editing a course
  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag || []); // Initialize with existing tags
    }
    // Register the input field with validation
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect to update form value whenever chips change
  useEffect(() => {
    setValue(name, chips);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips]);

  // Function to handle adding chips on "Enter" or ","
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault(); // Prevent form submission
      const chipValue = event.target.value.trim(); // Get input value
      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue]; // Add chip to the array
        setChips(newChips); // Update state
        event.target.value = ""; // Clear input field
      }
    }
  };

  // Function to handle deleting a chip
  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips); // Update the chips array
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Label for the input field */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      {/* Chip display and input */}
      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {/* Display chip value */}
            {chip}
            {/* Button to delete chip */}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        {/* Input field for adding chips */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>
      {/* Display error if the input is required and not filled */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}


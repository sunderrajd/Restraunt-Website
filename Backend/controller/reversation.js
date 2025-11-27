// import ErrorHandler from "../error/error.js";
// import { Reservation } from "../models/reservationSchema.js";

// export const sendReservation = async (req, res, next) => {
//   const { firstName, lastName, email, phone, date, time } = req.body;
//   if (!firstName || !lastName || !email || !phone || !date || !time) {
//     return next(new ErrorHandler("Please fill full reservation form!", 400));
//   }
//   try {
//     await Reservation.create(firstName, lastName, email, phone, date, time);
//     res.status(200).json({
//       success: true,
//       message: "Reservation sent successfully",
//     });
//   } catch (error) {
//     if (error.name === "validationError") {
//       const validationErrors = Object.values(error.errors).map(
//         (err) => err.message
//       );
//       return next(new ErrorHandler(validationErrors.join(" , "), 400));
//     }
//     return next(error);
//   }
// };

import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, date, time } = req.body;

    if (!firstName || !lastName || !email || !phone || !date || !time) {
      return next(
        new ErrorHandler("Please fill the full reservation form!", 400)
      );
    }

    // Pass a single object to create()
    const reservation = await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
    });

    return res.status(201).json({
      success: true,
      message: "Reservation sent successfully",
      reservation, // optional: return created doc
    });
  } catch (error) {
    // Mongoose ValidationError (note the exact name)
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};

import CoordinatorStatus from "../../models/add_by_admin/coordinatorStatusModel.js";

/* ===============================
   CREATE COORDINATOR STATUS
================================ */
export const createCoordinatorStatus = async (req, res) => {
  try {
    const { title, status, created_by, updated_by } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const exists = await CoordinatorStatus.findOne({ title });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Coordinator status already exists",
      });
    }

    const data = await CoordinatorStatus.create({
      title,
      status: status || "Active",
      created_by,
      updated_by,
    });

    res.status(201).json({
      success: true,
      message: "Coordinator status created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET ALL COORDINATOR STATUS
================================ */
export const getAllCoordinatorStatus = async (req, res) => {
  try {
    const data = await CoordinatorStatus.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET COORDINATOR STATUS BY ID
================================ */
export const getCoordinatorStatusById = async (req, res) => {
  try {
    const data = await CoordinatorStatus.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Coordinator status not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   UPDATE COORDINATOR STATUS
================================ */
// export const updateCoordinatorStatus = async (req, res) => {
//   try {
//     const { title, status, updated_by } = req.body;

//     const data = await CoordinatorStatus.findById(req.params.id);
//     if (!data) {
//       return res.status(404).json({
//         success: false,
//         message: "Coordinator status not found",
//       });
//     }

//     if (title && title !== data.title) {
//       const exists = await CoordinatorStatus.findOne({ title });
//       if (exists) {
//         return res.status(409).json({
//           success: false,
//           message: "Coordinator status already exists",
//         });
//       }
//     }

//     data.title = title ?? data.title;
//     data.status = status ?? data.status;
//     data.updated_by = updated_by ?? data.updated_by;

//     await data.save();

//     res.status(200).json({
//       success: true,
//       message: "Coordinator status updated successfully",
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const updateCoordinatorStatus = async (req, res) => {
  try {
    console.log("REQ BODY 👉", req.body);

    const { title, status, updated_by } = req.body || {};

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const updated = await CoordinatorStatus.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        updated_by,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   DELETE COORDINATOR STATUS
================================ */
export const deleteCoordinatorStatus = async (req, res) => {
  try {
    const data = await CoordinatorStatus.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Coordinator status not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coordinator status deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

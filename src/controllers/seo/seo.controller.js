// import Seo from "../../models/seo/seo.model.js";

// /* ================= CREATE ================= */

// export const createSeo = async (req, res) => {
//   try {
//     const { page_name, page_path, metaTitle, metaDescription } = req.body;

//     if (!page_name || !page_path || !metaTitle || !metaDescription) {
//       return res.status(400).json({
//         success: false,
//         message: "Page Name, Page Path, Meta Title and Meta Description are required",
//       });
//     }

//     const existing = await Seo.findOne({ page_path });

//     if (existing) {
//       return res.status(400).json({
//         success: false,
//         message: "SEO for this page already exists",
//       });
//     }

//     const seo = await Seo.create({
//       ...req.body,
//       created_by: req.userId,
//     });

//     res.status(201).json({
//       success: true,
//       message: "SEO created successfully",
//       data: seo,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ================= GET ALL ================= */

// export const getAllSeo = async (req, res) => {
//   try {
//     const seoList = await Seo.find().sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       count: seoList.length,
//       data: seoList,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ================= GET BY ID ================= */

// export const getSeoById = async (req, res) => {
//   try {
//     const seo = await Seo.findById(req.params.id);

//     if (!seo) {
//       return res.status(404).json({
//         success: false,
//         message: "SEO not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: seo,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // GET SEO BY PAGE PATH
// export const getSeoByPath = async (req, res) => {
//   try {
//     const seo = await Seo.findOne({
//       page_path: req.params.path,
//       status: "Active",
//     });

//     if (!seo) {
//       return res.status(404).json({
//         success: false,
//         message: "SEO not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: seo,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ================= UPDATE ================= */

// export const updateSeo = async (req, res) => {
//   try {
//     const updated = await Seo.findByIdAndUpdate(
//       req.params.id,
//       {
//         ...req.body,
//         updated_by: req.userId,
//       },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({
//         success: false,
//         message: "SEO not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "SEO updated successfully",
//       data: updated,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ================= DELETE ================= */

// export const deleteSeo = async (req, res) => {
//   try {
//     const deleted = await Seo.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "SEO not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "SEO deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

import Seo from "../../models/seo/seo.model.js";
import cloudinary from "../../config/cloudinary.js";

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "namo_gange/seo" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

/* ================= CREATE ================= */
export const createSeo = async (req, res) => {
  try {
    const { page_name, page_path, metaTitle, metaDescription } = req.body;

    // Basic validation
    if (!page_name || !page_path || !metaTitle || !metaDescription) {
      return res.status(400).json({
        success: false,
        message:
          "Page Name, Page Path, Meta Title and Meta Description are required",
      });
    }

    // Check if page path already exists
    const existing = await Seo.findOne({ page_path });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "SEO for this page already exists",
      });
    }

    // ✅ Handle file uploads
    let pageBannerUrl = "";
    let openGraphImageUrl = "";

    if (req.files) {
      if (req.files.page_banner) {
        const uploadResult = await uploadToCloudinary(
          req.files.page_banner[0].buffer,
        );
        pageBannerUrl = uploadResult.secure_url;
      }
      if (req.files.open_graph) {
        const uploadResult = await uploadToCloudinary(
          req.files.open_graph[0].buffer,
        );
        openGraphImageUrl = uploadResult.secure_url;
      }
    }

    // Create SEO entry with all fields
    const seoData = {
      page_name: req.body.page_name,
      page_path: req.body.page_path,
      h1tag: req.body.h1tag || "",
      page_banner: pageBannerUrl,
      metaTitle: req.body.metaTitle,
      metaKeywords: req.body.metaKeywords || "",
      metaDescription: req.body.metaDescription,
      banner_alt: req.body.banner_alt || "",
      open_graph: openGraphImageUrl,
      openGraphTags: req.body.openGraphTags || "",
      schemaMarkup: req.body.schemaMarkup || "",
      status: req.body.status || "Active",
      created_by: req.userId,
    };

    const seo = await Seo.create(seoData);

    res.status(201).json({
      success: true,
      message: "SEO created successfully",
      data: seo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL ================= */
export const getAllSeo = async (req, res) => {
  try {
    const seoList = await Seo.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: seoList.length,
      data: seoList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET BY ID ================= */
export const getSeoById = async (req, res) => {
  try {
    const seo = await Seo.findById(req.params.id);

    if (!seo) {
      return res.status(404).json({
        success: false,
        message: "SEO not found",
      });
    }

    res.json({
      success: true,
      data: seo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET BY PAGE PATH ================= */
export const getSeoByPath = async (req, res) => {
  try {
    const seo = await Seo.findOne({
      page_path: req.params.path,
      status: "Active",
    });

    if (!seo) {
      return res.status(404).json({
        success: false,
        message: "SEO not found for this path",
      });
    }

    res.json({
      success: true,
      data: seo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE ================= */
export const updateSeo = async (req, res) => {
  try {
    const seo = await Seo.findById(req.params.id);

    if (!seo) {
      return res.status(404).json({
        success: false,
        message: "SEO not found",
      });
    }

    const { page_path } = req.body;

    // Check if page_path is being changed and if it already exists
    if (page_path && page_path !== seo.page_path) {
      const existing = await Seo.findOne({
        page_path,
        _id: { $ne: req.params.id },
      });

      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Another SEO entry with this page path already exists",
        });
      }
    }

    // ✅ Handle file uploads for update
    let pageBannerUrl = seo.page_banner;
    let openGraphImageUrl = seo.open_graph;

    if (req.files) {
      if (req.files.page_banner) {
        // Delete old image from Cloudinary if exists
        if (seo.page_banner) {
          const publicId = seo.page_banner
            .split("/")
            .slice(-1)[0]
            .split(".")[0];
          await cloudinary.uploader
            .destroy(`namo_gange/seo/${publicId}`)
            .catch(() => {});
        }
        const uploadResult = await uploadToCloudinary(
          req.files.page_banner[0].buffer,
        );
        pageBannerUrl = uploadResult.secure_url;
      }

      if (req.files.open_graph) {
        // Delete old image from Cloudinary if exists
        if (seo.open_graph) {
          const publicId = seo.open_graph.split("/").slice(-1)[0].split(".")[0];
          await cloudinary.uploader
            .destroy(`namo_gange/seo/${publicId}`)
            .catch(() => {});
        }
        const uploadResult = await uploadToCloudinary(
          req.files.open_graph[0].buffer,
        );
        openGraphImageUrl = uploadResult.secure_url;
      }
    }

    // Prepare update data
    const updateData = {
      page_name: req.body.page_name || seo.page_name,
      page_path: req.body.page_path || seo.page_path,
      h1tag: req.body.h1tag !== undefined ? req.body.h1tag : seo.h1tag,
      page_banner: pageBannerUrl,
      metaTitle: req.body.metaTitle || seo.metaTitle,
      metaKeywords:
        req.body.metaKeywords !== undefined
          ? req.body.metaKeywords
          : seo.metaKeywords,
      metaDescription: req.body.metaDescription || seo.metaDescription,
      banner_alt:
        req.body.banner_alt !== undefined
          ? req.body.banner_alt
          : seo.banner_alt,
      open_graph: openGraphImageUrl,
      openGraphTags:
        req.body.openGraphTags !== undefined
          ? req.body.openGraphTags
          : seo.openGraphTags,
      schemaMarkup:
        req.body.schemaMarkup !== undefined
          ? req.body.schemaMarkup
          : seo.schemaMarkup,
      status: req.body.status || seo.status,
      updated_by: req.userId,
    };

    const updated = await Seo.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "SEO updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */
export const deleteSeo = async (req, res) => {
  try {
    const seo = await Seo.findById(req.params.id);

    if (!seo) {
      return res.status(404).json({
        success: false,
        message: "SEO not found",
      });
    }

    // ✅ Delete images from Cloudinary
    if (seo.page_banner) {
      const publicId = seo.page_banner.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader
        .destroy(`namo_gange/seo/${publicId}`)
        .catch(() => {});
    }

    if (seo.open_graph) {
      const publicId = seo.open_graph.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader
        .destroy(`namo_gange/seo/${publicId}`)
        .catch(() => {});
    }

    await seo.deleteOne();

    res.json({
      success: true,
      message: "SEO deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

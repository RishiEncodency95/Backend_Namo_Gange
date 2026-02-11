import AGSDelegate from "../../models/ags/AGSDelegateModel.js";

/* ================= CREATE ================= */
export const createAGSDelegate = async (req, res) => {
    try {
        const delegate = await AGSDelegate.create({
            title: req.body.title,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            profession: req.body.profession,
            age: req.body.age,
            event: req.body.event,

            mobile: req.body.mobile,
            alternate: req.body.alternate,
            landline: req.body.landline,
            email: req.body.email,

            address: req.body.address,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin,

            category: req.body.category,
            college: req.body.college,
            university: req.body.university,

            enquiryFor: req.body.enquiryFor,
            leadForward: req.body.leadForward,
            source: req.body.source,
            mode: req.body.mode,
            status: req.body.status,
            coordinator: req.body.coordinator,
            remark: req.body.remark,

            companyName: req.body.companyName,
            companyAddress: req.body.companyAddress,
            companyCountry: req.body.country1,
            companyState: req.body.state1,
            companyCity: req.body.city1,
            companyPin: req.body.pin1
        });
        res.status(201).json({ success: true, data: delegate });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

/* ================= GET ALL ================= */
export const getAllAGSDelegates = async (req, res) => {
    try {
        const delegates = await AGSDelegate.find();
        res.status(200).json({ success: true, data: delegates });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

/* ================= GET BY ID ================= */
export const getAGSDelegateById = async (req, res) => {
    try {
        const delegate = await AGSDelegate.findById(req.params.id);
        res.status(200).json({ success: true, data: delegate });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

/* ================= UPDATE ================= */
export const updateAGSDelegate = async (req, res) => {
    try {
        const delegate = await AGSDelegate.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({ success: true, data: delegate });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

/* ================= DELETE ================= */
export const deleteAGSDelegate = async (req, res) => {
    try {
        const delegate = await AGSDelegate.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: delegate });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
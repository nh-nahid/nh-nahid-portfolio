import Contact from "../models/Contact.js";
// =======================
// SEND CONTACT MESSAGE
// =======================
export const sendMessage = async (req, res, next) => {
    try {
        const { name, email, subject, message, } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, subject and message are required.",
            });
        }
        const contact = await Contact.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim(),
        });
        return res.status(201).json({
            success: true,
            message: "Your message has been sent successfully.",
            data: contact,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// GET ALL MESSAGES
// =======================
export const getMessages = async (_req, res, next) => {
    try {
        const messages = await Contact.find().sort({
            createdAt: -1,
        });
        return res.status(200).json({
            success: true,
            message: "Messages fetched successfully.",
            count: messages.length,
            data: messages,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// GET SINGLE MESSAGE
// =======================
export const getMessage = async (req, res, next) => {
    try {
        const message = await Contact.findById(req.params.id);
        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Message fetched successfully.",
            data: message,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// MARK MESSAGE AS READ
// =======================
export const markAsRead = async (req, res, next) => {
    try {
        const message = await Contact.findByIdAndUpdate(req.params.id, {
            isRead: true,
        }, {
            new: true,
        });
        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Message marked as read.",
            data: message,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// DELETE MESSAGE
// =======================
export const deleteMessage = async (req, res, next) => {
    try {
        const message = await Contact.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Message deleted successfully.",
        });
    }
    catch (error) {
        next(error);
    }
};

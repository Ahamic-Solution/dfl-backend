import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import ContactService from './contact.service';

const createContact = catchAsync(async (req, res) => {
    const result = await ContactService.createContact(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Contact created successfully',
        data: result,
    });
});

const getAllContact = catchAsync(async (req, res) => {
    const result = await ContactService.getAllContact(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Contact retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleContact = catchAsync(async (req, res) => {
    const result = await ContactService.getSingleContact(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Contact retrieved successfully',
        data: result,
    });
});

const updateContact = catchAsync(async (req, res) => {
    const result = await ContactService.updateContact(req.params.id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Contact updated successfully',
        data: result,
    });
});

const updateContactStatus = catchAsync(async (req, res) => {
    const result = await ContactService.updateContactStatus(
        req.params.id,
        req.body.status
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Contact status updated to ${req.body.status}`,
        data: result,
    });
});

const deleteContact = catchAsync(async (req, res) => {
    const result = await ContactService.deleteContact(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Contact deleted successfully',
        data: result,
    });
});

const ContactController = {
    createContact,
    getAllContact,
    getSingleContact,
    updateContact,
    updateContactStatus,
    deleteContact,
};

export default ContactController;

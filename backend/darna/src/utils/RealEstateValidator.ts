import { body, param } from "express-validator";

class RealEstateValidator {
    // Create (all required where the model requires)
    static createRealEstateValidator = [
        // basic info
        body("title")
            .exists().withMessage("Title is required")
            .bail()
            .isString().withMessage("Title must be a string")
            .trim()
            .isLength({ min: 2, max: 200 }).withMessage("Title should be 2-200 characters"),

        body("description")
            .exists().withMessage("Description is required")
            .bail()
            .isString().withMessage("Description must be a string")
            .isLength({ min: 10 }).withMessage("Description should be at least 10 characters"),

        body("transactionType")
            .exists().withMessage("Transaction type is required")
            .bail()
            .isIn(["sale", "daily rental", "monthly", "seasonal"])
            .withMessage("Invalid transaction type"),

        body("price")
            .exists().withMessage("Price is required")
            .bail()
            .isFloat({ min: 0 }).withMessage("Price must be >= 0")
            .toFloat(),

        body("availability")
            .optional()
            .isBoolean().withMessage("Availability must be boolean")
            .toBoolean(),

        // location
        body("location").exists().withMessage("Location is required"),
        body("location.address")
            .exists().withMessage("Address is required")
            .bail()
            .isString().withMessage("Address must be a string")
            .trim(),
        body("location.coordinates").exists().withMessage("Coordinates are required"),
        body("location.coordinates.latitude")
            .exists().withMessage("Latitude is required")
            .bail()
            .isFloat({ min: -90, max: 90 }).withMessage("Latitude must be between -90 and 90")
            .toFloat(),
        body("location.coordinates.longitude")
            .exists().withMessage("Longitude is required")
            .bail()
            .isFloat({ min: -180, max: 180 }).withMessage("Longitude must be between -180 and 180")
            .toFloat(),

        // characteristics
        body("characteristics").exists().withMessage("Characteristics are required"),
        body("characteristics.totalSurface")
            .exists().withMessage("Total surface is required")
            .bail()
            .isFloat({ min: 0 }).withMessage("Total surface must be >= 0")
            .toFloat(),
        body("characteristics.numberOfBedRooms")
            .exists().withMessage("Number of bedrooms is required")
            .bail()
            .isInt({ min: 0 }).withMessage("Bedrooms must be an integer >= 0")
            .toInt(),
        body("characteristics.numberOfBathrooms")
            .exists().withMessage("Number of bathrooms is required")
            .bail()
            .isInt({ min: 0 }).withMessage("Bathrooms must be an integer >= 0")
            .toInt(),

        // room dimensions (optional array of objects)
        body("characteristics.roomDimensions")
            .optional()
            .isArray().withMessage("roomDimensions must be an array"),
        body("characteristics.roomDimensions.*.roomName")
            .optional()
            .isString().withMessage("roomName must be a string")
            .trim()
            .notEmpty().withMessage("roomName cannot be empty"),
        body("characteristics.roomDimensions.*.length")
            .optional()
            .isFloat({ min: 0 }).withMessage("length must be >= 0")
            .toFloat(),
        body("characteristics.roomDimensions.*.width")
            .optional()
            .isFloat({ min: 0 }).withMessage("width must be >= 0")
            .toFloat(),
        body("characteristics.roomDimensions.*.surface")
            .optional()
            .isFloat({ min: 0 }).withMessage("surface must be >= 0")
            .toFloat(),

        // equipment (all optional booleans)
        body("characteristics.equipment").optional().isObject().withMessage("equipment must be an object"),
        body("characteristics.equipment.wifi").optional().isBoolean().withMessage("wifi must be boolean").toBoolean(),
        body("characteristics.equipment.airConditioning").optional().isBoolean().withMessage("airConditioning must be boolean").toBoolean(),
        body("characteristics.equipment.parking").optional().isBoolean().withMessage("parking must be boolean").toBoolean(),
        body("characteristics.equipment.heating").optional().isBoolean().withMessage("heating must be boolean").toBoolean(),
        body("characteristics.equipment.balcony").optional().isBoolean().withMessage("balcony must be boolean").toBoolean(),
        body("characteristics.equipment.garden").optional().isBoolean().withMessage("garden must be boolean").toBoolean(),
        body("characteristics.equipment.pool").optional().isBoolean().withMessage("pool must be boolean").toBoolean(),
        body("characteristics.equipment.elevator").optional().isBoolean().withMessage("elevator must be boolean").toBoolean(),

        // internal rules (optional booleans)
        body("characteristics.internalRules").optional().isObject().withMessage("internalRules must be an object"),
        body("characteristics.internalRules.animalsAllowed").optional().isBoolean().withMessage("animalsAllowed must be boolean").toBoolean(),
        body("characteristics.internalRules.smokingAllowed").optional().isBoolean().withMessage("smokingAllowed must be boolean").toBoolean(),
        body("characteristics.internalRules.partiesAllowed").optional().isBoolean().withMessage("partiesAllowed must be boolean").toBoolean(),

        // energy diagnostics
        body("characteristics.energyDiagnostics")
            .optional()
            .isString().withMessage("energyDiagnostics must be a string")
            .trim(),
    ];

    // Update (all optional, same field rules)
    static updateRealEstateValidator = [
        body("title").optional().isString().withMessage("Title must be a string").trim().isLength({ min: 2, max: 200 }).withMessage("Title should be 2-200 characters"),
        body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 10 }).withMessage("Description should be at least 10 characters"),
        body("transactionType").optional().isIn(["sale", "daily rental", "monthly", "seasonal"]).withMessage("Invalid transaction type"),
        body("price").optional().isFloat({ min: 0 }).withMessage("Price must be >= 0").toFloat(),
        body("availability").optional().isBoolean().withMessage("Availability must be boolean").toBoolean(),

        body("location").optional().isObject().withMessage("Location must be an object"),
        body("location.address").optional().isString().withMessage("Address must be a string").trim(),
        body("location.coordinates").optional().isObject().withMessage("Coordinates must be an object"),
        body("location.coordinates.latitude").optional().isFloat({ min: -90, max: 90 }).withMessage("Latitude must be between -90 and 90").toFloat(),
        body("location.coordinates.longitude").optional().isFloat({ min: -180, max: 180 }).withMessage("Longitude must be between -180 and 180").toFloat(),

        body("characteristics").optional().isObject().withMessage("Characteristics must be an object"),
        body("characteristics.totalSurface").optional().isFloat({ min: 0 }).withMessage("Total surface must be >= 0").toFloat(),
        body("characteristics.numberOfBedRooms").optional().isInt({ min: 0 }).withMessage("Bedrooms must be an integer >= 0").toInt(),
        body("characteristics.numberOfBathrooms").optional().isInt({ min: 0 }).withMessage("Bathrooms must be an integer >= 0").toInt(),

        body("characteristics.roomDimensions").optional().isArray().withMessage("roomDimensions must be an array"),
        body("characteristics.roomDimensions.*.roomName").optional().isString().withMessage("roomName must be a string").trim().notEmpty().withMessage("roomName cannot be empty"),
        body("characteristics.roomDimensions.*.length").optional().isFloat({ min: 0 }).withMessage("length must be >= 0").toFloat(),
        body("characteristics.roomDimensions.*.width").optional().isFloat({ min: 0 }).withMessage("width must be >= 0").toFloat(),
        body("characteristics.roomDimensions.*.surface").optional().isFloat({ min: 0 }).withMessage("surface must be >= 0").toFloat(),

        body("characteristics.equipment").optional().isObject().withMessage("equipment must be an object"),
        body("characteristics.equipment.wifi").optional().isBoolean().withMessage("wifi must be boolean").toBoolean(),
        body("characteristics.equipment.airConditioning").optional().isBoolean().withMessage("airConditioning must be boolean").toBoolean(),
        body("characteristics.equipment.parking").optional().isBoolean().withMessage("parking must be boolean").toBoolean(),
        body("characteristics.equipment.heating").optional().isBoolean().withMessage("heating must be boolean").toBoolean(),
        body("characteristics.equipment.balcony").optional().isBoolean().withMessage("balcony must be boolean").toBoolean(),
        body("characteristics.equipment.garden").optional().isBoolean().withMessage("garden must be boolean").toBoolean(),
        body("characteristics.equipment.pool").optional().isBoolean().withMessage("pool must be boolean").toBoolean(),
        body("characteristics.equipment.elevator").optional().isBoolean().withMessage("elevator must be boolean").toBoolean(),

        body("characteristics.internalRules").optional().isObject().withMessage("internalRules must be an object"),
        body("characteristics.internalRules.animalsAllowed").optional().isBoolean().withMessage("animalsAllowed must be boolean").toBoolean(),
        body("characteristics.internalRules.smokingAllowed").optional().isBoolean().withMessage("smokingAllowed must be boolean").toBoolean(),
        body("characteristics.internalRules.partiesAllowed").optional().isBoolean().withMessage("partiesAllowed must be boolean").toBoolean(),

        body("characteristics.energyDiagnostics").optional().isString().withMessage("energyDiagnostics must be a string").trim(),
    ];

    // Common
    static idParamValidator = [param("realEstateId").isMongoId().withMessage("Invalid id")];
}

export default RealEstateValidator;
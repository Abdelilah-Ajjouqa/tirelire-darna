import e from "express";
import RealEstateControllers from "../controllers/realEstate.controller";
import RealEstateValidator from "../utils/RealEstateValidator";

const router = e.Router()

router.get('/', RealEstateControllers.getAllRealEstates);
router.get('/search', RealEstateControllers.searchRealEstate);
router.get('/:realEstateId', RealEstateControllers.showRealEstate);
router.post('/', RealEstateValidator.createRealEstateValidator, RealEstateControllers.createRealEstate);
router.patch('/:realEstateId', RealEstateValidator.updateRealEstateValidator, RealEstateControllers.updateRealEstate);
router.delete('/:realEstateId', RealEstateControllers.deleteRealEstate);

export default router;
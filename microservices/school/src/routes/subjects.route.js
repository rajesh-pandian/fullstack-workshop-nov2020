const { Router } = require('express');
const SubjectController = require('../manage-subjects/subject.controller');
const SubjectMiddleware = require('../manage-subjects/subject.middleware');
const UserMiddleware = require('../manage-users/auth.middleware')

const router = new Router();
const subjectController = new SubjectController();
const subjectMiddleware = new SubjectMiddleware();
const userMiddleware = new UserMiddleware();

router.get('/all', subjectController.retrieveAllSubjects);
router.get('/filtered', subjectController.retrieveSubjectsFiltered);
router.get('/count', subjectController.countSubjects);
router.post('/create', userMiddleware.checkAuth, subjectMiddleware.validateCreate, subjectController.createSubject);
router.put('/update/:subjectId', userMiddleware.checkAuth, subjectMiddleware.validateUpdate, subjectController.updateSubject);
router.delete('/delete/:subjectId', userMiddleware.checkAuth, subjectMiddleware.validateDelete, subjectController.deleteSubject);

module.exports = router;

import express from 'express'
import {loginCompany,registerCompany} from '../controllers/companyController'
const router=express.Router()
//register a company
router.post('/register',registerCompany)
//company login
router.post('/login',loginCompany)
//get company data
router.get('/company',getCompanyData)

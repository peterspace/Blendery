const express = require('express');
const router = express.Router();

const {

  tokenList,
  tokenPrice,
  chainPrice
} = require('../controllers/swapController.js');

//router.use(verifyJWT)

//==========================={          }===============================================
//==========================={  FETCH  }===============================================
//==========================={          }===============================================
router.route('/tokenList/:chainId').get(tokenList);
router.route('/tokenPrice').post(tokenPrice);
router.route('/chainPrice/:chainId').get(chainPrice);

//==========================={          }===============================================
//==========================={  CREATE  }===============================================
//==========================={          }===============================================

module.exports = router;

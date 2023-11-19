const asyncHandler = require('express-async-handler');
const Place = require('../models/placeModel');

// call along admin registration
const createCountry1 = asyncHandler(async (req, res) => {
  const { country, state } = req.body;

  console.log({ countryInfo: { country: country, state: state } });

  let allCountries = await Place.find();

  let allStates = [];
  let stateExists = false;
  let countryExists = false;

  let newPlace;

  countryExists = await Promise.all(
    allCountries.map(async (x) => {
      if (x?.name === country) {
        allStates = x?.states;
        return true;
      }
    })
  );

  if (!countryExists) {
    newPlace = new Place({
      country: {
        name: country,
        state: [state],
      },
    });
  }

  if (countryExists === true) {
    stateExists = await Promise.all(
      allStates.map(async (x) => {
        if (x === state) {
          return true;
        }
      })
    );
  }

  if (!stateExists) {
    newPlace = new Place({
      country: {
        name: country,
        state: [state, ...allStates],
      },
    });
    return;
  }

  if (stateExists) {
    return;
  }

  const savedPlace = await newPlace.save();
  console.log({ savedPlace: savedPlace });

  if (savedPlace) {
    res.status(200).json(savedPlace);
  }
  console.log('Place:', savedPlace);
});

// const createCountry = asyncHandler(async (req, res) => {
//   const { country, state } = req.body;

//   console.log({ countryInfo: { country: country, state: state } });

//   let allCountries = await Place.find();

//   console.log({ allCountries: allCountries });

//   let stateExists = false;
//   let countryExists = false;

//   //========================================
//   const currentCountry = await Place.findOne({ name: country });

//   if (!currentCountry) {
//     const newCountry = await Place.create({
//       name: country,
//       states: [state],
//     });

//     if (newCountry) {
//       console.log('Place:', newCountry);
//       res.status(200).json(newCountry);
//     }

//   }

//   const { states } = currentCountry;

//   const usersWallet = await Promise.all(
//     states.map(async (x) => {
//       if (x === state) {
//         return
//       }

//       return { ...x };
//     })
//   );
//   console.log(usersWallet);

//   await currentCountry.save();
//   //========================================

//   if (allCountries.length > 0) {

//     if (countryExists) {
//       const { states } = countryExists;
//       stateExists = await Promise.all(
//         states.map(async (x) => {
//           if (x === state) {
//             return true;
//           }
//         })
//       );

//       if (stateExists) {
//         return;
//       } else {
//         countryExists.push(state);
//         const updatedCountry = await countryExists.save();

//         if (updatedCountry) {
//           console.log('Place:', updatedCountry);
//           res.status(200).json(updatedCountry);
//         }
//       }
//     }
//   } else {
//     const newCountry = await Place.create({
//       name: country,
//       states: [state],
//     });

//     if (newCountry) {
//       console.log('Place:', newCountry);
//       res.status(200).json(newCountry);
//     }
//   }
// });

// const createCountry = asyncHandler(async (req, res) => {
//   const { country, state } = req.body;

//   console.log({ countryInfo: { country: country, state: state } });

//   let stateExists = false;

//   //========================================
//   const currentCountry = await Place.findOne({ name: country });
//   //====={if country does not exists}====================================
//   if (!currentCountry) {
//     const newCountry = await Place.create({
//       name: country,
//       states: [state],
//     });

//     if (newCountry) {
//       console.log('New Place:', newCountry);
//       res.status(200).json(newCountry);
//     }
//   }

//   //====={if country exists}====================================
//   if (currentCountry) {
//     const { states } = currentCountry; // all states in the country
//     await Promise.all(
//       states.map(async (x) => {
//         if (x === state) {
//           stateExists = true;
//           return;
//         }
//         // return { ...x }; // return all states
//         return;
//       })
//     );
//     // console.log(allStates);

//     // await currentCountry.save();
//     //========================================

//     //====={if country exists}====================================
//     // const { states } = currentCountry;

//     if (stateExists) {
//       // currentCountry.states = [state, ...states];
//       currentCountry.states = states.push(state);

//       const updatedCountry = await currentCountry.save();

//       if (updatedCountry) {
//         console.log('Updated Place:', updatedCountry);
//         res.status(200).json(updatedCountry);
//       }
//     }
//   }
// });

const createCountry = asyncHandler(async (req, res) => {
  const { country, state } = req.body;

  console.log({ countryInfo: { country: country, state: state } });

  //========================================
  const currentCountry = await Place.findOne({ name: country });
  //====={if country does not exists}====================================
  if (!currentCountry) {
    const newCountry = await Place.create({
      name: country,
      states: [state],
    });

    if (newCountry) {
      console.log('New Place:', newCountry);
      res.status(200).json(newCountry);
    }
  }

  //====={if country exists}====================================

  let stateExists = false
  if (currentCountry) {
    console.log('country Exists');
    const { states } = currentCountry; // all states in the country
    const stateStatus = await Promise.all(
      states.map(async (x) => {
        if (x === state) {
          console.log('country Exists In Country');
          stateExists = true
          return true;
        }
      })
    );

    console.log({ stateExists: stateStatus });
    console.log({ stateExists: stateExists });

    //====={if country exists}====================================
    // const { states } = currentCountry;

    if (!stateExists) {
      console.log('state Exists');

      currentCountry.states = [state, ...currentCountry.states];

      const updatedCountry = await currentCountry.save();

      if (updatedCountry) {
        console.log('Updated Place:', updatedCountry);
        res.status(200).json(updatedCountry);
      }
    }
  }
});

const getAllCountries = asyncHandler(async (req, res) => {
  const Countries = await Place.find(); // get managers userId from "protect middleware"
  res.json(Countries);
  // sort country by country?.name
});

const getAllStatesByCountry = asyncHandler(async (req, res) => {
  const { country } = req.params;
  const states = await Place.find({ name: country }); // get managers userId from "protect middleware"
  res.json(states);
});

module.exports = {
  createCountry,
  getAllCountries,
  getAllStatesByCountry,
};

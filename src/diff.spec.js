const { diff } = require('./diff');

describe('diff', () => {
  it('should give new cases correctly for new day', () => {
    const prevJSON = {
      lastUpdated: new Date('2020-03-03').toString(),
      data: {
        karnataka: {
          newCasesToday: 10,
          totalIndianCases: 7,
          totalForeignCases: 2,
          totalRecovered: 2,
          totalDeaths: 1
        }
      } 
    }
    const newJSON = {
      lastUpdated: new Date('2020-03-04').toString(),
      data: {
        karnataka: {
          totalIndianCases: 8,
          totalForeignCases: 3,
          totalRecovered: 2,
          totalDeaths: 1
        }
      } 
    }

    const expectedJSON = {
      lastUpdated: new Date('2020-03-04').toString(),
      data: {
        karnataka: {
          newCasesToday: 2,
          totalIndianCases: 8,
          totalForeignCases: 3,
          totalRecovered: 2,
          totalDeaths: 1
        }
      } 
    }

    expect(diff(prevJSON, newJSON)).toEqual(expectedJSON);
  });

  it('should give new cases correctly for same day', () => {
    const prevJSON = {
      lastUpdated: new Date('2020-03-03').toString(),
      data: {
        karnataka: {
          newCasesToday: 2,
          totalIndianCases: 7,
          totalForeignCases: 2,
          totalRecovered: 2,
          totalDeaths: 1
        }
      } 
    }
    const newJSON = {
      lastUpdated: new Date('2020-03-03').toString(),
      data: {
        karnataka: {
          totalIndianCases: 8,
          totalForeignCases: 3,
          totalRecovered: 2,
          totalDeaths: 1
        }
      } 
    }

    const expectedJSON = {
      lastUpdated: new Date('2020-03-03').toString(),
      data: {
        karnataka: {
          newCasesToday: 4,
          totalIndianCases: 8,
          totalForeignCases: 3,
          totalRecovered: 2,
          totalDeaths: 1
        }
      } 
    }

    expect(diff(prevJSON, newJSON)).toEqual(expectedJSON);
  });
});

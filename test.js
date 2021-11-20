const server = require('./index');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);


describe('Base endpoint', () => {

    it('GET / should display welcome text', async () => {
      const res = await requestWithSupertest.get('/');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toEqual("Working like a champ !");
    });
  
});

describe('Application logic',()=>{

    it('POST /bmi should return data', async()=>{
        const res= await requestWithSupertest.post('/bmi').send([{"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }]);
        expect(res.status).toEqual(200);
        expect(res.body.data[0]).toEqual({"Gender":"Male","HeightCm":171,"WeightKg":96,"Bmi":32.83,"BmiCategory":"Moderately Obese","HealthRisk":"Medium risk"});
    });

});


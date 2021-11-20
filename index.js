var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json({limit: '50mb'}));


app.get("/", (req, res, next) => {
    res.json("Working like a champ !");
});

app.post("/bmi",(req, res) => {

    function GetHeightInSquareMetres(height)
    {
        return (height/100)*(height/100);
    }

    function GetBMI(weight,height)
    {
        var bmi= weight/GetHeightInSquareMetres(height);
        bmi = +bmi.toFixed(2);
        return bmi;
    }

    function GetBMICategory(bmi)
    {
        if(bmi<=18.4)
        {
            return "Underweight";
        }
        else if(bmi>=18.5&&bmi<=24.9)
        {
            return "Normal Weight";
        }
        else if(bmi>=25&&bmi<=29.9)
        {
            overweightCount++;
            return "Overweight";
        }
        else if(bmi>=30&&bmi<=34.9)
        {
            overweightCount++;
            return "Moderately Obese";
        }
        else if(bmi>=35&&bmi<=39.9)
        {
            overweightCount++;
            return "Severely Obese";
        }
        else 
        {
            overweightCount++;
            return "Very Severely Obese";
        }
    }

    function GetHealthRisk(bmi)
    {
        if(bmi<=18.4)
        {
            return "Malnutrition risk";
        }
        else if(bmi>=18.5&&bmi<=24.9)
        {
            return "Low risk";
        }
        else if(bmi>=25&&bmi<=29.9)
        {
            return "Enhanced risk";
        }
        else if(bmi>=30&&bmi<=34.9)
        {
            return "Medium risk";
        }
        else if(bmi>=35&&bmi<=39.9)
        {
            return "High risk";
        }
        else 
        {
            return "Very high risk";
        }
    }

    var temp=req.body;
    var overweightCount=0;
    var totalCount=0;


    req.body.forEach((el,i) => {
        temp[i].Bmi=GetBMI(el.WeightKg,el.HeightCm);
        temp[i].BmiCategory=GetBMICategory(temp[i].Bmi);
        temp[i].HealthRisk=GetHealthRisk(temp[i].Bmi);
        totalCount++;
    });

    res.json({data:temp,totalCount:totalCount,overweightCount:overweightCount});
});


module.exports = app;
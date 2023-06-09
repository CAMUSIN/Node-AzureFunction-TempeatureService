module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if(req.body && req.body.readings){
        context.log('Readings Test ' + req.body.reading);
        req.body.readings.forEach(function(reading) {
            if(reading.temperature <= 25){
                reading.status = 'OK';
            }else if(reading.temperature <= 50){
                reading.status = 'CAUTION';
            }else{
                reading.status = 'DANGER';
            }
            context.log('Reading is ' + reading.status);
        });

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {
                "readings": req.body.readings
            }
        };
    }else{
        context.res = {
            status: 400,
            body: "Please send an array of readings in the request body"
        };
    }
    context.done();
}
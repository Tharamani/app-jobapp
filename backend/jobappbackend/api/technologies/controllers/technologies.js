const { sanitizeEntity } = require('strapi-utils');
let location_id
var x;
var technologies
var flag=false;

module.exports = {









  async find(ctx) {
  	let entities2;

  	for(x in ctx.query){
  		if (x=="city") {
  			console.log(`${ctx.query[x]} city is being searched`)
  			if (ctx.query._q) {
            entities2 = await strapi.services.location.search({ city:ctx.query.city});
            } else {
            entities2 = await strapi.services.location.find({ city:ctx.query.city});
            }
             entities2.map(entity => {
               const location = sanitizeEntity(entity, {
               model: strapi.models.location,
            });
             if (location) {
              
              location_id=location._id
              console.log(location_id)
            }

       });

              if (Object.keys(ctx.query).length==1) {
              	entities2 = await strapi.services.technologies.find({});
              	entities2.map(function(val){
              		 val.users.map(function(val){
              		 	console.log(val.location)
              		 	if(val.location=location_id)
              		    console.log(val.username)
              		 })
              	})
            	
            }
      


  		}
  	}



  	console.log(ctx.query)
    let entities;
    let noqueryEntities;
    var TechAndLocResult=[]
    if (Object.keys(ctx.query).length==0) {
    	console.log("empty")
    	entities = await strapi.services.technologies.find(ctx.query);
    }
    else if (ctx.query._q) {
      entities = await strapi.services.technologies.search({ technology:ctx.query.technology});
    } else {
      entities = await strapi.services.technologies.find({ technology:ctx.query.technology});
    }

    return entities.map(entity => {
      technologies = sanitizeEntity(entity, {
        model: strapi.models.technologies,
      });
      if (technologies) {
        
        technologies.users.map(function(val){
        	if (val.location==location_id) {
        		console.log(val.location+"and"+location_id)
        		TechAndLocResult.push(val)
        		console.log(val)



        	}
        	
        })
      }
      if (Object.keys(ctx.query).length<=1) {
      	return technologies
      }else{
      	return TechAndLocResult
      }


    
      
    });
  },
 

 





};

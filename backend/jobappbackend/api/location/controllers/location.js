const { sanitizeEntity } = require('strapi-utils');
let flag=true;
module.exports = {
  async find(ctx) {
    console.log(strapi.services.location)
    let entities;
    console.log(ctx.query)
    let arr=[]
    let arrs=[]
   
     if (Object.keys(ctx.query).length === 0) {

      entities = await strapi.services.location.find(ctx.query);

    } else {

      entities = await strapi.services.location.find({city:ctx.query.city});


    }


    return entities.map(entity => {
      const location = sanitizeEntity(entity, {
        model: strapi.models.location,

      });
        if (location) {
          console.log(location)
      if(ctx.query.technology){
        console.log("kk")
        location.technologies.map(function(val){
          console.log(val.technology)

          if (val.technology==ctx.query.technology) {

            arr.push(location)
            
          }

          
          
        })
      }
      else{
        return location
      }
      if(arr.length>0){
       if(ctx.query.status){
        location.users.map(function(val){
          console.log(val.status)
          if(val.status==ctx.query.status){
            arrs.push(location)
          }
        })
        return arrs

       } 

        
      }
      }
      return arr
      
      
    

      
    });
  },
};

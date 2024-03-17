const db=require('../models/index');

function syncDb(forcesync){
    if (forcesync){
        db.sequelize.sync({force:true});
    }
    else{
        db.sequelize.sync();
    }
}

async function syncTable(alter,force,model){
    db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    console.log(alter,force)
    if(alter){
        await model.sync({alter:true})
    }
    else if(force){
        await model.sync({force:true})
    }
    else{
        await model.sync()
    }
    db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true })
}

module.exports={
    syncDb,
    syncTable
}
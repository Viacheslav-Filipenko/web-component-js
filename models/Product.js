const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelShema = new Schema({

    title: { type: 'String', required: 'true'},
    description: { type: 'String', required: 'true'},
    


});

const Model = mongoose.model('Products', ModelShema);

module.exports = Model;
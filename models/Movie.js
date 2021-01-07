const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title:{
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [30, '`{PATH}` alanı (`{VALUE}`), (`{MAXLENGTH}`) karakteri geçemez.'],
        minlength: 1,

    },
    category: String,
    country: String,
    year: {
        type:Number,
        max: 2021,
        min: 1800

    },
    imdb_score: Number,
    director_id: Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('movie', MovieSchema);
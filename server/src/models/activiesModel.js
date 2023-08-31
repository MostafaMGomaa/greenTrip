const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
      trim: true,
      lowercase: true,
    },
    pointOfInterest: {
      type: mongoose.Schema.ObjectId,
      ref: 'Point',
    },
    reservationLimit: {
      type: Number,
      default: 30,
    },
    description: {
      type: String,
      default:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at dolor et quam hendrerit ultrices. In laoreet dignissim nisi, eu porttitor ipsum pellentesque ut. Nullam dui nibh, auctor eu sapien sed, aliquet consectetur dui. Donec maximus feugiat tellus, porta imperdiet magna. Sed massa magna, semper nec lobortis quis, consectetur in ex. Praesent venenatis feugiat consequat. Nam imperdiet eget nibh ut imperdiet. In aliquam ante dui, et vestibulum nunc ullamcorper a. Vestibulum bibendum et nisl in convallis. Nullam sit amet mauris semper, volutpat elit vel, scelerisque leo.',
    },
    startAt: {
      type: Date,
      required: [true, 'Please provide start date to the activity'],
    },
    photo: {
      type: String,
      // required: [true, 'Please provide Photo to the activity'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
activitySchema.index({ pointOfInterest: 1 });

activitySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'pointOfInterest',
    select: '-__v',
  });
  next();
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
